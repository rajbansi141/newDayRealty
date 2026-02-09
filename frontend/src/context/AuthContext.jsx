import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const storedToken = authService.getStoredToken();
  const storedUser = authService.getStoredUser();
  
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [loading, setLoading] = useState(false);

  // Login function
  const login = async (email, password) => {
    const result = await authService.login(email, password);

    if (result.success) {
      setToken(result.token);
      setUser(result.user);
    }

    return result;
  };

  // Register function
  const register = async (userData) => {
    const result = await authService.register(userData);

    if (result.success) {
      setToken(result.token);
      setUser(result.user);
    }

    return result;
  };

  // Logout function
  const logout = async () => {
    await authService.logout();
    setUser(null);
    setToken(null);
  };

  // Update user details
  const updateDetails = async (userData) => {
    const result = await authService.updateDetails(userData);

    if (result.success) {
      setUser(result.user);
    }

    return result;
  };

  // Update password
  const updatePassword = async (currentPassword, newPassword) => {
    return await authService.updatePassword(currentPassword, newPassword);
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!token && !!user;
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  // Check if user is regular user
  const isUser = () => {
    return user?.role === 'user';
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateDetails,
    updatePassword,
    isAuthenticated,
    isAdmin,
    isUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
