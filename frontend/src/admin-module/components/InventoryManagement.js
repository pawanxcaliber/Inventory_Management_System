import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InventoryManagement.css';

const InventoryManagement = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemPrice, setItemPrice] = useState(0.0);
  const [editing, setEditing] = useState(false);
  const [itemId, setItemId] = useState('');
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('/api/inventory/items');
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

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

    fetchItems();
    fetchCategories();
    fetchSuppliers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};
    if (isNaN(itemQuantity) || itemQuantity <= 0) {
      errors.itemQuantity = 'Invalid quantity';
    }
    if (isNaN(itemPrice) || itemPrice <= 0) {
      errors.itemPrice = 'Invalid price';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      if (editing) {
        const response = await axios.put(`/api/inventory/items/${itemId}`, {
          name: itemName,
          description: itemDescription,
          category: itemCategory,
          supplier: selectedSupplier,
          quantity: itemQuantity,
          price: itemPrice,
        });
        console.log(response.data);
        setEditing(false);
      } else {
        const response = await axios.post('/api/inventory/items', {
          name: itemName,
          description: itemDescription,
          category: itemCategory,
          supplier: selectedSupplier,
          quantity: itemQuantity,
          price: itemPrice,
        });
        console.log(response.data);
        const newItem = response.data;
        setItems([...items, newItem]);
      }

      setItemName('');
      setItemDescription('');
      setItemCategory('');
      setSelectedSupplier('');
      setItemQuantity(0);
      setItemPrice(0.0);
    } catch (error) {
      if (error.response) {
        if (error.response.data.message) {
          if (error.response.data.message === 'Category not found') {
            alert('Please select a valid category');
          } else if (error.response.data.message === 'Supplier not found') {
            alert('Please select a valid supplier');
          } else {
            alert(error.response.data.message);
          }
        } else {
          console.error(error.response.data);
        }
        console.error(error.response.status);
        console.error(error.response.headers);
      } else {
        console.error(error.message);
      }
    }
  };

  const handleEdit = (item) => {
    setEditing(true);
    setItemId(item._id);
    setItemName(item.name);
    setItemDescription(item.description);
    setItemCategory(item.category ? item.category.name : '');
    setSelectedSupplier(item.supplier ? item.supplier._id : '');
    setItemQuantity(Number(item.quantity));
    setItemPrice(Number(item.price));
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await axios.delete(`/api/inventory/items/${itemId}`);
      console.log(response.data);
      setItems(items.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="inventory-management-container">
      <h1 className="inventory-management-title">Inventory Management</h1>
      <form onSubmit={handleSubmit} className="inventory-management-form">
        <label>
          Item Name:
          <input type="text" value={itemName} onChange={(event) => setItemName(event.target.value)} />
        </label>
        <br />
        <label>
          Item Description:
          <input type="text" value={itemDescription} onChange={(event) => setItemDescription(event.target.value)} />
        </label>
        <br />
        <label>
          Category:
          {categories.map((category) => (
            <span key={category._id}>
              <input
                type="radio"
                name="category"
                value={category._id}
                checked={itemCategory === category._id}
                onChange={(event) => setItemCategory(event.target.value)}
              />
              <label>{category.name}</label>
            </span>
          ))}
        </label>
        <br />
        <label>
          Supplier:
          {suppliers.map((supplier) => (
            <span key={supplier._id}>
              <input
                type="radio"
                name="supplier"
                value={supplier._id}
                checked={selectedSupplier === supplier._id}
                onChange={(event) => setSelectedSupplier(event.target.value)}
              />
              <label>{supplier.name}</label>
            </span>
          ))}
        </label>
        <br />
        <label>
          Quantity:
          <input type="number" value={itemQuantity} onChange={(event) => setItemQuantity(event.target.valueAsNumber)} />
          {errors.itemQuantity && <span style={{ color: 'red' }}>{errors.itemQuantity}</span>}
        </label>
        <br />
        <label>
          Price:
          <input type="number" step="0.01" value={itemPrice} onChange={(event) => setItemPrice(event.target.valueAsNumber)} />
          {errors.itemPrice && <span style={{ color: 'red' }}>{errors.itemPrice}</span>}
        </label>
        <br />
        <button type="submit">{editing ? 'Update' : 'Add'}</button>
      </form>
      <h2 className="inventory-management-subtitle">Items:</h2>
      <ul className="inventory-management-list">
        {items.map((item) => (
          <li key={item._id} className="inventory-management-list-item">
            <span>
              {item.name} ({item.description}) - 
              Category: {item.category ? item.category.name : 'N/A'}, 
              Supplier: {item.supplier ? item.supplier.name : 'N/A'}, 
              Quantity: {item.quantity}, 
              Price: {item.price}
            </span>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InventoryManagement;