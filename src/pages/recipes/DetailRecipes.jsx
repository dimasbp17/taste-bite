import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  FiCheck,
  FiChevronRight,
  FiExternalLink,
  FiGlobe,
  FiList,
  FiPrinter,
  FiTag,
  FiYoutube,
} from 'react-icons/fi';
import {
  getIngredientImage,
  getIngredients,
  getMealById,
  getSteps,
  getYoutubeId,
} from '../../lib/api';
import useFetch from '../../hooks/useFetch';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import StatusMessage from '../../components/StatusMessage';
import CardRecommendations from './partials/CardRecommendations';
import RecipeVideo from './partials/RecipeVideo';

const IngredientImage = ({ name }) => {
  const [failed, setFailed] = useState(false);

  return (
    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-cream p-1 ring-1 ring-line">
      {failed ? (
        <span className="font-serif text-lg font-semibold uppercase text-ink-muted">
          {name.charAt(0)}
        </span>
      ) : (
        <img
          src={getIngredientImage(name)}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          className="size-full object-contain"
        />
      )}
    </span>
  );
};

const IngredientList = ({ ingredients }) => {
  const [checked, setChecked] = useState(() => new Set());

  const toggle = (index) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  return (
    <div className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-line sm:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-2xl font-semibold">Ingredients</h2>
        <p
          className="text-sm text-ink-soft print:hidden"
          aria-live="polite"
        >
          {checked.size} of {ingredients.length} ready
        </p>
      </div>
      <p className="mt-1 text-sm text-ink-soft print:hidden">
        Tap an item to tick it off as you go.
      </p>

      <ul className="mt-5 divide-y divide-line">
        {ingredients.map((item, index) => {
          const done = checked.has(index);
          return (
            <li key={index}>
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-pressed={done}
                className="flex w-full items-center gap-3 py-3 text-left"
              >
                <span
                  className={`flex size-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors print:hidden ${
                    done ? 'border-sage bg-sage text-white' : 'border-line'
                  }`}
                  aria-hidden
                >
                  {done && <FiCheck className="text-sm" />}
                </span>
                <span className={`transition-opacity ${done ? 'opacity-40' : ''}`}>
                  <IngredientImage name={item.name} />
                </span>
                <span className={done ? 'text-ink-muted line-through' : 'text-ink'}>
                  <span className="font-semibold">{item.name}</span>
                  {item.measure && (
                    <span className={done ? '' : 'text-ink-soft'}> — {item.measure}</span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const DetailSkeleton = () => (
  <div className="container-page animate-pulse py-10">
    <div className="h-4 w-48 rounded bg-cream-dark" />
    <div className="mt-8 grid gap-10 lg:grid-cols-2">
      <div className="aspect-[4/3] rounded-3xl bg-cream-dark" />
      <div className="space-y-4">
        <div className="h-6 w-40 rounded bg-cream-dark" />
        <div className="h-12 w-3/4 rounded bg-cream-dark" />
        <div className="h-24 w-full rounded bg-cream-dark" />
      </div>
    </div>
  </div>
);

const DetailRecipes = () => {
  const { id } = useParams();
  const { data: meal, loading, error, retry } = useFetch(() => getMealById(id), [id]);
  useDocumentTitle(meal?.strMeal || 'Recipe');

  if (loading) return <DetailSkeleton />;

  if (error || !meal) {
    return (
      <div className="container-page py-16">
        <StatusMessage
          title={error ? "We couldn't load this recipe" : 'Recipe not found'}
          message={
            error
              ? 'Please check your connection and try again.'
              : 'It may have been removed. Try browsing other recipes.'
          }
          onRetry={error ? retry : undefined}
          action={{ to: '/recipes', label: 'Browse recipes' }}
        />
      </div>
    );
  }

  const ingredients = getIngredients(meal);
  const steps = getSteps(meal.strInstructions);
  const videoId = getYoutubeId(meal.strYoutube);
  const tags = meal.strTags?.split(',').map((tag) => tag.trim()).filter(Boolean) || [];

  return (
    <article className="pb-8">
      <div className="container-page py-8 lg:py-12">
        <nav
          aria-label="Breadcrumb"
          className="print:hidden"
        >
          <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-soft">
            <li className="flex items-center gap-1">
              <Link
                to="/"
                className="hover:text-brand"
              >
                Home
              </Link>
              <FiChevronRight aria-hidden />
            </li>
            <li className="flex items-center gap-1">
              <Link
                to={`/meal-category/${meal.strCategory}`}
                className="hover:text-brand"
              >
                {meal.strCategory}
              </Link>
              <FiChevronRight aria-hidden />
            </li>
            <li
              className="font-medium text-ink"
              aria-current="page"
            >
              {meal.strMeal}
            </li>
          </ol>
        </nav>

        <header className="mt-8 grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift print:max-h-72 print:shadow-none"
          />

          <div>
            <div className="flex flex-wrap gap-2">
              <Link
                to={`/meal-category/${meal.strCategory}`}
                className="chip hover:text-brand"
              >
                <FiTag
                  className="text-brand"
                  aria-hidden
                />
                {meal.strCategory}
              </Link>
              {meal.strArea && (
                <Link
                  to={`/meal-category-area/${meal.strArea}`}
                  className="chip hover:text-brand"
                >
                  <FiGlobe
                    className="text-brand"
                    aria-hidden
                  />
                  {meal.strArea}
                </Link>
              )}
            </div>

            <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
              {meal.strMeal}
            </h1>

            {tags.length > 0 && (
              <p className="mt-4 text-ink-soft">
                {tags.map((tag) => `#${tag}`).join('  ')}
              </p>
            )}

            <dl className="mt-8 grid max-w-sm grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white p-4 ring-1 ring-line">
                <dt className="text-sm text-ink-soft">Ingredients</dt>
                <dd className="mt-1 font-serif text-3xl font-semibold">
                  {ingredients.length}
                </dd>
              </div>
              <div className="rounded-2xl bg-white p-4 ring-1 ring-line">
                <dt className="text-sm text-ink-soft">Steps</dt>
                <dd className="mt-1 font-serif text-3xl font-semibold">{steps.length}</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3 print:hidden">
              <a
                href="#instructions"
                className="btn-primary"
              >
                <FiList aria-hidden /> Start cooking
              </a>
              {videoId && (
                <a
                  href="#video"
                  className="btn-outline"
                >
                  <FiYoutube
                    className="text-red-600"
                    aria-hidden
                  />
                  Watch video
                </a>
              )}
              <button
                type="button"
                onClick={() => window.print()}
                className="btn-outline"
              >
                <FiPrinter aria-hidden /> Print
              </button>
            </div>
          </div>
        </header>
      </div>

      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-14">
        <aside className="lg:col-span-5 xl:col-span-4">
          <div className="lg:sticky lg:top-28">
            <IngredientList
              key={meal.idMeal}
              ingredients={ingredients}
            />
          </div>
        </aside>

        <div className="space-y-14 lg:col-span-7 xl:col-span-8">
          {videoId && (
            <RecipeVideo
              videoId={videoId}
              title={meal.strMeal}
              url={meal.strYoutube}
            />
          )}

          <section
            id="instructions"
            className="scroll-mt-28"
          >
            <h2 className="text-3xl font-semibold">Instructions</h2>
            <ol className="mt-8 space-y-8">
              {steps.map((step, index) => (
                <li
                  key={index}
                  className="flex gap-5"
                >
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-50 font-serif text-lg font-semibold text-brand ring-1 ring-brand/20"
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  <div className="pt-1.5">
                    <p className="sr-only">Step {index + 1}</p>
                    <p className="text-lg leading-relaxed text-ink">{step}</p>
                  </div>
                </li>
              ))}
            </ol>

            {meal.strSource && (
              <a
                href={meal.strSource}
                target="_blank"
                rel="noreferrer"
                className="mt-10 inline-flex items-center gap-2 font-medium text-brand underline-offset-4 hover:underline print:hidden"
              >
                View original recipe source <FiExternalLink aria-hidden />
              </a>
            )}
          </section>
        </div>
      </div>

      <div className="print:hidden">
        <CardRecommendations
          ingredient={ingredients[0]?.name}
          excludeId={meal.idMeal}
        />
      </div>
    </article>
  );
};

export default DetailRecipes;
