import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SampleProvider } from './context/SampleContext';
import { ProjectProvider } from './context/ProjectContext';
import { LicenseProvider } from './context/LicenseContext';
import { LoadingIndicator } from './components/common';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import Verification from './pages/Verification';
import Concierge from './pages/Concierge';
import Rights from './pages/Rights';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import NotFound from './pages/NotFound';
import ProtectedRoute from './routes/ProtectedRoute';

/**
 * Main application component
 * @returns {JSX.Element} - App component
 */
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingIndicator size="lg" />
      </div>
    );
  }

  return (
    <Router>
      <AuthProvider>
        <SampleProvider>
          <ProjectProvider>
            <LicenseProvider>
              <Routes>
                {/* Auth routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* Protected routes */}
                <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/verification" element={<Verification />} />
                  <Route path="/concierge" element={<Concierge />} />
                  <Route path="/rights" element={<Rights />} />
                </Route>

                {/* 404 route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </LicenseProvider>
          </ProjectProvider>
        </SampleProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;

