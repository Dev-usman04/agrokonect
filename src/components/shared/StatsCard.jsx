import React from 'react';

const StatsCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div
      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out w-full max-w-sm sm:max-w-full"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <Icon
          className={`w-10 h-10 ${color} transform transition-transform duration-300 hover:scale-110`}
        />
      </div>
    </div>
  );
};

export default StatsCard;
