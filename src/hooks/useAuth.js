import { useState, useContext } from 'react';
import { useAppContext } from '../context/AppContext';

export const useAuth = () => {
  const { currentUser, login, logout } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      login(credentials);
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return {
    currentUser,
    loading,
    error,
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated: !!currentUser
  };
};