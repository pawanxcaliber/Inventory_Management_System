import React from 'react';
import Dashboard from './components/Dashboard';
import InventoryManagement from './components/InventoryManagement';
import RecordSaleManagement from './components/RecordSaleManagement';
import { Routes, Route } from 'react-router-dom';

const StaffModule = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/inventory-management" element={<InventoryManagement />} />
      <Route path="/record-sale" element={<RecordSaleManagement />} />
    </Routes>
  );
};

export default StaffModule;