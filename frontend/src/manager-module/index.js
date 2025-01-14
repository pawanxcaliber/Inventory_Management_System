import React from 'react';
import Dashboard from './components/Dashboard';
import InventoryManagement from './components/InventoryManagement';
import OrderManagement from './components/OrderManagement';
import SalesTracking from './components/SalesTracking';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const ManagerModule = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/inventory-management" element={<InventoryManagement />} />
        <Route path="/order-management" element={<OrderManagement />} />
        <Route path="/sales-tracking" element={<SalesTracking />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ManagerModule;