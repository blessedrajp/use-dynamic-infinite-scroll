import { useState, useRef, useEffect, useCallback } from 'react';

type FetchFunction<T, P> = (page: number, params: P) => Promise<{ data: T[]; hasMore: boolean }>;

function useDynamicInfiniteScroll<T, P>(
  fetchFunction: FetchFunction<T, P>,
  initialParams: P,
  initialPage = 0
) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [params, setParams] = useState<P>(initialParams);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // API Fetch call
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const result = await fetchFunction(page, params);
      setData((prev) => [...prev, ...result.data]);
      setHasMore(result.hasMore);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('Infinite scroll fetch failed:', error);
      setHasMore(false);
    }
    setLoading(false);
  }, [fetchFunction, page, loading, hasMore, params]);

  // Observer setup
  useEffect(() => {
    if (!loaderRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && !loading && hasMore) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    const currentObserver = observerRef.current;
    currentObserver.observe(loaderRef.current);

    return () => {
      currentObserver.disconnect();
    };
  }, [loadMore, hasMore, loading]);

  // Reset data + page if params change
  useEffect(() => {
    setData([]);
    setPage(initialPage);
    setHasMore(true);
  }, [params, initialPage]);

  return { data, loading, hasMore, setParams, loaderRef };
}

export default useDynamicInfiniteScroll;
