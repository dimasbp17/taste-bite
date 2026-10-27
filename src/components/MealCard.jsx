import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import useName from '../i18n/useName';
import { getMealImageSrcSet } from '../lib/api';

// Rendered card widths, matching the grids in MealGrid (max container 1280px).
const IMAGE_SIZES = {
  md: '(min-width: 1280px) 290px, (min-width: 1024px) 23vw, 46vw',
  lg: '(min-width: 1280px) 400px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw',
};

const MealCard = ({ meal, size = 'md', badge }) => {
  const name = useName();
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
            src={`${meal.strMealThumb}/medium`}
            srcSet={getMealImageSrcSet(meal.strMealThumb)}
            sizes={IMAGE_SIZES[size]}
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
