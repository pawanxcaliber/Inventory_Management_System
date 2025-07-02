import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Imports the shared Dashboard.css

const Dashboard = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchManagerData = async () => {
      try {
        const [
          ordersResponse,
          pendingOrdersResponse,
          salesResponse,
          revenueResponse,
        ] = await Promise.all([
          axios.get('/manager/orders/all'), // Assuming an endpoint for all orders
          axios.get('/manager/orders/pending'), // Assuming an endpoint for pending orders
          axios.get('/manager/sales/get'), // Assuming an endpoint for all sales records
          axios.get('/manager/revenue/total'), // Assuming an endpoint for total revenue
        ]);

        setTotalOrders(ordersResponse.data.length); // Assuming array, count length
        setPendingOrders(pendingOrdersResponse.data.length); // Assuming array, count length
        setTotalSales(salesResponse.data.length); // Assuming array, count length
        setTotalRevenue(revenueResponse.data.totalRevenue); // Assuming object with totalRevenue property
      } catch (error) {
        console.error('Error fetching manager dashboard data:', error);
        // Optionally set counts to 0 or display an error message on UI
        setTotalOrders(0);
        setPendingOrders(0);
        setTotalSales(0);
        setTotalRevenue(0);
      }
    };

    fetchManagerData();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-title">Manager Dashboard</h1>
      <div className="key-metrics-container">
        <div className="key-metric">
          <h2>Total Orders:</h2>
          <p>{totalOrders}</p>
        </div>
        <div className="key-metric">
          <h2>Pending Orders:</h2>
          <p>{pendingOrders}</p>
        </div>
        <div className="key-metric">
          <h2>Total Sales:</h2>
          <p>{totalSales}</p>
        </div>
        <div className="key-metric">
          <h2>Total Revenue:</h2>
          <p>${totalRevenue ? totalRevenue.toFixed(2) : '0.00'}</p>
        </div>
      </div>
      <div className="button-container">
        <Link to="/manager-dashboard/inventory-overview" className="dashboard-button">
          Inventory Overview
        </Link>
        <Link to="/manager-dashboard/order-management" className="dashboard-button">
          Order Management
        </Link>
        <Link to="/manager-dashboard/sales-tracking" className="dashboard-button">
          Sales Tracking
        </Link>
        <Link to="/manager-dashboard/staff-performance" className="dashboard-button">
          Staff Performance
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;