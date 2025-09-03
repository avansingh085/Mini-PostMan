import React from 'react';
import { getStatusColor } from '../../utils/helpers';

const StatusBadge = ({ statusCode, children }) => {
  return (
    <div className={`px-2 py-1 rounded-md text-xs font-bold ${getStatusColor(statusCode)}`}>
      {children || `Status: ${statusCode}`}
    </div>
  );
};

export default StatusBadge;