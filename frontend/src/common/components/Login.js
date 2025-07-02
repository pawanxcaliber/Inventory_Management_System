import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted');
  
    try {
      console.log('Making API request to /api/users/all');
      const response = await axios.get('/api/users/all');
      console.log('API request successful', response);
  
      const users = response.data;
      const user = users.find((user) => user.email === email && user.role === role);
  
      if (user) {
        console.log('User found', user);
  
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
          console.log('Password is valid');
          switch (role) {
            case 'Admin':
              navigate('/admin-dashboard');
              break;
            case 'Manager':
              navigate('/manager-dashboard');
              break;
            case 'Staff':
              navigate('/staff-dashboard');
              break;
            default:
              console.log('Invalid role');
          }
        } else {
          console.log('Password is invalid');
          setErrors({ password: 'Invalid password' });
        }
      } else {
        console.log('User not found');
        setErrors({ email: 'Invalid email or role' });
      }
    } catch (error) {
      console.error('API request failed', error);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-title">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="key-metrics-container">
          <div className="key-metric">
            <h2>Email</h2>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div className="key-metric">
            <h2>Password</h2>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
        </div>
        <div className="key-metrics-container">
          <div className="key-metric">
            <h2>Role</h2>
            <select value={role} onChange={(event) => setRole(event.target.value)}>
              <option value="">Select a role</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Staff">Staff</option>
            </select>
          </div>
        </div>
        <div className="button-container">
          <button className="dashboard-button" type="submit">Login</button>
        </div>
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </form>
    </div>
  );
}

export default Login;