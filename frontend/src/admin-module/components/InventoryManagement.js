import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InventoryManagement.css';

const InventoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]); 
  const [items, setItems] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    category: '',
    supplier: '',
    quantity: 0,
    price: 0,
  });
  const [editing, setEditing] = useState(false);
  const [itemId, setItemId] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/inventory/categories');
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('/api/suppliers'); 
        setSuppliers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchItems = async () => {
      try {
        const response = await axios.get('/api/inventory/items');
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
    fetchSuppliers(); 
    fetchItems();
  }, []);

  const handleCreateCategory = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/inventory/categories', { name: newCategory });
      setCategories([...categories, response.data]);
      setNewCategory('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateItem = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/inventory/items', {
        name: newItem.name,
        description: newItem.description,
        category: newItem.category,
        supplier: newItem.supplier,
        quantity: newItem.quantity,
        price: newItem.price,
      });
      setItems([...items, response.data]);
      setNewItem({
        name: '',
        description: '',
        category: '',
        supplier: '',
        quantity: 0,
        price: 0,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateItem = async (event) => {
    event.preventDefault();
    try {
      const category = categories.find((category) => category.name === newItem.category);
      const supplier = suppliers.find((supplier) => supplier.name === newItem.supplier);
      if (!category || !supplier) {
        console.error('Category or supplier not found');
        return;
      }
      const categoryId = category._id;
      const supplierId = supplier._id;
      const response = await axios.put(`/api/inventory/items/${itemId}`, {
        name: newItem.name,
        description: newItem.description,
        category: categoryId,
        supplier: supplierId,
        quantity: newItem.quantity,
        price: newItem.price,
      });
      const updatedItems = items.map((item) => item._id === itemId ? response.data : item);
      setItems(updatedItems);
      setNewItem({
        name: '',
        description: '',
        category: '',
        supplier: '',
        quantity: 0,
        price: 0,
      });
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await axios.delete(`/api/inventory/items/${itemId}`);
      const updatedItems = items.filter((item) => item._id !== itemId);
      setItems(updatedItems);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditItem = (item) => {
    setEditing(true);
    setItemId(item._id);
    setNewItem({
      name: item.name,
      description: item.description,
      category: item.category.name,
      supplier: item.supplier.name,
      quantity: item.quantity,
      price: item.price,
    });
  };
  return (
    <div className="inventory-management-container">
      <h1 className="inventory-management-title">Inventory Management</h1>
      <h2>Create Category</h2>
      <form className="create-category-form" onSubmit={handleCreateCategory}>
        <label>
          Category Name:
          <input type="text" value={newCategory} onChange={(event) => setNewCategory(event.target.value)} />
        </label>
        <button type="submit">Create</button>
      </form>
      <h2>Create Item</h2>
      <form className="create-item-form" onSubmit={editing ? handleUpdateItem : handleCreateItem}>
        <label>
          Item Name:
          <input type="text" value={newItem.name} onChange={(event) => setNewItem({ ...newItem, name: event.target.value })} />
        </label>
        <br />
        <label>
          Description:
          <input type="text" value={newItem.description} onChange={(event) => setNewItem({ ...newItem, description: event.target.value })} />
        </label>
        <br />
        <label>
          Category:
          <select value={newItem.category} onChange={(event) => setNewItem({ ...newItem, category: event.target.value })}>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>{category.name}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Supplier:
          <select value={newItem.supplier} onChange={(event) => setNewItem({ ...newItem, supplier: event.target.value })}>
            <option value="">Select a supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier._id} value={supplier.name}>{supplier.name}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Quantity:
          <input type="number" value={newItem.quantity} onChange={(event) => setNewItem({ ...newItem, quantity: event.target.valueAsNumber })} />
        </label>
        <br />
        <label>
          Price:
          <input type="number" step="0.01" value={newItem.price} onChange={(event) => setNewItem({ ...newItem, price: event.target.valueAsNumber })} />
        </label>
        <br />
        <button type="submit">{editing ? 'Update' : 'Create'}</button>
      </form>
      <h2>Categories</h2>
      <ul className="categories-list">
        {categories.map((category) => (
          <li key={category._id}>{category.name}</li>
        ))}
      </ul>
      <h2>Suppliers</h2>
      <ul className="suppliers-list">
        {suppliers.map((supplier) => (
          <li key={supplier._id}>{supplier.name}</li>
        ))}
      </ul>
      <h2>Items</h2>
      <ul className="items-list">
        {items.map((item) => (
          <li key={item._id}>
            {item.name}
            <button onClick={() => handleEditItem(item)}>Edit</button>
            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryManagement;