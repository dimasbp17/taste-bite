import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import { filterByCategory, getCategories, searchMeals } from '../../lib/api';
import useFetch from '../../hooks/useFetch';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { useTranslation } from 'react-i18next';
import useName from '../../i18n/useName';
import MealGrid from '../../components/MealGrid';
import ShowMore from '../../components/ShowMore';
import usePaged from '../../hooks/usePaged';

const PAGE_SIZE = 12;

const RecipesPage = () => {
  const { t } = useTranslation();
  const name = useName();
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const category = params.get('category') || '';
  const [input, setInput] = useState(q);

  useEffect(() => setInput(q), [q]);

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
  const paged = usePaged(meals, PAGE_SIZE, `${q}|${category}`);

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

  let heading = t('recipes.all');
  if (q) heading = t('recipes.resultsFor', { q });
  else if (category) heading = t('recipes.categoryTitle', { category: name(category) });

  useDocumentTitle(heading);

  return (
    <div className="container-page py-10 lg:py-14">
      <header className="max-w-3xl">
        <p className="eyebrow">{t('recipes.eyebrow')}</p>
        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{heading}</h1>
        {!loading && !error && (
          <p className="mt-3 text-ink-soft">{t('recipes.count', { count: meals.length })}</p>
        )}
      </header>

      <form
        onSubmit={handleSubmit}
        role="search"
        className="mt-8 flex max-w-2xl gap-2"
      >
        <label className="relative flex-1">
          <span className="sr-only">{t('recipes.searchLabel')}</span>
          <FiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-ink-muted"
            aria-hidden
          />
          <input
            type="search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('recipes.placeholder')}
            className="input rounded-full pl-11"
          />
        </label>
        <button
          type="submit"
          className="btn-primary"
        >
          {t('recipes.search')}
        </button>
      </form>

      <div
        className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-hide sm:mx-0 sm:flex-wrap sm:px-0"
        role="group"
        aria-label={t('recipes.filterLabel')}
      >
        <button
          type="button"
          onClick={() => setParams({})}
          className={chipClass(!q && !category)}
          aria-pressed={!q && !category}
        >
          {t('recipes.allChip')}
        </button>
        {(categories || []).map((item) => (
          <button
            key={item.idCategory}
            type="button"
            onClick={() => setParams({ category: item.strCategory })}
            className={chipClass(category === item.strCategory)}
            aria-pressed={category === item.strCategory}
          >
            {name(item.strCategory)}
          </button>
        ))}
        {q && (
          <button
            type="button"
            onClick={() => setParams({})}
            className="chip min-h-[40px] shrink-0 bg-brand-50 px-4 text-brand ring-brand/30"
          >
            “{q}” <FiX aria-label={t('recipes.clearSearch')} />
          </button>
        )}
      </div>

      <div className="mt-10">
        <MealGrid
          meals={paged.visible}
          loading={loading}
          error={error}
          onRetry={retry}
          skeletonCount={PAGE_SIZE}
          emptyMessage={t('recipes.empty')}
        />
      </div>

      {!loading && <ShowMore paged={paged} />}
    </div>
  );
};

export default RecipesPage;
