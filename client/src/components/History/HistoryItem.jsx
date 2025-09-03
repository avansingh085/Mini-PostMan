import React, { useState } from 'react';
import StatusBadge from '../common/StatusBadge';
import { formatJSON } from '../../utils/helpers';
import { getStatusColor } from '../../utils/helpers';

const HistoryItem = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border rounded-lg mb-3 overflow-hidden transition-all hover:shadow-md">
      <div 
        className={`flex justify-between items-center p-3 cursor-pointer ${getStatusColor(item.statusCode)}`}
        onClick={toggleExpand}
      >
        <div className="font-semibold">{item.method} {item.url}</div>
        <div className="flex items-center">
          <StatusBadge statusCode={item.statusCode} />
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 ml-2 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-3 bg-gray-50">
          <div className="text-sm text-gray-700 mb-2">
            <span className="font-medium">Body:</span> 
            <pre className="mt-1 bg-gray-100 p-2 rounded overflow-x-auto">{formatJSON(item.body)}</pre>
          </div>
          <div className="text-sm text-gray-700 mb-2">
            <span className="font-medium">Response:</span> 
            <pre className="mt-1 bg-gray-100 p-2 rounded overflow-x-auto">{formatJSON(item.response)}</pre>
          </div>
          <div className="text-xs text-gray-500 flex justify-between items-center">
            <span>{new Date(item.createdAt).toLocaleString()}</span>
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {new Date(item.createdAt).toLocaleTimeString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryItem;