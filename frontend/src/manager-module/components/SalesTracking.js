// SalesTracking.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SalesTracking.css';

function SalesTracking() {
  const [sales, setSales] = useState([]);
  const [newSale, setNewSale] = useState({
    itemId: '',
    quantity: 0,
    totalPrice: 0,
    date: '',
  });
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('/manager/sales/get')
      .then(response => {
        setSales(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    axios.get('/api/inventory/items')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleRecordSale = (event) => {
    event.preventDefault();
    axios.post('/manager/sales/record', newSale)
      .then(response => {
        setSales([...sales, response.data]);
        setNewSale({
          itemId: '',
          quantity: 0,
          totalPrice: 0,
          date: '',
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleGetSalesByDate = (event) => {
    event.preventDefault();
    const startDate = event.target.startDate.value;
    const endDate = event.target.endDate.value;
    axios.get(`/manager/sales/get-by-date?startDate=${startDate}&endDate=${endDate}`)
      .then(response => {
        setSales(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleChange = (event) => {
    if (event.target.name === 'itemId') {
      const selectedItem = items.find(item => item._id === event.target.value);
      setNewSale({ ...newSale, itemId: event.target.value, itemName: selectedItem.name });
    } else {
      setNewSale({ ...newSale, [event.target.name]: event.target.value });
    }
  };

  function getItemName(sale) {
    if (sale.itemId && typeof sale.itemId === 'object' && sale.itemId.name) return sale.itemId.name;
    if (sale.inventoryItemId && typeof sale.inventoryItemId === 'object' && sale.inventoryItemId.name) return sale.inventoryItemId.name;
    if (sale.itemId && typeof sale.itemId === 'string') {
      const item = items.find(item => item._id === sale.itemId);
      return item ? item.name : sale.itemId;
    }
    return sale.itemId || sale.inventoryItemId;
  }

  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-title">Sales Tracking</h1>
      <h2>Record Sale</h2>
      <form onSubmit={handleRecordSale}>
        <label>
          Item:
          <select name="itemId" value={newSale.itemId} onChange={handleChange}>
            <option value="">Select Item</option>
            {items.map(item => (
              <option key={item._id} value={item._id}>{item.name}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Quantity:
          <input type="number" name="quantity" value={newSale.quantity} onChange={handleChange} />
        </label>
        <br />
        <label>
          Total Price:
          <input type="number" name="totalPrice" value={newSale.totalPrice} onChange={handleChange} />
        </label>
        <br />
        <label>
          Date:
          <input type="date" name="date" value={newSale.date} onChange={handleChange} />
        </label>
        <br />
        <button type="submit" className="dashboard-button">Record Sale</button>
      </form>
      <h2>Get Sales by Date</h2>
      <form onSubmit={handleGetSalesByDate}>
        <label>
          Start Date:
          <input type="date" name="startDate" />
        </label>
        <br />
        <label>
          End Date:
          <input type="date" name="endDate" />
        </label>
        <br />
        <button type="submit" className="dashboard-button">Get Sales</button>
      </form>
      <h2>Sales</h2>
      <ul>
        {sales.map(sale => (
          <li key={sale._id}>
            <p>Item: {getItemName(sale)}</p>
            <p>Quantity: {sale.quantity}</p>
            <p>Total Price: {sale.totalPrice}</p>
            <p>Date: {sale.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SalesTracking;