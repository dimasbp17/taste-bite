import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiCheck, FiX } from 'react-icons/fi';
import { filterByIngredient, getIngredientImage, getIngredientList } from '../../lib/api';
import useFetch from '../../hooks/useFetch';
import MealCard, { MealCardSkeleton } from '../../components/MealCard';
import StatusMessage from '../../components/StatusMessage';
import IngredientPicker from './IngredientPicker';

const MAX_INGREDIENTS = 6;
const PAGE_SIZE = 12;

const popular = [
  'Chicken',
  'Eggs',
  'Onion',
  'Garlic',
  'Potatoes',
  'Rice',
  'Tomatoes',
  'Beef',
  'Carrots',
  'Cheese',
  'Milk',
  'Butter',
  'Mushrooms',
  'Salmon',
  'Spinach',
  'Lemon',
];

const howItWorks = [
  ['Add what you have', 'Type or tap the ingredients in your kitchen.'],
  ['We find the recipes', 'Dishes that use the most of them appear first.'],
  ['Start cooking', 'Open a recipe for the full list and steps.'],
];

// Ingredient names must match exactly, and the database lists singular and
// plural separately ("Onion" vs "Onions"), so search both when they exist.
const variantsOf = (name, allNames) => {
  const lower = name.toLowerCase();
  const forms = [lower, `${lower}s`, `${lower}es`, lower.replace(/es$/, ''), lower.replace(/s$/, '')];
  const found = allNames.filter((item) => forms.includes(item.toLowerCase()));
  return found.length ? found : [name];
};

const requestCache = new Map();

const cachedFilter = (ingredient) => {
  if (!requestCache.has(ingredient)) {
    const request = filterByIngredient(ingredient).catch((error) => {
      requestCache.delete(ingredient);
      throw error;
    });
    requestCache.set(ingredient, request);
  }
  return requestCache.get(ingredient);
};

const findMatches = async (selected, allNames) => {
  const groups = await Promise.all(
    selected.map(async (name) => {
      const lists = await Promise.all(variantsOf(name, allNames).map(cachedFilter));
      return lists.flat();
    })
  );

  const byId = new Map();
  groups.forEach((meals, index) =>
    meals.forEach((meal) => {
      const entry = byId.get(meal.idMeal) || { meal, matched: new Set() };
      entry.matched.add(selected[index]);
      byId.set(meal.idMeal, entry);
    })
  );

  return [...byId.values()]
    .map(({ meal, matched }) => ({ meal, matched: [...matched] }))
    .sort(
      (a, b) =>
        b.matched.length - a.matched.length || a.meal.strMeal.localeCompare(b.meal.strMeal)
    );
};

