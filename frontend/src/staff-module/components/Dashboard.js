// src/staff-module/components/StaffDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // reuse the same Dashboard.css

const StaffDashboard = () => {
  const [itemCount, setItemCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [itemsRes, salesRes] = await Promise.all([
          axios.get('/api/inventory/items'),
          axios.get('/manager/sales/get'),
        ]);

        setItemCount(Array.isArray(itemsRes.data) ? itemsRes.data.length : 0);
        setSalesCount(Array.isArray(salesRes.data) ? salesRes.data.length : 0);
      } catch (err) {
        console.error('Error fetching staff dashboard counts:', err);
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

export default StaffDashboard;
