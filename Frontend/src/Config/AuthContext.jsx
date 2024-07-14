import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (authToken) {
      axios.get('http://localhost:5005/api/check-token', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      })
      .then(response => {
        console.log('Token check response:', response);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch(error => {
        console.error('Token validation error:', error);
        setAuthToken('');
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [authToken]);

  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setAuthToken('');
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