const MatchBadge = ({ matched, total }) => {
  const all = matched.length === total;
  return (
    <span
      title={`Uses: ${matched.join(', ')}`}
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold shadow-card ${
        all ? 'bg-sage text-white' : 'bg-white text-ink'
      }`}
    >
      {all && <FiCheck aria-hidden />}
      {all
        ? total === 1
          ? `Uses ${matched[0].toLowerCase()}`
          : `Uses all ${total}`
        : `Uses ${matched.length} of ${total}`}
    </span>
  );
};

const CookWithIngredients = () => {
  const [params, setParams] = useSearchParams();
  const selected = params.getAll('i');
  const key = selected.join('|');
  const [onlyAll, setOnlyAll] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => setVisible(PAGE_SIZE), [key, onlyAll]);

  const { data: allNames } = useFetch(getIngredientList);
  const { data, loading, error, retry } = useFetch(
    () => (selected.length ? findMatches(selected, allNames || []) : Promise.resolve([])),
    [key, Boolean(allNames)]
  );

  const update = (next) => setParams(next.map((name) => ['i', name]), { replace: true });
  const add = (name) =>
    !selected.includes(name) && selected.length < MAX_INGREDIENTS && update([...selected, name]);
  const remove = (name) => update(selected.filter((item) => item !== name));

  const results = (data || []).filter(
    (item) => !onlyAll || item.matched.length === selected.length
  );
  const full = selected.length >= MAX_INGREDIENTS;

  return (
    <div className="container-page py-10 lg:py-14">
      <header className="max-w-3xl">
        <p className="eyebrow">Cook with what you have</p>
        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">
          What&apos;s in your kitchen?
        </h1>
        <p className="mt-4 text-lg text-ink-soft">
          Tell us the ingredients you already have, and we&apos;ll show you
          recipes you can make with them.
        </p>
      </header>

      <section className="mt-8 rounded-3xl bg-white p-5 shadow-card ring-1 ring-line sm:p-8">
        <IngredientPicker
          options={allNames || []}
          selected={selected}
          onAdd={add}
          disabled={full}
        />

        {selected.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between gap-4">
              <p className="font-medium text-ink">
                Your ingredients ({selected.length}/{MAX_INGREDIENTS})
              </p>
              <button
                type="button"
                onClick={() => update([])}
                className="text-sm font-semibold text-brand hover:text-brand-dark"
              >
                Clear all
              </button>
            </div>
            <ul className="mt-3 flex flex-wrap gap-2">
              {selected.map((name) => (
                <li key={name}>
                  <button
                    type="button"
                    onClick={() => remove(name)}
                    className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-brand-50 py-1 pl-1.5 pr-3 font-medium text-ink ring-1 ring-brand/25 hover:bg-brand-100"
                    aria-label={`Remove ${name}`}
                  >
                    <img
                      src={getIngredientImage(name)}
                      alt=""
                      className="size-8 rounded-full bg-white object-contain p-0.5"
                    />
                    {name}
                    <FiX
                      className="text-ink-soft group-hover:text-brand"
                      aria-hidden
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 border-t border-line pt-6">
          <p className="text-sm font-medium text-ink-soft">Quick add</p>
          <ul className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1 scrollbar-hide sm:mx-0 sm:flex-wrap sm:px-0">
            {popular
              .filter((name) => !selected.includes(name))
              .map((name) => (
                <li
                  key={name}
                  className="shrink-0"
                >
                  <button
                    type="button"
                    onClick={() => add(name)}
                    disabled={full}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white py-1 pl-1.5 pr-4 font-medium text-ink-soft ring-1 ring-line transition-colors hover:text-ink hover:ring-ink/30 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <img
                      src={getIngredientImage(name)}
                      alt=""
                      loading="lazy"
                      className="size-8 object-contain"
                    />
                    {name}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <section
        className="mt-12"
        aria-live="polite"
      >
        {selected.length === 0 ? (
          <ol className="grid gap-4 md:grid-cols-3">
            {howItWorks.map(([title, text], index) => (
              <li
                key={title}
                className="rounded-3xl border border-dashed border-line p-6"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-brand-50 font-serif text-lg font-semibold text-brand">
                  {index + 1}
                </span>
                <p className="mt-4 text-lg font-semibold text-ink">{title}</p>
                <p className="mt-1 text-ink-soft">{text}</p>
              </li>
            ))}
          </ol>
        ) : error ? (
          <StatusMessage
            title="We couldn't load recipes"
            message="Please check your connection and try again."
            onRetry={retry}
          />
        ) : (
          <>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-semibold">
                  {loading
                    ? 'Finding recipes…'
                    : `${results.length} ${results.length === 1 ? 'recipe' : 'recipes'} found`}
                </h2>
                {!loading && selected.length > 1 && (
                  <p className="mt-2 text-ink-soft">
                    Recipes that use the most of your ingredients are shown first.
                  </p>
                )}
              </div>
              {selected.length > 1 && (
                <label className="inline-flex min-h-[44px] cursor-pointer items-center gap-3 font-medium text-ink">
                  <input
                    type="checkbox"
                    checked={onlyAll}
                    onChange={(e) => setOnlyAll(e.target.checked)}
                    className="size-5 accent-[#4D5E46]"
                  />
                  Only recipes that use all of them
                </label>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
                {Array.from({ length: 8 }, (_, i) => (
                  <MealCardSkeleton key={i} />
                ))}
              </div>
            ) : results.length === 0 ? (
              <StatusMessage
                title={onlyAll ? 'No recipes use all of these yet' : 'No recipes found'}
                message={
                  onlyAll
                    ? 'Try removing an ingredient, or turn off “Only recipes that use all of them”.'
                    : 'Try a different or more common ingredient.'
                }
              />
            ) : (
              <div className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
                {results.slice(0, visible).map(({ meal, matched }) => (
                  <MealCard
                    key={meal.idMeal}
                    meal={meal}
                    badge={
                      <MatchBadge
                        matched={matched}
                        total={selected.length}
                      />
                    }
                  />
                ))}
              </div>
            )}

            {!loading && visible < results.length && (
              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisible((count) => count + PAGE_SIZE)}
                  className="btn-outline px-8"
                >
                  Show more recipes
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default CookWithIngredients;
