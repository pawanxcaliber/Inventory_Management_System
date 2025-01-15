import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RecordSaleManagement.css';

const RecordSaleManagement = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [date, setDate] = useState('');
  const [saleRecorded, setSaleRecorded] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('/staff/inventory');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error.message);
        console.error('Error response:', error.response);
      }
    };

    fetchItems();
  }, []);

  const handleRecordSale = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/staff/sales/record-sale', {
        itemId: selectedItem,
        quantity,
        totalPrice,
        date,
      });
      console.log(response.data);
      setSaleRecorded(true);
    } catch (error) {
      console.error('Error recording sale:', error.message);
      console.error('Error response:', error.response);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-title">Record Sale</h1>
      <form onSubmit={handleRecordSale}>
        <div className="key-metrics-container">
          <div className="key-metric">
            <h2>Item</h2>
            <select value={selectedItem} onChange={(event) => setSelectedItem(event.target.value)}>
              <option value="">Select an item</option>
              {items.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="key-metric">
            <h2>Quantity</h2>
            <input
              type="number"
              value={quantity}
              onChange={(event) => setQuantity(event.target.valueAsNumber)}
            />
          </div>
          <div className="key-metric">
            <h2>Total Price</h2>
            <input
              type="number"
              value={totalPrice}
              onChange={(event) => setTotalPrice(event.target.valueAsNumber)}
            />
          </div>
          <div className="key-metric">
            <h2>Date</h2>
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
        </div>
        <div className="button-container">
          <button type="submit" className="dashboard-button">
            Record Sale
          </button>
          <Link to="/staff/dashboard">
            <button className="dashboard-button">Back to Dashboard</button>
          </Link>
        </div>
      </form>
      {saleRecorded && <p>Sale recorded successfully!</p>}
    </div>
  );
};

export default RecordSaleManagement;