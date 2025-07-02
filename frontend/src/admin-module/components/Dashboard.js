import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Imports the shared Dashboard.css

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [supplierCount, setSupplierCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [
          usersResponse,
          suppliersResponse,
          itemsResponse,
          categoriesResponse,
        ] = await Promise.all([
          axios.get('/api/users'), // Assuming an endpoint for total users
          axios.get('/api/suppliers'), // Assuming an endpoint for total suppliers
          axios.get('/api/inventory/items'), // Assuming an endpoint for total items
          axios.get('/api/inventory/categories'), // Assuming an endpoint for total categories
        ]);

        setUserCount(usersResponse.data.length);
        setSupplierCount(suppliersResponse.data.length);
        setItemCount(itemsResponse.data.length);
        setCategoryCount(categoriesResponse.data.length);
      } catch (error) {
        console.error('Error fetching admin dashboard counts:', error);
        // Optionally set counts to 0 or display an error message on UI
        setUserCount(0);
        setSupplierCount(0);
        setItemCount(0);
        setCategoryCount(0);
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
        <Link to="/admin-dashboard/user-management" className="dashboard-button">
          User Management
        </Link>
        <Link to="/admin-dashboard/supplier-management" className="dashboard-button">
          Supplier Management
        </Link>
        <Link to="/admin-dashboard/inventory-management" className="dashboard-button">
          Inventory Management
        </Link>
        <Link to="/admin-dashboard/report-generation" className="dashboard-button">
          Report Generation
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;