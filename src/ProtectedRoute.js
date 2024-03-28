import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './store/auth';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
