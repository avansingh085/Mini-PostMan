import React, { useState } from 'react';
import axios from 'axios';
import useApiCache from '../../hooks/useApiCache';
import JSONTextArea from './JSONTextArea';
import { HTTP_METHODS, validateJSON } from '../../utils/helpers';

const RequestForm = ({ onResponse, onRefreshHistory }) => {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [bodyError, setBodyError] = useState('');
  const { getFromCache, setToCache } = useApiCache();

  const sendRequest = async () => {
    if (body && !validateJSON(body)) {
      setBodyError('Please fix JSON errors before sending');
      return;
    }
    
    // Check cache first for GET requests
    if (method === 'GET') {
      const cachedResponse = getFromCache(url);
      if (cachedResponse) {
        onResponse(cachedResponse);
        return;
      }
    }
    
    setLoading(true);
    try {
         const apiResponse = await axios.get(url,{
            method,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Content-Type': 'application/json',
            },
            data: body ? JSON.parse(body) : {},
        })
        console.log(apiResponse)
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/send`, {
       method,url,statusCode:apiResponse.status,data:apiResponse.data,
      });
      
      // Cache GET responses
      if (method === 'GET') {
        setToCache(url, response.data);
      }
      
      onResponse(response.data);
      onRefreshHistory();
    } catch (err) {
      onResponse({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
        Send Request
      </h2>
      
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-12 sm:col-span-3">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            {HTTP_METHODS.map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </div>
        <div className="col-span-12 sm:col-span-9">
          <input
            type="text"
            placeholder="https://api.example.com/endpoint"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Request Body (JSON)</label>
        <JSONTextArea 
          value={body} 
          onChange={setBody} 
          error={bodyError} 
          setError={setBodyError} 
        />
      </div>
      
      <button
        onClick={sendRequest}
        disabled={loading || !!bodyError}
        className="flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Send Request
          </>
        )}
      </button>
    </div>
  );
};

export default RequestForm;