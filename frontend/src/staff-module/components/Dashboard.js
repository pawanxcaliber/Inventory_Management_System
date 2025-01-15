import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [itemCount, setItemCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const responses = await Promise.all([
          axios.get('/api/inventory/items'),
          axios.get('/manager/sales/get'),
        ]);

        setItemCount(responses[0].data.length);
        setSalesCount(responses[1].data.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-title">Staff Dashboard</h1>
      <div className="key-metrics-container">
        <div className="key-metric">
          <h2>Total Items:</h2>
          <p>{itemCount}</p>
        </div>
        <div className="key-metric">
          <h2>Total Sales:</h2>
          <p>{salesCount}</p>
        </div>
      </div>
      <div className="button-container">
        <Link to="/staff-dashboard/inventory-management">
          <button className="dashboard-button">Inventory Management</button>
        </Link>
        <Link to="/staff-dashboard/record-sale">
          <button className="dashboard-button">Record Sale</button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;