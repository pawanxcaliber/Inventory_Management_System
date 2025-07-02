import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Assuming this points to the shared Dashboard.css

const Dashboard = () => {
  const [orderCount, setOrderCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [ordersResponse, salesResponse, itemsResponse] = await Promise.all([
          axios.get('/manager/orders'), // Assuming this endpoint returns an array of orders
          axios.get('/manager/sales/get'), // Assuming this endpoint returns an array of sales
          axios.get('/api/inventory/items'), // Assuming this endpoint returns an array of items
        ]);

        setOrderCount(ordersResponse.data.length);
        setSalesCount(salesResponse.data.length);
        setItemCount(itemsResponse.data.length);
      } catch (error) {
        console.error('Error fetching dashboard counts:', error);
        // Optionally set counts to 0 or display an error message on UI
        setOrderCount(0);
        setSalesCount(0);
        setItemCount(0);
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
        {/* Manager Dashboard has 3 metrics, Admin has 4. This is a difference in data, not layout. */}
      </div>
      <div className="button-container">
        <Link
          to="/manager-dashboard/inventory-management"
          className="dashboard-button" // Changed from <button> inside <Link>
        >
          Inventory Management
        </Link>
        <Link
          to="/manager-dashboard/order-management"
          className="dashboard-button" // Changed from <button> inside <Link>
        >
          Order Management
        </Link>
        <Link
          to="/manager-dashboard/sales-tracking"
          className="dashboard-button" // Changed from <button> inside <Link>
        >
          Sales Tracking
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;