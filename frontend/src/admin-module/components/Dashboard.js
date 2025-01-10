import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [supplierCount, setSupplierCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('/api/users/all');
        setUserCount(response.data.length);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSupplierCount = async () => {
      try {
        const response = await axios.get('/api/suppliers');
        setSupplierCount(response.data.length);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchItemCount = async () => {
      try {
        const response = await axios.get('/api/inventory/items');
        setItemCount(response.data.length);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCategoryCount = async () => {
      try {
        const response = await axios.get('/api/inventory/categories');
        setCategoryCount(response.data.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserCount();
    fetchSupplierCount();
    fetchItemCount();
    fetchCategoryCount();
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
        <button className="dashboard-button">Inventory Management</button>
        <button className="dashboard-button">Supplier Management</button>
        <button className="dashboard-button">User Management</button>
        <button className="dashboard-button">Report Generation</button>
      </div>
    </div>
  );
};

export default Dashboard;