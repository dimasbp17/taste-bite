import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';
import useFavorites from '../../hooks/useFavorites';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import MealGrid from '../../components/MealGrid';

const SavedRecipes = () => {
  const { favorites, clear } = useFavorites();
  useDocumentTitle('Saved recipes');

  const handleClear = () => {
    if (window.confirm('Remove all saved recipes? This cannot be undone.')) clear();
  };

  return (
    <div className="container-page py-10 lg:py-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow">Your collection</p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Saved recipes</h1>
          <p className="mt-3 text-ink-soft">
            {favorites.length > 0
              ? `${favorites.length} ${favorites.length === 1 ? 'recipe' : 'recipes'} saved on this device.`
              : 'Recipes you save are kept on this device.'}
          </p>
        </div>
        {favorites.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="btn-ghost self-start text-ink-soft sm:self-auto"
          >
            Remove all
          </button>
        )}
      </header>

      <div className="mt-10">
        {favorites.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-line bg-white/60 px-6 py-16 text-center">
            <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-50 text-2xl text-brand">
              <FaRegHeart aria-hidden />
            </span>
            <p className="mt-5 font-serif text-2xl text-ink">No saved recipes yet</p>
            <p className="mx-auto mt-2 max-w-md text-ink-soft">
              Tap the heart on any recipe to keep it here, so you can find it
              again quickly.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/recipes"
                className="btn-primary"
              >
                Browse recipes
              </Link>
              <Link
                to="/cook-with-ingredients"
                className="btn-outline"
              >
                Cook by ingredient
              </Link>
            </div>
          </div>
        ) : (
          <MealGrid meals={favorites} />
        )}
      </div>
    </div>
  );
};

export default SavedRecipes;
