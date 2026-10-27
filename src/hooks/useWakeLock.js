import { useEffect, useState } from 'react';

/**
 * Keeps the screen awake while mounted, so it doesn't dim mid-recipe.
 * The browser drops the lock when the tab is hidden, so it is re-requested
 * whenever the page becomes visible again.
 */
const useWakeLock = () => {
  const supported = typeof navigator !== 'undefined' && 'wakeLock' in navigator;
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!supported) return undefined;
    let lock = null;
    let cancelled = false;

    const request = async () => {
      try {
        lock = await navigator.wakeLock.request('screen');
        if (cancelled) {
          lock.release();
          return;
        }
        setActive(true);
        lock.addEventListener('release', () => setActive(false));
      } catch {
        setActive(false);
      }
    };

    const onVisibility = () => document.visibilityState === 'visible' && request();

    request();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVisibility);
      lock?.release().catch(() => {});
    };
  }, [supported]);

  return { supported, active };
};

export default useWakeLock;
