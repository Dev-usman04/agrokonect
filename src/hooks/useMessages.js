import { useAppContext } from '../context/AppContext';

export const useMessages = () => {
  const { messages, addMessage, currentUser } = useAppContext();

  const sendMessage = (productId, messageText) => {
    const newMessage = {
      id: Date.now(),
      productId,
      sender: currentUser.name,
      senderType: currentUser.type,
      message: messageText,
      timestamp: new Date().toLocaleTimeString()
    };
    addMessage(newMessage);
  };

  const getUserMessages = () => {
    return messages.filter(m => 
      m.sender === currentUser.name || 
      (currentUser.type === 'farmer' && products.some(p => p.farmer === currentUser.name && p.id === m.productId))
    );
  };

  return {
    messages,
    sendMessage,
    getUserMessages
  };
};