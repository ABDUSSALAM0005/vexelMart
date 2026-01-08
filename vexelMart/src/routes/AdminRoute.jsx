import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  // 1. Check if user exists and is Admin
  if (user && user.isAdmin) {
    // If wrapping a specific component, render it. 
    // If used as a Layout wrapper, render <Outlet />
    return children ? children : <Outlet />;
  }

  // 2. If not admin, redirect to home (or login)
  return <Navigate to="/" replace />;
};

export default AdminRoute;