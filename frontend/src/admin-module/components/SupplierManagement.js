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
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const supplierData = { name, email, phone, address };

    if (editing) {
      try {
        const response = await axios.put(`/api/suppliers/${supplierId}`, supplierData);
        console.log(response.data);
        // Refresh the list with the updated supplier
        setSuppliers(suppliers.map(sup => sup._id === supplierId ? response.data : sup));
        setEditing(false);
      } catch (error) {
        console.error('Error updating supplier:', error);
      }
    } else {
      try {
        const response = await axios.post('/api/suppliers', supplierData);
        console.log(response.data);
        // Add the new supplier to the list
        setSuppliers([...suppliers, response.data]);
      } catch (error) {
        console.error('Error adding supplier:', error);
      }
    }

    // Clear form fields
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
      await axios.delete(`/api/suppliers/${supplierId}`); // No need for response data here
      console.log('Supplier deleted successfully.');
      setSuppliers(suppliers.filter((supplier) => supplier._id !== supplierId));
    } catch (error) {
      console.error('Error deleting supplier:', error);
    }
  };

  return (
    <div className="supplier-management-container">
      <h1 className="supplier-management-title">Supplier Management</h1>
      <form onSubmit={handleSubmit} className="supplier-management-form">
        <label>
          Name:
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} required />
        </label>
        {/* Removed <br /> tags */}
        <label>
          Email:
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        {/* Removed <br /> tags */}
        <label>
          Phone:
          <input type="text" value={phone} onChange={(event) => setPhone(event.target.value)} />
        </label>
        {/* Removed <br /> tags */}
        <label>
          Address:
          <input type="text" value={address} onChange={(event) => setAddress(event.target.value)} />
        </label>
        {/* Removed <br /> tags */}
        <button type="submit">{editing ? 'Update Supplier' : 'Add Supplier'}</button>
      </form>
      <h2 className="supplier-management-subtitle">Suppliers:</h2>
      <ul className="supplier-management-list">
        {suppliers.map((supplier) => (
          <li key={supplier._id} className="supplier-management-list-item">
            <span>{supplier.name} ({supplier.email}) - {supplier.phone} - {supplier.address}</span>
            <div> {/* Wrap buttons for better flex control */}
              <button onClick={() => handleEdit(supplier)}>Edit</button>
              <button onClick={() => handleDelete(supplier._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupplierManagement;