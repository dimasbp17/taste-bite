import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import { filterByCategory, getCategories, searchMeals } from '../../lib/api';
import useFetch from '../../hooks/useFetch';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import MealGrid from '../../components/MealGrid';

const PAGE_SIZE = 12;

const RecipesPage = () => {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const category = params.get('category') || '';
  const [input, setInput] = useState(q);
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    setInput(q);
    setVisible(PAGE_SIZE);
  }, [q, category]);

  const { data: categories } = useFetch(getCategories);
  const { data, loading, error, retry } = useFetch(async () => {
    if (q) return searchMeals(q);
    if (category) {
      const meals = await filterByCategory(category);
      return meals.map((meal) => ({ ...meal, strCategory: category }));
    }
    return searchMeals('');
  }, [q, category]);

  const meals = data || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    const term = input.trim();
    setParams(term ? { q: term } : {});
  };

  const chipClass = (active) =>
    `chip min-h-[40px] shrink-0 px-4 transition-colors ${
      active
        ? 'bg-ink text-white ring-ink'
        : 'hover:bg-cream-dark hover:text-ink'
    }`;

  let heading = 'All recipes';
  if (q) heading = `Results for “${q}”`;
  else if (category) heading = `${category} recipes`;

  useDocumentTitle(q ? `Results for "${q}"` : heading);

  return (
    <div className="container-page py-10 lg:py-14">
      <header className="max-w-3xl">
        <p className="eyebrow">Recipe index</p>
        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{heading}</h1>
        {!loading && !error && (
          <p className="mt-3 text-ink-soft">
            {meals.length} {meals.length === 1 ? 'recipe' : 'recipes'} found
          </p>
        )}
      </header>

      <form
        onSubmit={handleSubmit}
        role="search"
        className="mt-8 flex max-w-2xl gap-2"
      >
        <label className="relative flex-1">
          <span className="sr-only">Search recipes</span>
          <FiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-ink-muted"
            aria-hidden
          />
          <input
            type="search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search by dish name"
            className="input rounded-full pl-11"
          />
        </label>
        <button
          type="submit"
          className="btn-primary"
        >
          Search
        </button>
      </form>

      <div
        className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-hide sm:mx-0 sm:flex-wrap sm:px-0"
        aria-label="Filter by category"
      >
        <button
          type="button"
          onClick={() => setParams({})}
          className={chipClass(!q && !category)}
          aria-pressed={!q && !category}
        >
          All
        </button>
        {(categories || []).map((item) => (
          <button
            key={item.idCategory}
            type="button"
            onClick={() => setParams({ category: item.strCategory })}
            className={chipClass(category === item.strCategory)}
            aria-pressed={category === item.strCategory}
          >
            {item.strCategory}
          </button>
        ))}
        {q && (
          <button
            type="button"
            onClick={() => setParams({})}
            className="chip min-h-[40px] shrink-0 bg-brand-50 px-4 text-brand ring-brand/30"
          >
            “{q}” <FiX aria-label="Clear search" />
          </button>
        )}
      </div>

      <div className="mt-10">
        <MealGrid
          meals={meals.slice(0, visible)}
          loading={loading}
          error={error}
          onRetry={retry}
          skeletonCount={PAGE_SIZE}
          emptyMessage="No recipes match your search"
        />
      </div>

      {!loading && visible < meals.length && (
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
    </div>
  );
};

export default RecipesPage;
