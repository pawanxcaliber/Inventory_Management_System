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
        const response = await axios.get('/api/suppliers'); // Modified API endpoint
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
      const response = await axios.post('/api/inventory/items', newItem);
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
      <form className="create-item-form" onSubmit={handleCreateItem}>
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
        <button type="submit">Create</button>
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
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryManagement;