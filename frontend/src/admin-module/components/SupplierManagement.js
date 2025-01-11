// src/admin-module/components/SupplierManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SupplierManagement.css';

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [editing, setEditing] = useState(false);
  const [supplierId, setSupplierId] = useState('');

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('/api/suppliers');
        setSuppliers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (editing) {
      try {
        const response = await axios.put(`/api/suppliers/${supplierId}`, {
          name,
          email,
          phone,
          address,
        });
        console.log(response.data);
        setEditing(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await axios.post('/api/suppliers', {
          name,
          email,
          phone,
          address,
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
  };

  const handleEdit = (supplier) => {
    setEditing(true);
    setSupplierId(supplier._id);
    setName(supplier.name);
    setEmail(supplier.email);
    setPhone(supplier.phone);
    setAddress(supplier.address);
  };

  const handleDelete = async (supplierId) => {
    try {
      const response = await axios.delete(`/api/suppliers/${supplierId}`);
      console.log(response.data);
      setSuppliers(suppliers.filter((supplier) => supplier._id !== supplierId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="supplier-management-container">
      <h1 className="supplier-management-title">Supplier Management</h1>
      <form onSubmit={handleSubmit} className="supplier-management-form">
        <label>
          Name:
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <br />
        <label>
          Phone:
          <input type="text" value={phone} onChange={(event) => setPhone(event.target.value)} />
        </label>
        <br />
        <label>
          Address:
          <input type="text" value={address} onChange={(event) => setAddress(event.target.value)} />
        </label>
        <br />
        <button type="submit">{editing ? 'Update' : 'Add'}</button>
      </form>
      <h2 className="supplier-management-subtitle">Suppliers:</h2>
      <ul className="supplier-management-list">
        {suppliers.map((supplier) => (
          <li key={supplier._id} className="supplier-management-list-item">
            <span>{supplier.name} ({supplier.email})</span>
            <button onClick={() => handleEdit(supplier)}>Edit</button>
            <button onClick={() => handleDelete(supplier._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupplierManagement;