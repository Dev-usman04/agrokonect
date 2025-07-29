import React from 'react';
import { useAppContext } from './context/AppContext';
import AuthContainer from './components/auth/AuthContainer';
import Header from './components/common/Header';
import Navigation from './components/common/Navigation';
import FarmerDashboard from './components/farmer/FarmerDashboard';
import Marketplace from './components/buyer/Marketplace';
import AdminDashboard from './components/admin/AdminDashboard';
import MessageCenter from './components/shared/MessageCenter';
import ChatModal from './components/common/ChatModal';
import Notification from './components/common/Notification';
import OrderManagement from './components/admin/OrderManagement';
import ProductList from './components/farmer/ProductList';
import UserManagement from './components/admin/UserManagement';

function App() {
  const { currentUser, activeTab, products } = useAppContext();

  if (!currentUser) {
    return <AuthContainer />;
  }

  const renderMainContent = () => {
    if (currentUser.type === 'farmer') {
      switch (activeTab) {
        case 'dashboard':
          return <FarmerDashboard />;
        case 'products':
          return <ProductList products={products.filter(p => p.farmer === currentUser.name)} />;
        case 'messages':
          return <MessageCenter />;
        case 'orders':
          return <OrderManagement />;
        default:
          return <FarmerDashboard />;
      }
    } else if (currentUser.type === 'buyer') {
      switch (activeTab) {
        case 'marketplace':
          return <Marketplace />;
        case 'orders':
          return <OrderManagement />;
        case 'messages':
          return <MessageCenter />;
        default:
          return <Marketplace />;
      }
    } else if (currentUser.type === 'admin') {
      switch (activeTab) {
        case 'admin':
          return <AdminDashboard />;
        case 'orders':
          return <OrderManagement />;
        case 'users':
          return <UserManagement />;
        default:
          return <AdminDashboard />;
      }
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        {renderMainContent()}
      </main>
      <ChatModal />
      <Notification />
    </div>
  );
}

export default App;