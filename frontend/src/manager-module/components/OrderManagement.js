import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderManagement.css';

function App() {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [newOrder, setNewOrder] = useState({
    orderDate: '',
    supplier: '',
    items: [
      {
        item: '',
        quantity: 0,
      },
    ],
  });

  useEffect(() => {
    axios.get('/api/inventory/items')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    axios.get('/api/suppliers')
      .then(response => {
        setSuppliers(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    axios.get('/manager/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleCreateOrder = (event) => {
    event.preventDefault();
    axios.post('/manager/orders', newOrder)
      .then(response => {
        setOrders([...orders, response.data]);
        setNewOrder({
          orderDate: '',
          supplier: '',
          items: [
            {
              item: '',
              quantity: 0,
            },
          ],
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleApproveOrder = (orderId) => {
    axios.put(`/manager/orders/${orderId}/approve`)
      .then(response => {
        const updatedOrders = orders.map(order => order._id === orderId ? response.data : order);
        setOrders(updatedOrders);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleCancelOrder = (orderId) => {
    axios.put(`/manager/orders/${orderId}/cancel`)
      .then(response => {
        const updatedOrders = orders.map(order => order._id === orderId ? response.data : order);
        setOrders(updatedOrders);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleChange = (event) => {
    setNewOrder({ ...newOrder, [event.target.name]: event.target.value });
  };

  const handleItemChange = (event) => {
    setNewOrder({
      ...newOrder,
      items: [{ ...newOrder.items[0], [event.target.name]: event.target.value }],
    });
  };
  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-title">Order Management</h1>
      <h2>Create Order</h2>
      <form onSubmit={handleCreateOrder}>
        <label>
          Order Date:
          <input type="date" name="orderDate" value={newOrder.orderDate} onChange={handleChange} />
        </label>
        <br />
        <label>
          Supplier:
          <select name="supplier" value={newOrder.supplier} onChange={handleChange}>
            <option value="">Select Supplier</option>
            {suppliers.map(supplier => (
              <option key={supplier._id} value={supplier._id}>{supplier.name}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Item:
          <select name="item" value={newOrder.items[0].item} onChange={handleItemChange}>
            <option value="">Select Item</option>
            {items.map(item => (
              <option key={item._id} value={item._id}>{item.name}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Quantity:
          <input type="number" name="quantity" value={newOrder.items[0].quantity} onChange={handleItemChange} />
        </label>
        <br />
        <button type="submit" className="dashboard-button">Create Order</button>
      </form>
      <h2>Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            <p>Order ID: {order._id}</p>
            <p>Order Date: {order.orderDate || 'Not specified'}</p>
            <p>
              Supplier: {suppliers.find(supplier => supplier._id === order.supplier)?.name || 'Not specified'}
            </p>
            {order.items && order.items.length > 0 ? (
              order.items.map(item => (
                <div key={item._id}>
                  <p>Item: {items.find(i => i._id === item.item)?.name || item.item}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              ))
            ) : (
              <p>Item: Not specified</p>
            )}
            <p>Status: {order.status}</p>
            {order.status === 'pending' || order.status === 'cancelled' ? (
              <>
                <button onClick={() => handleApproveOrder(order._id)}>Approve</button>
                <button onClick={() => handleCancelOrder(order._id)}>Cancel</button>
              </>
            ) : order.status === 'approved' ? (
              <button onClick={() => handleCancelOrder(order._id)}>Cancel</button>
            ) : (
              <p>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;