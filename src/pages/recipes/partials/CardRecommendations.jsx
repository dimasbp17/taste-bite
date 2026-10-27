import React from 'react';
import { filterByIngredient } from '../../../lib/api';
import useFetch from '../../../hooks/useFetch';
import SectionHeader from '../../../components/SectionHeader';
import MealGrid from '../../../components/MealGrid';

const CardRecommendations = ({ ingredient, excludeId }) => {
  const { data, loading } = useFetch(
    () => (ingredient ? filterByIngredient(ingredient) : Promise.resolve([])),
    [ingredient]
  );
  const meals = (data || []).filter((meal) => meal.idMeal !== excludeId).slice(0, 4);

  if (!loading && meals.length === 0) return null;

  return (
    <section className="container-page mt-20 border-t border-line pt-16">
      <SectionHeader
        eyebrow="Keep cooking"
        title="You might also like"
        description={`More recipes made with ${ingredient?.toLowerCase()}.`}
      />
      <MealGrid
        meals={meals}
        loading={loading}
        skeletonCount={4}
      />
    </section>
  );
};

export default CardRecommendations;
