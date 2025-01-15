import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './common/components/Login';
import AdminModule from './admin-module/index';
import ManagerModule from './manager-module/index';
import StaffModule from './staff-module/index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-dashboard/*" element={<AdminModule />} />
        <Route path="/manager-dashboard/*" element={<ManagerModule />} />
        <Route path="/staff-dashboard/*" element={<StaffModule />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;