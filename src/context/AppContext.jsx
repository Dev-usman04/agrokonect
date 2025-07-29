import React, { createContext, useContext, useReducer } from 'react';
import { appReducer, initialState } from './AppReducer';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppContextProvider');
  }
  return context;
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const login = (userData) => {
    dispatch({ type: 'LOGIN', payload: userData });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const setActiveTab = (tab) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tab });
  };

  const addProduct = (product) => {
    dispatch({ type: 'ADD_PRODUCT', payload: product });
  };

  const addMessage = (message) => {
    dispatch({ type: 'ADD_MESSAGE', payload: message });
  };

  const addOrder = (order) => {
    dispatch({ type: 'ADD_ORDER', payload: order });
  };

  const addNotification = (notification) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
  };

  const clearNotifications = () => {
    dispatch({ type: 'CLEAR_NOTIFICATIONS' });
  };

  const openChat = (product) => {
    dispatch({ type: 'OPEN_CHAT', payload: product });
  };

  const closeChat = () => {
    dispatch({ type: 'CLOSE_CHAT' });
  };

  const editProduct = (product) => {
    dispatch({ type: 'EDIT_PRODUCT', payload: product });
  };

  const deleteProduct = (productId) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: productId });
  };

  const setSearchTerm = (term) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  };

  const setFilterCategory = (cat) => {
    dispatch({ type: 'SET_FILTER_CATEGORY', payload: cat });
  };

  const value = {
    ...state,
    login,
    logout,
    setActiveTab,
    addProduct,
    addMessage,
    addOrder,
    addNotification,
    clearNotifications,
    openChat,
    closeChat,
    editProduct,
    deleteProduct,
    setSearchTerm,
    setFilterCategory,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};