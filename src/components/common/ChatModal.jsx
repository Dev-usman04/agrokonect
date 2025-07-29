import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const ChatModal = () => {
  const { chatOpen, selectedProduct, messages, closeChat, addMessage, currentUser } = useAppContext();
  const [currentMessage, setCurrentMessage] = useState('');

  if (!chatOpen || !selectedProduct) return null;

  const productMessages = messages.filter(m => m.productId === selectedProduct.id);

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        productId: selectedProduct.id,
        sender: currentUser.name,
        senderType: currentUser.type,
        message: currentMessage,
        timestamp: new Date().toLocaleTimeString()
      };
      addMessage(newMessage);
      setCurrentMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && currentMessage.trim()) {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-96 max-h-96">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-semibold">Chat with {selectedProduct.farmer}</h3>
          <button 
            onClick={closeChat}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>
        
        <div className="p-4 h-64 overflow-y-auto">
          <div className="mb-4 bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-600">Product: <span className="font-medium">{selectedProduct.name}</span></p>
            <p className="text-sm text-gray-600">Price: <span className="font-medium">{selectedProduct.price}</span></p>
          </div>
          
          {productMessages.map(message => (
            <div key={message.id} className={`mb-3 ${message.sender === currentUser.name ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-3 rounded-lg max-w-xs ${
                message.sender === currentUser.name 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-gray-200 text-gray-800'
              }`}>
                <p className="text-sm">{message.message}</p>
                <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="input flex-1"
            />
            <button
              onClick={handleSendMessage}
              className="btn-primary"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;