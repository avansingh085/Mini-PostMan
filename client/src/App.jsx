import React, { useState } from 'react';
import RequestForm from './components/RequestForm/RequestForm';
import Response from './components/Response/Response';
import History from './components/History/History';

const App = () => {
  const [response, setResponse] = useState(null);
  const [refreshHistory, setRefreshHistory] = useState(0);

  const handleResponse = (data) => {
    setResponse(data);
  };

  const handleRefreshHistory = () => {
    setRefreshHistory(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">HTTP Request Client</h1>
          <p className="text-gray-600">Test and debug your API endpoints with this modern interface</p>
        </header>
        
        <RequestForm onResponse={handleResponse} onRefreshHistory={handleRefreshHistory} />
        
        <Response response={response} />
        
        <History refreshSignal={refreshHistory} />
      </div>
    </div>
  );
};

export default App;