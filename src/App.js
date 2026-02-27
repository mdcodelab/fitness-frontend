import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principală */}
        <Route path="/" element={<Home />} />

        {/* Pagina de login */}
        <Route path="/login" element={<Login />} />

        {/* Pagina de register */}
        <Route path="/register" element={<Register />} />

        {/* Dashboard - după login */}
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
