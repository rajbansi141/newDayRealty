import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../Components/LoadingSpinner';

const ProtectedRoute = ({ children, adminOnly = false, userOnly = false }) => {
  const { isAuthenticated, isAdmin, isUser, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin()) {
    // Redirect to user dashboard if trying to access admin route without admin role
    return <Navigate to="/dashboard" replace />;
  }

  if (userOnly && !isUser()) {
    // Redirect to admin dashboard if trying to access user route as an admin
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;
