import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoadingIndicator } from '../components/common';

/**
 * ProtectedRoute component
 * Protects routes that require authentication
 * @param {Object} props - Component props
 * @returns {JSX.Element} - ProtectedRoute component
 */
const ProtectedRoute = ({ children, requiredPermission = null }) => {
  const { user, isAuthenticated, isLoading, hasPermission } = useAuth();
  const location = useLocation();

  // Show loading indicator while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingIndicator size="lg" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check for required permission
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Render children if authenticated and has permission
  return children;
};

export default ProtectedRoute;

