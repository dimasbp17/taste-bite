import { useCallback, useSyncExternalStore } from 'react';
import createLocalStore from '../lib/createLocalStore';

// Saved recipes live in localStorage (there are no accounts).
const store = createLocalStore('tastebite:favorites', []);

const useFavorites = () => {
  const favorites = useSyncExternalStore(store.subscribe, store.get);

  const isFavorite = useCallback(
    (id) => favorites.some((item) => item.idMeal === id),
    [favorites]
  );

  const toggle = useCallback((meal) => {
    store.set((list) => {
      if (list.some((item) => item.idMeal === meal.idMeal)) {
        return list.filter((item) => item.idMeal !== meal.idMeal);
      }
      const { idMeal, strMeal, strMealThumb, strCategory, strArea } = meal;
      return [{ idMeal, strMeal, strMealThumb, strCategory, strArea, savedAt: Date.now() }, ...list];
    });
  }, []);

  const clear = useCallback(() => store.set([]), []);

  return { favorites, isFavorite, toggle, clear };
};

export default useFavorites;
