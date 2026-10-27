import React, { useState } from 'react';
import { searchMeals } from '../../../lib/api';
import useFetch from '../../../hooks/useFetch';
import SectionHeader from '../../../components/SectionHeader';
import MealGrid from '../../../components/MealGrid';

const PAGE_SIZE = 8;

const AllMeals = () => {
  const { data, loading, error, retry } = useFetch(() => searchMeals(''));
  const [visibleMeals, setVisibleMeals] = useState(PAGE_SIZE);
  const meals = data || [];

  return (
    <section className="container-page py-16 lg:py-20">
      <SectionHeader
        eyebrow="Fresh ideas"
        title="More recipes to try"
        link={{ to: '/recipes', label: 'Browse all recipes' }}
      />
      <MealGrid
        meals={meals.slice(0, visibleMeals)}
        loading={loading}
        error={error}
        onRetry={retry}
      />
      {!loading && visibleMeals < meals.length && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleMeals((count) => count + PAGE_SIZE)}
            className="btn-outline px-8"
          >
            Load more recipes
          </button>
        </div>
      )}
    </section>
  );
};

export default AllMeals;
