import React from 'react';

const HistorySkeleton = () => {
  return (
    <div className="border rounded-lg mb-3 overflow-hidden animate-pulse">
      <div className="flex justify-between items-center p-3 border-b bg-gray-200 h-12"></div>
      <div className="p-3 bg-gray-50">
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-20 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-20 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default HistorySkeleton;