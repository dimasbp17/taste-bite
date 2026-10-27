import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { filterByCategory, getCategories } from '../../lib/api';
import useFetch from '../../hooks/useFetch';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { useTranslation } from 'react-i18next';
import useName from '../../i18n/useName';
import MealGrid from '../../components/MealGrid';

const CategoriesMeals = () => {
  const { category } = useParams();
  const { t } = useTranslation();
  const name = useName();
  const [expanded, setExpanded] = useState(false);
  const label = name(category);
  useDocumentTitle(t('recipes.categoryTitle', { category: label }));

  const { data, loading, error, retry } = useFetch(
    () => filterByCategory(category),
    [category]
  );
  const { data: categories } = useFetch(getCategories);

  const details = categories?.find((item) => item.strCategory === category);
  const meals = (data || []).map((meal) => ({ ...meal, strCategory: category }));

  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="container-page grid items-center gap-8 py-10 md:grid-cols-[1fr_auto] lg:py-14">
          <div className="max-w-2xl">
            <Link
              to="/recipes"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-brand"
            >
              <FiArrowLeft aria-hidden /> {t('category.back')}
            </Link>
            <p className="eyebrow mt-6">{t('category.eyebrow')}</p>
            <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">{label}</h1>
            {!loading && !error && (
              <p className="mt-2 font-medium text-ink-soft">
                {t('category.count', { count: meals.length })}
              </p>
            )}
            {details?.strCategoryDescription && (
              <div className="mt-5">
                <p
                  lang="en"
                  className={`text-ink-soft ${expanded ? '' : 'line-clamp-3'}`}
                >
                  {details.strCategoryDescription}
                </p>
                <button
                  type="button"
                  onClick={() => setExpanded((value) => !value)}
                  className="mt-2 font-semibold text-brand hover:text-brand-dark"
                >
                  {expanded ? t('category.showLess') : t('category.readMore')}
                </button>
              </div>
            )}
          </div>
          {details?.strCategoryThumb && (
            <div className="hidden size-56 items-center justify-center rounded-full bg-brand-50 p-8 md:flex lg:size-72">
              <img
                src={details.strCategoryThumb}
                alt=""
                className="w-full object-contain"
              />
            </div>
          )}
        </div>
      </section>

      <div className="container-page py-12">
        <MealGrid
          meals={meals}
          loading={loading}
          error={error}
          onRetry={retry}
          skeletonCount={12}
          emptyMessage={t('category.empty', { category: label })}
        />
      </div>
    </>
  );
};

export default CategoriesMeals;
