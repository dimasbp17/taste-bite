import { useCallback, useSyncExternalStore } from 'react';
import createLocalStore from '../lib/createLocalStore';

// Shopping list grouped by recipe:
// [{ idMeal, strMeal, strMealThumb, items: [{ name, measure, bought }] }]
// Items stay per recipe because measures are free text ("1 cup", "a pinch")
// and can't be added up reliably across recipes.
const store = createLocalStore('tastebite:shopping-list', []);

const mapItems = (list, idMeal, update) =>
  list.map((recipe) =>
    recipe.idMeal === idMeal ? { ...recipe, items: update(recipe.items) } : recipe
  );

const useShoppingList = () => {
  const recipes = useSyncExternalStore(store.subscribe, store.get);
  const allItems = recipes.flatMap((recipe) => recipe.items);
  const remaining = allItems.filter((item) => !item.bought).length;

  /** Adds ingredients of a recipe; items already on the list keep their state. */
  const addRecipe = useCallback((meal, ingredients) => {
    store.set((list) => {
      const existing = list.find((recipe) => recipe.idMeal === meal.idMeal);
      const newItems = ingredients
        .filter(({ name }) => !existing?.items.some((item) => item.name === name))
        .map(({ name, measure }) => ({ name, measure, bought: false }));

      if (existing) return mapItems(list, meal.idMeal, (items) => [...items, ...newItems]);
      const { idMeal, strMeal, strMealThumb } = meal;
      return [...list, { idMeal, strMeal, strMealThumb, items: newItems }];
    });
  }, []);

  const toggleItem = useCallback((idMeal, name) => {
    store.set((list) =>
      mapItems(list, idMeal, (items) =>
        items.map((item) => (item.name === name ? { ...item, bought: !item.bought } : item))
      )
    );
  }, []);

  const removeItem = useCallback((idMeal, name) => {
    store.set((list) =>
      mapItems(list, idMeal, (items) => items.filter((item) => item.name !== name)).filter(
        (recipe) => recipe.items.length > 0
      )
    );
  }, []);

  const removeRecipe = useCallback((idMeal) => {
    store.set((list) => list.filter((recipe) => recipe.idMeal !== idMeal));
  }, []);

  const clearBought = useCallback(() => {
    store.set((list) =>
      list
        .map((recipe) => ({ ...recipe, items: recipe.items.filter((item) => !item.bought) }))
        .filter((recipe) => recipe.items.length > 0)
    );
  }, []);

  const clear = useCallback(() => store.set([]), []);

  const hasRecipe = useCallback(
    (idMeal) => recipes.some((recipe) => recipe.idMeal === idMeal),
    [recipes]
  );

  return {
    recipes,
    total: allItems.length,
    remaining,
    bought: allItems.length - remaining,
    hasRecipe,
    addRecipe,
    toggleItem,
    removeItem,
    removeRecipe,
    clearBought,
    clear,
  };
};

export default useShoppingList;
