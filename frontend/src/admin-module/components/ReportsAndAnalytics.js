import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReportsAndAnalytics.css';

const ReportsAndAnalytics = () => {
  const [salesReport, setSalesReport] = useState([]);
  const [stockReport, setStockReport] = useState([]);
  const [inventoryItems, setInventoryItems] = useState({});

  useEffect(() => {
    const fetchSalesReport = async () => {
      try {
        const response = await axios.get('/api/reports/sales-report');
        setSalesReport(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchStockReport = async () => {
      try {
        const response = await axios.get('/api/reports/stock-report');
        setStockReport(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchInventoryItems = async () => {
      try {
        const response = await axios.get('/api/inventory/items');
        const items = {};
        response.data.forEach((item) => {
          items[item._id] = item;
        });
        setInventoryItems(items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSalesReport();
    fetchStockReport();
    fetchInventoryItems();
  }, []);

  return (
    <div className="reports-and-analytics-container">
      <h1 className="reports-and-analytics-title">Reports and Analytics</h1>
      <h2>Sales Report</h2>
      <table className="sales-report-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity Sold</th>
            <th>Total Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {salesReport.map((sale) => (
            <tr key={sale._id}>
              <td>{inventoryItems[sale.inventoryItemId] ? inventoryItems[sale.inventoryItemId].name : 'N/A'}</td>
              <td>{sale.quantity}</td>
              <td>{sale.totalPrice}</td>
              <td>{sale.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Stock Report</h2>
      <table className="stock-report-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Category</th>
            <th>Supplier</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {stockReport.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.category ? item.category.name : 'N/A'}</td>
              <td>{item.supplier ? item.supplier.name : 'N/A'}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsAndAnalytics;