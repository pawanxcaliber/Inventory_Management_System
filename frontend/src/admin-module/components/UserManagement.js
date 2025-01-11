// src/admin-module/components/UserManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [editing, setEditing] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users/all');
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (editing) {
      try {
        const response = await axios.put(`/api/users/${userId}`, {
          name,
          email,
          password,
          role,
        });
        console.log(response.data);
        setEditing(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await axios.post('/api/users/add', {
          name,
          email,
          password,
          role,
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    setName('');
    setEmail('');
    setPassword('');
    setRole('');
  };

  const handleEdit = (user) => {
    setEditing(true);
    setUserId(user._id);
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
    setRole(user.role);
  };

  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`/api/users/${userId}`);
      console.log(response.data);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="user-management-container">
      <h1 className="user-management-title">User Management</h1>
      <form onSubmit={handleSubmit} className="user-management-form">
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
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <br />
        <label>
          Role:
          <select value={role} onChange={(event) => setRole(event.target.value)}>
            <option value="">Select a role</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Staff">Staff</option>
          </select>
        </label>
        <br />
        <button type="submit">{editing ? 'Update' : 'Add'}</button>
      </form>
      <h2 className="user-management-subtitle">Users:</h2>
      <ul className="user-management-list">
        {users.map((user) => (
          <li key={user._id} className="user-management-list-item">
            <span>{user.name} ({user.email})</span>
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;