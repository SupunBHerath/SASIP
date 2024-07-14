// src/Components/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';  // Import CircularProgress
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated, loading } = React.useContext(AuthContext);  // Get authentication status and loading state

  if (loading) {
    return <CircularProgress size={24} sx={{ color: 'primary.main' }} />;  // Show a loader while checking authentication status
  }

  return isAuthenticated ? element : <Navigate to="/admin/login" />;  // Redirect to login if not authenticated
};

export default PrivateRoute;
