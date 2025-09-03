import { statusColors } from './constants';

export const getStatusColor = (status) => {
  const statusClass = statusColors[Math.floor(status / 100)] || statusColors.default;
  return statusClass;
};

export const validateJSON = (jsonString) => {
  try {
    if (!jsonString.trim()) return true;
    JSON.parse(jsonString);
    return true;
  } catch (e) {
    return false;
  }
};

export const formatJSON = (jsonString) => {
  if (!jsonString) return 'No data';
  try {
    const parsed = JSON.parse(jsonString);
    return JSON.stringify(parsed, null, 2);
  } catch (e) {
    return jsonString;
  }
};
export const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];