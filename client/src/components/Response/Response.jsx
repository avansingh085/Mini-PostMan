import React from 'react';
import StatusBadge from '../common/StatusBadge';

const Response = ({ response }) => {
  if (!response) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Response
      </h2>
      <div className={`p-4 rounded-lg border ${response.error ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
        {response.error ? (
          <div className="text-red-800">
            <div className="font-bold mb-2">Error: {response.error}</div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-start mb-3">
              <div className="font-semibold">Request successful</div>
              {response.statusCode && (
                <StatusBadge statusCode={response.statusCode} />
              )}
            </div>
            <pre className="bg-white p-3 rounded overflow-x-auto text-sm">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Response;