import React from 'react';
import { Bell, User } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const Header = () => {
  const { currentUser, notifications, logout } = useAppContext();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-primary-800">AgriConnect</h1>
            <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
              {currentUser.type.charAt(0).toUpperCase() + currentUser.type.slice(1)}
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
              {notifications.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-8 h-8 text-gray-600" />
              <span className="font-medium">{currentUser.name}</span>
            </div>
            <button
              onClick={logout}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;