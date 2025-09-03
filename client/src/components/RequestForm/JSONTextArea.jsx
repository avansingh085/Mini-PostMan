import React from 'react';
import { validateJSON } from '../../utils/helpers';

const JSONTextArea = ({ value, onChange, error, setError }) => {
  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    if (newValue && !validateJSON(newValue)) {
      setError('Invalid JSON format');
    } else {
      setError('');
    }
  };

  return (
    <>
      <textarea
        placeholder='{"key": "value"}'
        value={value}
        onChange={handleChange}
        rows="4"
        className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm ${
          error ? 'border-red-500' : ''
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </>
  );
};

export default JSONTextArea;