import React from 'react';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import SupplierManagement from './components/SupplierManagement';
import InventoryManagement from './components/InventoryManagement';
import ReportsAndAnalytics from './components/ReportsAndAnalytics';
import { Routes, Route } from 'react-router-dom';

const AdminModule = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/user-management" element={<UserManagement />} />
      <Route path="/supplier-management" element={<SupplierManagement />} />
      <Route path="/inventory-management" element={<InventoryManagement />} />
      <Route path="/report-generation" element={<ReportsAndAnalytics />} />
    </Routes>
  );
};

export default AdminModule;