// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true); // Initial loading state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchSessionInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5000/session-info', { withCredentials: true });
        setIsAuthenticated(response.data.loggedIn);
      } catch (error) {
        console.error('Failed to fetch session info:', error);
      } finally {
        setIsLoading(false); // Set loading to false after fetch (success or failure)
      }
    };

    fetchSessionInfo();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, setIsAuthenticated }}>
      {isLoading ? (
        <div>Loading authentication status...</div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
