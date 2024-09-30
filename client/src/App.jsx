import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SupplierRegForm from './views/SupplierRegForm';
import SupplierProduct from './views/SupplierProduct';
import Users from './views/Users';
import UpdateUser from './views/UpdateUser';
import Login from './views/Login';
import Home from './views/Home';

import AdminPage from './views/AdminPage';
import AdminAdditem from './views/AdminAdditem';
import Adminproduct from './views/Adminproduct';

import AddItem from './views/AddItem';  
import UpdateItem from './views/UpdateItem';
import GenerateReport from "./views/GenarateReport"; 
import OrderNotification from "./views/OrderNotification"; 
import AcceptAdminOrder from "./views/AcceptAdminOrder"; 

function App() {
  return (
    <Router>
      <Routes>
        {/* User Management Routes */}
        <Route path="/update" element={<UpdateUser />} />
        
        {/* Supplier Management Routes */}
        <Route path="/SupplierRegForm" element={<SupplierRegForm />} />
        <Route path="/SupplierProduct" element={<SupplierProduct />} />

        {/* Add Item Page */}
        <Route path="/AddItem" element={<AddItem />} />

        {/* Other Routes */}
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/AdminAdditem" element={<AdminAdditem />} />
        <Route path="/Adminproduct" element={<Adminproduct />} />
        <Route path="/AdminPage" element={<AdminPage />} />
        
        <Route path="/UpdateItem" element={<UpdateItem />} />
        <Route path="/GenerateReport" element={<GenerateReport />} />
        <Route path="/OrderNotification" element={<OrderNotification />} />
        <Route path="/AcceptAdminOrder" element={<AcceptAdminOrder />} />
      </Routes>
    </Router>
  );
}

export default App;
