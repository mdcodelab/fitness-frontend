import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import PastActivities from './pages/PastActivities';
import { AuthProvider } from './context';

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* Ruta principală */}
        <Route path="/" element={<Home />} />

        {/* Pagina de login */}
        <Route path="/login" element={<Login />} />

        {/* Pagina de register */}
        <Route path="/register" element={<Register />} />

        {/* Dashboard - după login */}

        <Route path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

       <Route path="/dashboard/past-activities"
        element={
          <ProtectedRoute>
            <PastActivities />
          </ProtectedRoute>
        }
      />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
