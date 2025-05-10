import { useState, useRef, useEffect, useCallback } from 'react';

type FetchFunction<T, P> = (page: number, params: P) => Promise<{ data: T[]; hasMore: boolean }>;

function useDynamicInfiniteScroll<T, P extends Record<string, unknown>>(
  fetchFunction: FetchFunction<T, P>,
  initialParams: P,
  initialPage: number = 1
) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [params, setParams] = useState<P>(initialParams);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Main fetch function
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const result = await fetchFunction(page, params);
      setData(prev => (page === initialPage ? result.data : [...prev, ...result.data]))
      setHasMore(result.hasMore);
      if (result.hasMore) {
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error('Infinite scroll fetch failed:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
      if (isFirstLoad) setIsFirstLoad(false);
    }
  }, [fetchFunction, page, loading, hasMore, params, initialPage, isFirstLoad]);

  // Initialize observer and handle loading more
  useEffect(() => {
    if (isFirstLoad) {
      loadMore();
      return;
    }

    if (!loaderRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current = observer;
    observer.observe(loaderRef.current);

    return () => {
      observer.disconnect();
    };
  }, [loadMore, hasMore, loading, isFirstLoad]);

  // Reset when params change
  useEffect(() => {
    setData([]);
    setPage(initialPage);
    setHasMore(true);
    setIsFirstLoad(true);
  }, [params, initialPage]);

  // Function to update params and trigger refresh
  const updateParams = useCallback((newParams: Partial<P>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  }, []);

  return { 
    data, 
    loading, 
    hasMore, 
    updateParams, 
    loaderRef,
    reset: () => {
      setData([]);
      setPage(initialPage);
      setHasMore(true);
      setIsFirstLoad(true);
    }
  };
}

export default useDynamicInfiniteScroll;