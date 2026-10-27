import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiGlobe, FiRefreshCw, FiSearch, FiTag } from 'react-icons/fi';
import { getRandomMeal } from '../../../lib/api';
import useFetch from '../../../hooks/useFetch';

const quickLinks = ['Chicken', 'Pasta', 'Vegetarian', 'Seafood', 'Dessert'];

const Hero = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { data: meal, loading, retry } = useFetch(getRandomMeal);

  const handleSubmit = (e) => {
    e.preventDefault();
    const term = query.trim();
    navigate(term ? `/recipes?q=${encodeURIComponent(term)}` : '/recipes');
  };

  return (
    <section className="container-page grid items-center gap-10 pb-16 pt-10 lg:grid-cols-2 lg:gap-16 lg:pb-24 lg:pt-16">
      <div>
        <p className="eyebrow">Recipes from around the world</p>
        <h1 className="mt-4 text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
          Cook something <em className="text-brand">wonderful</em> tonight.
        </h1>
        <p className="mt-6 max-w-lg text-lg text-ink-soft">
          Clear, step-by-step recipes for every cook — from quick weeknight
          dinners to dishes worth celebrating.
        </p>

        <form
          onSubmit={handleSubmit}
          role="search"
          className="mt-8 flex max-w-xl flex-col gap-3 rounded-3xl bg-white p-2 shadow-card ring-1 ring-line sm:flex-row sm:rounded-full"
        >
          <label className="flex flex-1 items-center gap-3 px-4">
            <FiSearch
              className="shrink-0 text-xl text-ink-muted"
              aria-hidden
            />
            <span className="sr-only">Search recipes</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What would you like to cook?"
              className="h-12 w-full bg-transparent text-ink placeholder:text-ink-muted focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="btn-primary px-7"
          >
            Find recipes
          </button>
        </form>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-sm text-ink-soft">Popular:</span>
          {quickLinks.map((item) => (
            <Link
              key={item}
              to={`/meal-category/${item}`}
              className="chip min-h-[36px] hover:text-brand hover:ring-brand/40"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-4 -z-10 rotate-2 rounded-[2.5rem] bg-brand-100 sm:-inset-6" />
        {loading || !meal ? (
          <div className="aspect-[4/5] animate-pulse rounded-[2rem] bg-cream-dark sm:aspect-[4/3] lg:aspect-[4/5]" />
        ) : (
          <article className="relative overflow-hidden rounded-[2rem] shadow-lift">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="aspect-[4/5] w-full object-cover sm:aspect-[4/3] lg:aspect-[4/5]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/95 via-ink/70 to-transparent p-6 pt-32 text-white sm:p-8 sm:pt-40">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-100">
                Today&apos;s pick
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                {meal.strMeal}
              </h2>
              <div className="mt-3 flex flex-wrap gap-4 text-white/85">
                {meal.strCategory && (
                  <span className="flex items-center gap-1.5">
                    <FiTag aria-hidden /> {meal.strCategory}
                  </span>
                )}
                {meal.strArea && (
                  <span className="flex items-center gap-1.5">
                    <FiGlobe aria-hidden /> {meal.strArea}
                  </span>
                )}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to={`/detail-recipes/${meal.idMeal}`}
                  className="btn bg-white text-ink hover:bg-cream"
                >
                  View recipe <FiArrowRight aria-hidden />
                </Link>
                <button
                  type="button"
                  onClick={retry}
                  className="btn border border-white/40 text-white hover:bg-white/10"
                >
                  <FiRefreshCw aria-hidden /> Show another
                </button>
              </div>
            </div>
          </article>
        )}
      </div>
    </section>
  );
};

export default Hero;
