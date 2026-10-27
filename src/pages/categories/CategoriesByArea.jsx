import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { filterByArea } from '../../lib/api';
import { getAreaImage } from '../../data/areas';
import useFetch from '../../hooks/useFetch';
import MealGrid from '../../components/MealGrid';

const CategoriesByArea = () => {
  const { area } = useParams();
  const image = getAreaImage(area);
  const { data, loading, error, retry } = useFetch(() => filterByArea(area), [area]);
  const meals = (data || []).map((meal) => ({ ...meal, strArea: area }));

  return (
    <>
      <section className="relative overflow-hidden bg-ink">
        {image && (
          <img
            src={image}
            alt=""
            className="absolute inset-0 size-full object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-transparent" />
        <div className="container-page relative py-16 text-white lg:py-24">
          <Link
            to="/#cuisines"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white"
          >
            <FiArrowLeft aria-hidden /> All cuisines
          </Link>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-brand-100">
            World cuisine
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-white sm:text-6xl">
            {area} kitchen
          </h1>
          {!loading && !error && (
            <p className="mt-3 text-lg text-white/85">
              {meals.length} {meals.length === 1 ? 'recipe' : 'recipes'} to explore
            </p>
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
          emptyMessage={`No ${area} recipes yet`}
        />
      </div>
    </>
  );
};

export default CategoriesByArea;
