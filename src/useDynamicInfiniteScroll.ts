import { useState, useRef, useEffect, useCallback } from 'react';

type FetchFunction<T, P> = (page: number, params: P) => Promise<{ data: T[]; hasMore: boolean }>;

function useDynamicInfiniteScroll<T, P extends Record<string, unknown>>(
  fetchFunction: FetchFunction<T, P>,
  initialParams: P,
  initialPage: number = 0
) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [initialLoading, setInitialLoading] = useState(false);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [params, setParams] = useState<P>(initialParams);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const loadMore = useCallback(async () => {
    if (scrollLoading || !hasMore) return;

    setScrollLoading(true);
    try {
      const result = await fetchFunction(page, params);
      setData(prev => (page === initialPage ? result.data : [...prev, ...result.data]));
      setHasMore(result.hasMore);
      if (result.hasMore) setPage(prev => prev + 1);
    } catch (error) {
      console.error('Infinite scroll fetch failed:', error);
      setHasMore(false);
    } finally {
      setScrollLoading(false);
    }
  }, [fetchFunction, page, params, hasMore, scrollLoading, initialPage]);

  const fetchInitialData = useCallback(async () => {
    setInitialLoading(true);
    try {
      const result = await fetchFunction(initialPage, params);
      setData(result.data);
      setHasMore(result.hasMore);
      setPage(initialPage + 1);
    } catch (error) {
      console.error('Initial fetch failed:', error);
      setHasMore(false);
    } finally {
      setInitialLoading(false);
    }
  }, [fetchFunction, initialPage, params]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    if (observerRef.current) observerRef.current.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && !scrollLoading) {
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
  }, [loadMore, hasMore, scrollLoading]);

  const updateParams = useCallback((newParams: Partial<P>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  }, []);

  const reset = useCallback(() => {
    setData([]);
    setPage(initialPage);
    setHasMore(true);
    setParams(initialParams);
    setInitialLoading(true);
  }, [initialPage, initialParams]);

  return {
    data,
    initialLoading,
    scrollLoading,
    hasMore,
    updateParams,
    loaderRef,
    reset,
  };
}

export default useDynamicInfiniteScroll;
