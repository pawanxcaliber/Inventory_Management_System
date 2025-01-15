import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InventoryManagement.css';

const InventoryManagement = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [quantitySold, setQuantitySold] = useState({});
  const [lowStockItems, setLowStockItems] = useState([]);

  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const response = await axios.get('/staff/inventory');
        setInventoryItems(response.data);
        const quantitySoldObj = {};
        response.data.forEach((item) => {
          quantitySoldObj[item._id] = 0;
        });
        setQuantitySold(quantitySoldObj);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInventoryItems();
  }, []);

  const handleUpdateStockQuantity = async (event, itemId) => {
    event.preventDefault();
    const quantity = quantitySold[itemId];
    if (isNaN(quantity) || quantity < 0 || quantity > inventoryItems.find((item) => item._id === itemId).quantity) {
      console.error('Invalid quantity');
      return;
    }
    try {
      const response = await axios.put(`/staff/inventory/${itemId}/update-stock-quantity`, {
        quantitySold: quantity,
      });
      console.log(response.data);
      // Update the inventoryItems state
      const updatedInventoryItems = inventoryItems.map((item) => {
        if (item._id === itemId) {
          return { ...item, quantity: item.quantity - quantity };
        }
        return item;
      });
      setInventoryItems(updatedInventoryItems);
      checkLowStockItems(updatedInventoryItems);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleQuantityChange = (event, itemId) => {
    const newQuantitySold = { ...quantitySold };
    newQuantitySold[itemId] = parseInt(event.target.value);
    setQuantitySold(newQuantitySold);
  };

  const checkLowStockItems = (inventoryItems) => {
    const lowStockItems = inventoryItems.filter((item) => item.quantity <= 0);
    setLowStockItems(lowStockItems);
  };

  return (
    <div className="inventory-management-container">
      <h1>Inventory Management</h1>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Update Stock Quantity</th>
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>
                <form onSubmit={(event) => handleUpdateStockQuantity(event, item._id)}>
                  <input
                    type="number"
                    value={quantitySold[item._id]}
                    onChange={(event) => handleQuantityChange(event, item._id)}
                  />
                  <button type="submit">Update</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {lowStockItems.length > 0 && (
        <div>
          <h2>Low Stock Items:</h2>
          <ul>
            {lowStockItems.map((item) => (
              <li key={item._id}>{item.name} - Insufficient stock</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;