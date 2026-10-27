/**
 * A tiny store backed by localStorage, for use with React's
 * useSyncExternalStore. Keeps every component — and every open tab — in sync.
 */
const createLocalStore = (key, fallback) => {
  const listeners = new Set();

  const read = () => {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value ?? fallback;
    } catch {
      return fallback;
    }
  };

  let state = read();

  const set = (next) => {
    state = typeof next === 'function' ? next(state) : next;
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // Storage can be full or blocked (private mode); keep the in-memory copy.
    }
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener) => {
    const onStorage = (e) => {
      if (e.key !== key) return;
      state = read();
      listener();
    };
    listeners.add(listener);
    window.addEventListener('storage', onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener('storage', onStorage);
    };
  };

  return { get: () => state, set, subscribe };
};

export default createLocalStore;
