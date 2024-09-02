import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SupplierRegForm from './views/SupplierRegForm';
import Users from './views/Users';
import UpdateUser from './views/UpdateUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />} />
        {/* <Route path="/create" element={<CreateUser />} /> */}
        <Route path="/update" element={<UpdateUser />} />
        <Route path="/SupplierRegForm" element={<SupplierRegForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
