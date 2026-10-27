import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import useLanguage from '../i18n/useLanguage';

const MealCard = ({ meal, size = 'md', badge }) => {
  const { name } = useLanguage();
  const meta = [meal.strCategory, meal.strArea].filter(Boolean).map(name).join(' · ');

  return (
    <div className="relative">
      {/* Kept outside the link: a button nested in a link is invalid HTML. */}
      <FavoriteButton
        meal={meal}
        className="absolute right-3 top-3 z-20"
      />
      <Link
        to={`/detail-recipes/${meal.idMeal}`}
        className="group block rounded-2xl"
      >
        <div className="relative overflow-hidden rounded-2xl bg-cream-dark shadow-card">
          {badge && <div className="absolute left-3 top-3 z-10">{badge}</div>}
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            loading="lazy"
            className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              size === 'lg' ? 'aspect-[4/3]' : 'aspect-square sm:aspect-[4/3]'
            }`}
          />
        </div>
        <div className="mt-3 px-1">
          {meta && (
            <p className="mb-1 text-sm font-medium text-brand">{meta}</p>
          )}
          <h3
            className={`line-clamp-2 font-sans font-semibold leading-snug text-ink transition-colors group-hover:text-brand ${
              size === 'lg' ? 'text-xl' : 'text-base sm:text-lg'
            }`}
          >
            {meal.strMeal}
          </h3>
        </div>
      </Link>
    </div>
  );
};

export const MealCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-square rounded-2xl bg-cream-dark sm:aspect-[4/3]" />
    <div className="mt-3 h-4 w-1/3 rounded bg-cream-dark" />
    <div className="mt-2 h-5 w-3/4 rounded bg-cream-dark" />
  </div>
);

export default MealCard;
