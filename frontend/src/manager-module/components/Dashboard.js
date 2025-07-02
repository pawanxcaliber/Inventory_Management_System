import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [orderCount, setOrderCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const responses = await Promise.all([
          axios.get('/manager/orders'),
          axios.get('/manager/sales/get'),
          axios.get('/api/inventory/items'),
        ]);

        setOrderCount(responses[0].data.length);
        setSalesCount(responses[1].data.length);
        setItemCount(responses[2].data.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-title">Manager Dashboard</h1>
      <div className="key-metrics-container">
        <div className="key-metric">
          <h2>Total Orders:</h2>
          <p>{orderCount}</p>
        </div>
        <div className="key-metric">
          <h2>Total Sales:</h2>
          <p>{salesCount}</p>
        </div>
        <div className="key-metric">
          <h2>Total Items:</h2>
          <p>{itemCount}</p>
        </div>
      </div>
      <div className="button-container">
        <Link to="/manager-dashboard/inventory-management">
          <button className="dashboard-button">Inventory Management</button>
        </Link>
        <Link to="/manager-dashboard/order-management">
          <button className="dashboard-button">Order Management</button>
        </Link>
        <Link to="/manager-dashboard/sales-tracking">
          <button className="dashboard-button">Sales Tracking</button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;