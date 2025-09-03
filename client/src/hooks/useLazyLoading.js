import { useState, useEffect, useCallback } from 'react';

const useLazyLoading = (fetchFunction, initialData = [], pageSize = 5) => {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadData = useCallback(async (pageNum = 1, shouldAppend = false) => {
    setLoading(true);
    try {
      const response = await fetchFunction(pageNum, pageSize);
      setData(prev => shouldAppend ? [...prev, ...response.data] : response.data);
      setPage(response.page);
      setTotalPages(response.totalPages);
      setHasMore(response.page < response.totalPages);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, pageSize]);

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      loadData(page + 1, true);
    }
  }, [hasMore, loading, page, loadData]);

  const refresh = useCallback(() => {
    loadData(1, false);
  }, [loadData]);

  useEffect(() => {
    loadData(1, false);
  }, [loadData]);

  return { data, page, totalPages, loading, hasMore, loadMore, refresh };
};

export default useLazyLoading;