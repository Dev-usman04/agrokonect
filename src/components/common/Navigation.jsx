import React from 'react';
import { useAppContext } from '../../context/AppContext';

const Navigation = () => {
  const { currentUser, activeTab, setActiveTab } = useAppContext();

  const getNavItems = () => {
    if (currentUser.type === 'farmer') {
      return [
        { key: 'dashboard', label: 'Dashboard' },
        { key: 'products', label: 'My Products' },
        { key: 'messages', label: 'Messages' }
      ];
    } else if (currentUser.type === 'buyer') {
      return [
        { key: 'marketplace', label: 'Marketplace' },
        { key: 'orders', label: 'My Orders' },
        { key: 'messages', label: 'Messages' }
      ];
    } else if (currentUser.type === 'admin') {
      return [
        { key: 'admin', label: 'Dashboard' },
        { key: 'orders', label: 'All Orders' },
        { key: 'users', label: 'Users' }
      ];
    }
    return [];
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex space-x-8">
          {getNavItems().map(item => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === item.key 
                  ? 'border-primary-600 text-primary-600' 
                  : 'border-transparent hover:text-primary-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation