import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReportsAndAnalytics.css';

const ReportsAndAnalytics = () => {
  const [salesReport, setSalesReport] = useState([]);
  const [stockReport, setStockReport] = useState([]);

  useEffect(() => {
    const fetchSalesReport = async () => {
      try {
        const response = await axios.get('/api/reports/sales-report');
        setSalesReport(response.data);
      } catch (error) {
        console.error('Error fetching sales report:', error);
      }
    };

    const fetchStockReport = async () => {
      try {
        const response = await axios.get('/api/reports/stock-report');
        setStockReport(response.data);
      } catch (error) {
        console.error('Error fetching stock report:', error);
      }
    };

    fetchSalesReport();
    fetchStockReport();
  }, []);

  return (
    <div className="reports-and-analytics-container">
      <h1 className="reports-and-analytics-title">Reports and Analytics</h1>
      
      <h2>Sales Report</h2>
      <div className="table-responsive"> {/* Added for responsive tables */}
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
                <td>{sale.itemId ? sale.itemId.name : (sale.inventoryItemId ? sale.inventoryItemId.name : 'N/A')}</td>
                <td>{sale.quantity}</td>
                <td>${sale.totalPrice ? sale.totalPrice.toFixed(2) : '0.00'}</td> {/* Format to 2 decimal places */}
                <td>{sale.date ? new Date(sale.date).toLocaleDateString() : 'N/A'}</td> {/* Format date */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Stock Report</h2>
      <div className="table-responsive"> {/* Added for responsive tables */}
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
                <td>${item.price ? item.price.toFixed(2) : '0.00'}</td> {/* Format to 2 decimal places */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsAndAnalytics;