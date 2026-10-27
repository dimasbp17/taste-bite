import { useCallback, useEffect, useState } from 'react';

/**
 * Runs `fetcher` whenever `deps` change and tracks loading / error state.
 * Responses from stale requests are ignored, so fast navigation never shows
 * data from the previous page.
 */
const useFetch = (fetcher, deps = []) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    fetcher()
      .then((data) => active && setState({ data, loading: false, error: null }))
      .catch((error) => {
        console.error(error);
        if (active) setState({ data: null, loading: false, error });
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { ...state, retry };
};

export default useFetch;
