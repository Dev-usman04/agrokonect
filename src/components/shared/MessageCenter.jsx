import React from 'react';
import { useAppContext } from '../../context/AppContext';

const MessageCenter = () => {
  const { messages } = useAppContext();

  return (
    <div className="max-w-3xl mx-auto mt-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-xl font-bold text-gray-800">Messages</h3>
      </div>
      <div className="px-6 py-4">
        {messages.length === 0 ? (
          <p className="text-center text-gray-400 italic">No messages yet</p>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className="border-l-4 border-blue-500 pl-4 bg-blue-50 rounded-md py-2 px-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {message.sender} <span className="text-sm text-gray-500">({message.senderType})</span>
                    </p>
                    <p className="text-gray-700 mt-1">{message.message}</p>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap">{message.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageCenter;
