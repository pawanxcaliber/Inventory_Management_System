import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [supplierCount, setSupplierCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const responses = await Promise.all([
          axios.get('/api/users/all'),
          axios.get('/api/suppliers'),
          axios.get('/api/inventory/items'),
          axios.get('/api/inventory/categories'),
        ]);

        setUserCount(responses[0].data.length);
        setSupplierCount(responses[1].data.length);
        setItemCount(responses[2].data.length);
        setCategoryCount(responses[3].data.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <div className="key-metrics-container">
        <div className="key-metric">
          <h2>Total Users:</h2>
          <p>{userCount}</p>
        </div>
        <div className="key-metric">
          <h2>Total Suppliers:</h2>
          <p>{supplierCount}</p>
        </div>
        <div className="key-metric">
          <h2>Total Items:</h2>
          <p>{itemCount}</p>
        </div>
        <div className="key-metric">
          <h2>Total Categories:</h2>
          <p>{categoryCount}</p>
        </div>
      </div>
      <div className="button-container">
        <Link to="/admin-dashboard/user-management">
          <button className="dashboard-button">User Management</button>
        </Link>
        <Link to="/admin-dashboard/supplier-management">
          <button className="dashboard-button">Supplier Management</button>
        </Link>
        <Link to="/admin-dashboard/inventory-management">
          <button className="dashboard-button">Inventory Management</button>
        </Link>
        <Link to="/admin-dashboard/report-generation">
          <button className="dashboard-button">Report Generation</button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;