import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiSearch, FiX } from 'react-icons/fi';
import { searchMeals } from '../lib/api';
import useLanguage from '../i18n/useLanguage';

// Search terms stay in English (the recipe database is English);
// only the button labels are translated.
const suggestions = ['Chicken', 'Pasta', 'Soup', 'Cake', 'Salmon', 'Curry'];

const SearchDialog = ({ open, onClose }) => {
  const { t, name } = useLanguage();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return undefined;

    inputRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    const term = query.trim();
    if (!term) {
      setResults([]);
      setLoading(false);
      return undefined;
    }

    let active = true;
    setLoading(true);
    const timeout = setTimeout(() => {
      searchMeals(term)
        .then((meals) => active && setResults(meals))
        .catch(() => active && setResults([]))
        .finally(() => active && setLoading(false));
    }, 350);

    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [query]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/recipes?q=${encodeURIComponent(query.trim())}`);
    onClose();
  };

  const term = query.trim();

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-ink/50 px-4 pt-[10vh] backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('nav.searchRecipes')}
        className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-lift"
      >
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 border-b border-line px-5"
        >
          <FiSearch
            className="shrink-0 text-xl text-ink-muted"
            aria-hidden
          />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            aria-label={t('search.label')}
            className="h-16 w-full bg-transparent text-lg text-ink placeholder:text-ink-muted focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="btn-ghost shrink-0 px-3"
            aria-label={t('search.close')}
          >
            <FiX className="text-xl" />
          </button>
        </form>

        <div className="max-h-[60vh] overflow-y-auto p-3">
          {!term && (
            <div className="p-3">
              <p className="mb-3 text-sm font-medium text-ink-soft">
                {t('search.popular')}
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setQuery(item)}
                    className="chip min-h-[40px] px-4 hover:bg-cream-dark hover:text-ink"
                  >
                    {name(item)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {term && loading && (
            <ul aria-busy="true">
              {Array.from({ length: 3 }, (_, i) => (
                <li
                  key={i}
                  className="flex animate-pulse items-center gap-4 p-3"
                >
                  <div className="size-16 rounded-xl bg-cream-dark" />
                  <div className="h-4 w-1/2 rounded bg-cream-dark" />
                </li>
              ))}
            </ul>
          )}

          {term && !loading && results.length === 0 && (
            <p className="p-6 text-center text-ink-soft">
              {t('search.noResults', term)}
            </p>
          )}

          {term && !loading && results.length > 0 && (
            <>
              <ul>
                {results.slice(0, 6).map((meal) => (
                  <li key={meal.idMeal}>
                    <Link
                      to={`/detail-recipes/${meal.idMeal}`}
                      onClick={onClose}
                      className="flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-cream"
                    >
                      <img
                        src={`${meal.strMealThumb}/preview`}
                        alt=""
                        className="size-16 shrink-0 rounded-xl object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-ink">
                          {meal.strMeal}
                        </p>
                        <p className="text-sm text-ink-soft">
                          {name(meal.strCategory)} · {name(meal.strArea)}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={handleSubmit}
                className="btn-ghost mt-1 w-full text-brand"
              >
                {t('search.seeAll', results.length)}
                <FiArrowRight aria-hidden />
              </button>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SearchDialog;
