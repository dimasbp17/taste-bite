import { useCallback, useSyncExternalStore } from 'react';

// Saved recipes live in localStorage (there are no accounts). A tiny store
// keeps every component — and every open tab — in sync.
const STORAGE_KEY = 'tastebite:favorites';
const listeners = new Set();

const read = () => {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};

let favorites = read();

const write = (next) => {
  favorites = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage can be full or blocked (private mode); keep the in-memory copy.
  }
  listeners.forEach((listener) => listener());
};

const subscribe = (listener) => {
  const onStorage = (e) => {
    if (e.key !== STORAGE_KEY) return;
    favorites = read();
    listener();
  };
  listeners.add(listener);
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
};

const getSnapshot = () => favorites;

const useFavorites = () => {
  const list = useSyncExternalStore(subscribe, getSnapshot);

  const isFavorite = useCallback(
    (id) => list.some((item) => item.idMeal === id),
    [list]
  );

  const toggle = useCallback((meal) => {
    if (favorites.some((item) => item.idMeal === meal.idMeal)) {
      write(favorites.filter((item) => item.idMeal !== meal.idMeal));
      return;
    }
    const { idMeal, strMeal, strMealThumb, strCategory, strArea } = meal;
    write([
      { idMeal, strMeal, strMealThumb, strCategory, strArea, savedAt: Date.now() },
      ...favorites,
    ]);
  }, []);

  const clear = useCallback(() => write([]), []);

  return { favorites: list, isFavorite, toggle, clear };
};

export default useFavorites;
