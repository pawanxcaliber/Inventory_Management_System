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
    category: '', // This will hold category._id after selection
    supplier: '', // This will hold supplier._id after selection
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
        console.error('Error fetching categories:', error);
      }
    };

    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('/api/suppliers'); 
        setSuppliers(response.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    const fetchItems = async () => {
      try {
        // Assuming your backend populates category and supplier details
        const response = await axios.get('/api/inventory/items'); 
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
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
      console.error('Error creating category:', error);
    }
  };

  const handleCreateItem = async (event) => {
    event.preventDefault();
    try {
      // Ensure category and supplier IDs are sent, not names
      const selectedCategory = categories.find(cat => cat._id === newItem.category);
      const selectedSupplier = suppliers.find(sup => sup._id === newItem.supplier);
      
      if (!selectedCategory || !selectedSupplier) {
        console.error('Selected category or supplier is invalid.');
        alert('Please select a valid category and supplier.');
        return;
      }

      const response = await axios.post('/api/inventory/items', {
        name: newItem.name,
        description: newItem.description,
        category: newItem.category, // Send ID
        supplier: newItem.supplier, // Send ID
        quantity: newItem.quantity,
        price: newItem.price,
      });
      setItems([...items, response.data]); // Assuming response.data comes back with populated category/supplier
      setNewItem({
        name: '',
        description: '',
        category: '',
        supplier: '',
        quantity: 0,
        price: 0,
      });
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  const handleUpdateItem = async (event) => {
    event.preventDefault();
    try {
      // Find IDs if they were stored as names in state for editing
      const selectedCategory = categories.find(cat => cat._id === newItem.category);
      const selectedSupplier = suppliers.find(sup => sup._id === newItem.supplier);

      if (!selectedCategory || !selectedSupplier) {
        console.error('Category or supplier not found during update');
        alert('Please select a valid category and supplier.');
        return;
      }
      
      const response = await axios.put(`/api/inventory/items/${itemId}`, {
        name: newItem.name,
        description: newItem.description,
        category: newItem.category, // Send ID
        supplier: newItem.supplier, // Send ID
        quantity: newItem.quantity,
        price: newItem.price,
      });
      // Replace the updated item in the list. Ensure response.data is populated correctly.
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
      console.error('Error updating item:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`/api/inventory/items/${itemId}`);
      const updatedItems = items.filter((item) => item._id !== itemId);
      setItems(updatedItems);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEditItem = (item) => {
    setEditing(true);
    setItemId(item._id);
    setNewItem({
      name: item.name,
      description: item.description,
      // When setting for edit, ensure you're setting the ID, not the name if your backend expects ID for update
      category: item.category._id, // Assuming item.category is an object with _id
      supplier: item.supplier._id, // Assuming item.supplier is an object with _id
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
          <input type="text" value={newCategory} onChange={(event) => setNewCategory(event.target.value)} required />
        </label>
        <button type="submit">Create Category</button>
      </form>

      <h2>Create/Update Item</h2>
      <form className="create-item-form" onSubmit={editing ? handleUpdateItem : handleCreateItem}>
        <label>
          Item Name:
          <input type="text" value={newItem.name} onChange={(event) => setNewItem({ ...newItem, name: event.target.value })} required />
        </label>
        
        <label>
          Description:
          <input type="text" value={newItem.description} onChange={(event) => setNewItem({ ...newItem, description: event.target.value })} />
        </label>
        
        <label>
          Category:
          <select value={newItem.category} onChange={(event) => setNewItem({ ...newItem, category: event.target.value })} required>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </label>
        
        <label>
          Supplier:
          <select value={newItem.supplier} onChange={(event) => setNewItem({ ...newItem, supplier: event.target.value })} required>
            <option value="">Select a supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier._id} value={supplier._id}>{supplier.name}</option>
            ))}
          </select>
        </label>
        
        <label>
          Quantity:
          <input type="number" value={newItem.quantity} onChange={(event) => setNewItem({ ...newItem, quantity: event.target.valueAsNumber })} required min="0" />
        </label>
        
        <label>
          Price:
          <input type="number" step="0.01" value={newItem.price} onChange={(event) => setNewItem({ ...newItem, price: event.target.valueAsNumber })} required min="0" />
        </label>
        
        <button type="submit">{editing ? 'Update Item' : 'Create Item'}</button>
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
            <span>
              {item.name} ({item.category?.name} - {item.supplier?.name} - Qty: {item.quantity} - Price: ${item.price?.toFixed(2)})
            </span>
            <div> {/* Wrap buttons for better flex control */}
              <button onClick={() => handleEditItem(item)}>Edit</button>
              <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryManagement;