import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Home />} />
        <Route path="/update" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
