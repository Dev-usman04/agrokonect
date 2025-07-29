import React from 'react';
import { X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const Notification = () => {
  const { notifications, clearNotifications } = useAppContext();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border p-4 max-w-sm animate-slide-up">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold">Notifications</h4>
        <button 
          onClick={clearNotifications}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {notifications.slice(0, 3).map(notification => (
          <div key={notification.id} className="text-sm">
            <p className="text-gray-800">{notification.text}</p>
            <p className="text-xs text-gray-500">{notification.time}</p>
          </div>
        ))}
        {notifications.length > 3 && (
          <p className="text-xs text-gray-500">+{notifications.length - 3} more notifications</p>
        )}
      </div>
    </div>
  );
};

export default Notification;