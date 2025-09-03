import React, { useCallback } from 'react';
import useLazyLoading from '../../hooks/useLazyLoading';
import HistoryItem from './HistoryItem';
import HistorySkeleton from './HistorySkeleton';
import axios from 'axios';

const History = ({ refreshSignal }) => {
  const fetchHistory = useCallback(async (page = 1, limit = 5) => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/history?page=${page}&limit=${limit}`);
    return res.data;
  }, []);

  const { data, loading, hasMore, loadMore, refresh } = useLazyLoading(fetchHistory, [], 5);

  React.useEffect(() => {
    if (refreshSignal > 0) {
      refresh(); // Use the refresh method from the hook
    }
  }, [refreshSignal, refresh]);
  

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Request History
      </h2>
      
      {data.length === 0 && !loading ? (
        <div className="text-center py-8 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p>No requests yet. Send a request to see history.</p>
        </div>
      ) : (
        <>
          {data.map((item) => (
            <HistoryItem key={item.id} item={item} />
          ))}
          
          {loading && (
            <>
              <HistorySkeleton />
              <HistorySkeleton />
            </>
          )}
          
          {hasMore && !loading && (
            <div className="flex justify-center mt-4">
              <button
                onClick={loadMore}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Load More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default History;