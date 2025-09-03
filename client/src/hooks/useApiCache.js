import { useState, useCallback } from 'react';

const useApiCache = () => {
  const [cache, setCache] = useState(new Map());

  const getFromCache = useCallback((key) => {
    const cachedData = cache.get(key);
    if (cachedData && Date.now() - cachedData.timestamp < 300000) { // 5 minutes cache
      return cachedData.data;
    }
    return null;
  }, [cache]);

  const setToCache = useCallback((key, data) => {
    setCache(prevCache => {
      const newCache = new Map(prevCache);
      newCache.set(key, { data, timestamp: Date.now() });
      return newCache;
    });
  }, []);

  const clearCache = useCallback(() => {
    setCache(new Map());
  }, []);

  return { getFromCache, setToCache, clearCache };
};

export default useApiCache;