import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SupplierRegForm from './views/SupplierRegForm';
import SupplierProduct from './views/SupplierProduct';
import Users from './views/Users';
import UpdateUser from './views/UpdateUser';
import Login from './views/Login';
import Home from './views/Home';
import AddItem from './views/AddItem';  // Make sure the AddItem component exists
import UpdateItem from './views/UpdateItem';

function App() {
  return (
    <Router>
      <Routes>
        {/* User Management Routes */}
        <Route path="/" element={<Users />} />
        <Route path="/update" element={<UpdateUser />} />

        {/* Supplier Management Routes */}
        <Route path="/SupplierRegForm" element={<SupplierRegForm />} />
        <Route path="/SupplierProduct" element={<SupplierProduct />} />

        {/* Add Item Page */}
        <Route path="/AddItem" element={<AddItem />} />

        {/* Other Routes */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/UpdateItem" element={<UpdateItem />} />
      </Routes>
    </Router>
  );
}

export default App;
