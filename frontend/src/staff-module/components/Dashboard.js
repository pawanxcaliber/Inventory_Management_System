import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Imports the shared Dashboard.css

const Dashboard = () => {
  const [itemCount, setItemCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [itemsResponse, salesResponse] = await Promise.all([
          axios.get('/api/inventory/items'), // Assuming this endpoint returns an array of items
          axios.get('/manager/sales/get'), // Assuming this endpoint returns an array of sales (can be shared endpoint)
        ]);

        setItemCount(itemsResponse.data.length);
        setSalesCount(salesResponse.data.length);
      } catch (error) {
        console.error('Error fetching staff dashboard counts:', error);
        // Optionally set counts to 0 or display an error message on UI
        setItemCount(0);
        setSalesCount(0);
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
        <Link
          to="/staff-dashboard/inventory-management"
          className="dashboard-button"
        >
          Inventory Management
        </Link>
        <Link
          to="/staff-dashboard/record-sale"
          className="dashboard-button"
        >
          Record Sale
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;