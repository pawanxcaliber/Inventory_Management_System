// src/admin-module/index.js
import React from 'react';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import SupplierManagement from './components/SupplierManagement';
import InventoryManagement from './components/InventoryManagement';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const AdminModule = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/supplier-management" element={<SupplierManagement />} />
        <Route path="/inventory-management" element={<InventoryManagement />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AdminModule;