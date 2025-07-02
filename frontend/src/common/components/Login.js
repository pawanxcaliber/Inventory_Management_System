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
    setErrors({}); // Clear previous errors

    // Basic client-side validation
    if (!email) {
      setErrors(prev => ({ ...prev, email: 'Email is required.' }));
      return;
    }
    if (!password) {
      setErrors(prev => ({ ...prev, password: 'Password is required.' }));
      return;
    }
    if (!role) {
      setErrors(prev => ({ ...prev, role: 'Role is required.' }));
      return;
    }

    try {
      const response = await axios.get('/api/users/all');
      const users = response.data;
      const user = users.find((user) => user.email === email && user.role === role);
  
      if (user) {
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
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
              setErrors({ general: 'Invalid role selected.' });
          }
        } else {
          setErrors({ password: 'Invalid password.' });
        }
      } else {
        setErrors({ email: 'Invalid email or role.' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'An error occurred during login. Please try again later.' });
    }
  };

  return (
    <div className="login-container"> {/* Changed class name */}
      <h1 className="login-title">Login</h1> {/* Changed class name */}
      <form onSubmit={handleSubmit}>
        <div className="form-input-group"> {/* Changed class name */}
          <div className="form-field"> {/* Changed class name */}
            <h2>Email</h2>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required // HTML5 validation
            />
          </div>
          <div className="form-field"> {/* Changed class name */}
            <h2>Password</h2>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required // HTML5 validation
            />
          </div>
        </div>
        <div className="form-input-group"> {/* Changed class name */}
          <div className="form-field"> {/* Changed class name */}
            <h2>Role</h2>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
              required // HTML5 validation
            >
              <option value="">Select a role</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Staff">Staff</option>
            </select>
          </div>
        </div>
        <div className="button-container">
          <button className="login-button" type="submit">Login</button> {/* Changed class name, removed arrow */}
        </div>
        {/* Render error messages using the new CSS class */}
        {errors.email && <p className="error-message">{errors.email}</p>}
        {errors.password && <p className="error-message">{errors.password}</p>}
        {errors.role && <p className="error-message">{errors.role}</p>}
        {errors.general && <p className="error-message">{errors.general}</p>}
      </form>
    </div>
  );
}

export default Login;