import { useAppContext } from '../context/AppContext';

export const useNotifications = () => {
  const { notifications, addNotification, clearNotifications } = useAppContext();

  const notify = (text, type = 'info') => {
    const notification = {
      id: Date.now(),
      text,
      type,
      time: 'Just now'
    };
    addNotification(notification);
  };

  return {
    notifications,
    notify,
    clearNotifications
  };
};