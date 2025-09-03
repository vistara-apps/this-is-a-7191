import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Import pages
import Dashboard from '../pages/Dashboard';
import Marketplace from '../pages/Marketplace';
import Verification from '../pages/Verification';
import Concierge from '../pages/Concierge';
import Rights from '../pages/Rights';
import Auth from '../pages/Auth';
import NotFound from '../pages/NotFound';

/**
 * Protected route component
 * Redirects to login if user is not authenticated
 * @param {Object} props - Component props
 * @returns {JSX.Element} - Protected route component
 */
const ProtectedRoute = ({ children, requiredPermission = null }) => {
  const { isAuthenticated, isLoading, hasPermission } = useAuth();

  // Show loading indicator while checking authentication
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required permission
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

/**
 * Main application routes
 * @returns {JSX.Element} - Application routes
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Auth mode="login" />} />
      <Route path="/register" element={<Auth mode="register" />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/marketplace"
        element={
          <ProtectedRoute requiredPermission="view_marketplace">
            <Marketplace />
          </ProtectedRoute>
        }
      />
      <Route
        path="/verification"
        element={
          <ProtectedRoute requiredPermission="view_verification">
            <Verification />
          </ProtectedRoute>
        }
      />
      <Route
        path="/concierge"
        element={
          <ProtectedRoute requiredPermission="use_concierge">
            <Concierge />
          </ProtectedRoute>
        }
      />
      <Route
        path="/rights"
        element={
          <ProtectedRoute requiredPermission="manage_rights">
            <Rights />
          </ProtectedRoute>
        }
      />

      {/* Redirect root to dashboard or login */}
      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />

      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

