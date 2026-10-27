import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  FiArrowLeft,
  FiArrowRight,
  FiBell,
  FiCheck,
  FiClock,
  FiSun,
  FiType,
  FiX,
} from 'react-icons/fi';
import { getIngredientImage, getIngredients, getMealById, getSteps } from '../../lib/api';
import useFetch from '../../hooks/useFetch';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useWakeLock from '../../hooks/useWakeLock';
import useLanguage from '../../i18n/useLanguage';
import FavoriteButton from '../../components/FavoriteButton';
import StatusMessage from '../../components/StatusMessage';
import useTimer, { formatTime } from './useTimer';
import { findDurations, findStepIngredients } from './cookHelpers';

const TEXT_SIZES = ['text-2xl sm:text-3xl', 'text-3xl sm:text-4xl', 'text-4xl sm:text-5xl'];
const TEXT_SIZE_KEY = 'tastebite:cook-text-size';

const readTextSize = () => {
  try {
    const value = Number(localStorage.getItem(TEXT_SIZE_KEY));
    return TEXT_SIZES[value] ? value : 0;
  } catch {
    return 0;
  }
};

const IngredientChip = ({ item }) => (
  <li className="flex items-center gap-3 rounded-2xl bg-white py-2 pl-2 pr-4 ring-1 ring-line">
    <img
      src={getIngredientImage(item.name)}
      alt=""
      className="size-12 shrink-0 object-contain"
    />
    <span
      lang="en"
      className="text-lg"
    >
      <span className="font-semibold text-ink">{item.name}</span>
      {item.measure && <span className="text-ink-soft"> — {item.measure}</span>}
    </span>
  </li>
);

const CookingMode = () => {
  const { id } = useParams();
  const [params, setParams] = useSearchParams();
  const { t } = useLanguage();
  const { data: meal, loading, error, retry } = useFetch(() => getMealById(id), [id]);
  const [textSize, setTextSize] = useState(readTextSize);
  const wakeLock = useWakeLock();
  const timer = useTimer();
  const touchStart = useRef(null);

  useDocumentTitle(meal ? t('cook.docTitle', meal.strMeal) : t('cook.docFallback'));

  const ingredients = meal ? getIngredients(meal) : [];
  const steps = meal ? getSteps(meal.strInstructions) : [];
  // Screen 0 = gather ingredients, 1..n = steps, n + 1 = finished.
  const lastScreen = steps.length + 1;
  const screen = Math.min(Math.max(Number(params.get('step')) || 0, 0), lastScreen);

  const goTo = useCallback(
    (next) => {
      if (next < 0 || next > lastScreen) return;
      setParams(next ? { step: String(next) } : {}, { replace: true });
      window.scrollTo({ top: 0 });
    },
    [lastScreen, setParams]
  );

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'ArrowRight') goTo(screen + 1);
      if (e.key === 'ArrowLeft') goTo(screen - 1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goTo, screen]);

  const changeTextSize = () => {
    const next = (textSize + 1) % TEXT_SIZES.length;
    setTextSize(next);
    try {
      localStorage.setItem(TEXT_SIZE_KEY, String(next));
    } catch {
      // Not critical: the size just won't be remembered.
    }
  };

  const onTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const distance = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(distance) > 60) goTo(screen + (distance < 0 ? 1 : -1));
    touchStart.current = null;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="animate-pulse text-lg text-ink-soft">{t('cook.loading')}</p>
      </div>
    );
  }

  if (error || !meal) {
    return (
      <div className="container-page py-16">
        <StatusMessage
          title={error ? t('detail.loadError') : t('detail.notFound')}
          onRetry={error ? retry : undefined}
          action={{ to: '/recipes', label: t('detail.browse') }}
        />
      </div>
    );
  }

  const step = screen >= 1 && screen <= steps.length ? steps[screen - 1] : null;
  const stepIngredients = step ? findStepIngredients(step, ingredients) : [];
  const durations = step ? findDurations(step) : [];
  const progress = (screen / lastScreen) * 100;
  const textSizeLabel = t('cook.textSizes')[textSize];

  let nextLabel = t('cook.next', screen + 1);
  if (screen === 0) nextLabel = t('cook.startStep1');
  else if (screen === steps.length) nextLabel = t('cook.finish');

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <header className="sticky top-0 z-30 border-b border-line bg-cream/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-4xl items-center gap-2 px-4">
          <Link
            to={`/detail-recipes/${meal.idMeal}`}
            className="btn-ghost shrink-0 px-3"
          >
            <FiX
              className="text-xl"
              aria-hidden
            />
            <span className="hidden sm:inline">{t('cook.exit')}</span>
          </Link>
          <p
            lang="en"
            className="min-w-0 flex-1 truncate text-center font-semibold text-ink"
          >
            {meal.strMeal}
          </p>
          <button
            type="button"
            onClick={changeTextSize}
            className="btn-ghost shrink-0 px-3"
            aria-label={t('cook.textSizeLabel', textSizeLabel)}
          >
            <FiType
              className="text-xl"
              aria-hidden
            />
            <span className="hidden sm:inline">{textSizeLabel}</span>
          </button>
        </div>
        <div
          className="h-1.5 bg-line"
          role="progressbar"
          aria-label={t('cook.progress')}
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full bg-brand transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {(timer.timer || timer.finished) && (
        <div
          role="status"
          className={`sticky top-[4.4rem] z-20 mx-auto mt-3 flex w-[calc(100%-2rem)] max-w-4xl items-center gap-3 rounded-2xl px-4 py-3 shadow-card ${
            timer.finished ? 'bg-brand text-white ring-4 ring-brand/30' : 'bg-ink text-white'
          }`}
        >
          {timer.finished ? (
            <>
              <FiBell
                className="shrink-0 text-xl"
                aria-hidden
              />
              <p className="flex-1 text-lg font-semibold">{t('cook.timesUp')}</p>
              <button
                key="dismiss"
                type="button"
                onClick={timer.dismiss}
                className="btn bg-white px-6 font-semibold text-brand hover:bg-brand-50"
              >
                {t('cook.ok')}
              </button>
            </>
          ) : (
            <>
              <FiClock
                className="shrink-0 text-xl"
                aria-hidden
              />
              <p className="flex-1">
                <span className="font-mono text-2xl font-semibold tabular-nums">
                  {formatTime(timer.remaining)}
                </span>
                <span className="ml-2 text-white/70">
                  {t('cook.of', t('cook.duration', timer.timer.minutes))}
                </span>
              </p>
              <button
                key="stop"
                type="button"
                onClick={timer.cancel}
                className="btn border border-white/30 text-white hover:bg-white/10"
              >
                {t('cook.stopTimer')}
              </button>
            </>
          )}
        </div>
      )}

      <main
        className="mx-auto w-full max-w-4xl flex-1 px-4 pb-36 pt-8 sm:pt-12"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-live="polite"
      >
        {screen === 0 && (
          <section>
            <p className="eyebrow">{t('cook.beforeStart')}</p>
            <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{t('cook.gather')}</h1>
            <p className="mt-3 text-lg text-ink-soft">
              {t('cook.summary', ingredients.length, steps.length)}
              {wakeLock.active && (
                <span className="ml-2 inline-flex items-center gap-1.5 text-sage">
                  <FiSun aria-hidden /> {t('cook.screenOn')}
                </span>
              )}
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {ingredients.map((item) => (
                <IngredientChip
                  key={item.name}
                  item={item}
                />
              ))}
            </ul>
          </section>
        )}

        {step && (
          <section>
            <p className="eyebrow">{t('cook.stepOf', screen, steps.length)}</p>
            <p
              lang="en"
              className={`mt-5 font-medium leading-snug text-ink ${TEXT_SIZES[textSize]}`}
            >
              {step}
            </p>

            {durations.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {durations.map((minutes) => (
                  <button
                    key={minutes}
                    type="button"
                    onClick={() => timer.start(minutes)}
                    className="btn border-2 border-brand bg-white px-6 text-lg text-brand hover:bg-brand-50"
                  >
                    <FiClock aria-hidden /> {t('cook.startTimer', t('cook.duration', minutes))}
                  </button>
                ))}
              </div>
            )}

            {stepIngredients.length > 0 && (
              <div className="mt-10 border-t border-line pt-6">
                <p className="font-medium text-ink-soft">{t('cook.inThisStep')}</p>
                <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                  {stepIngredients.map((item) => (
                    <IngredientChip
                      key={item.name}
                      item={item}
                    />
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {screen === lastScreen && (
          <section className="py-8 text-center">
            <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-sage text-4xl text-white">
              <FiCheck aria-hidden />
            </span>
            <h1 className="mt-6 text-4xl font-semibold sm:text-5xl">{t('cook.done')}</h1>
            <p className="mt-3 text-lg text-ink-soft">
              {t('cook.doneText', steps.length, meal.strMeal)}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <FavoriteButton
                meal={meal}
                variant="button"
              />
              <Link
                to={`/detail-recipes/${meal.idMeal}`}
                className="btn-outline"
              >
                {t('cook.backToRecipe')}
              </Link>
              <Link
                to="/recipes"
                className="btn-primary"
              >
                {t('cook.another')}
              </Link>
            </div>
          </section>
        )}
      </main>

      <nav
        aria-label={t('cook.stepNav')}
        className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 backdrop-blur"
      >
        <div className="mx-auto flex max-w-4xl gap-3 px-4 py-4">
          <button
            type="button"
            onClick={() => goTo(screen - 1)}
            disabled={screen === 0}
            className="btn-outline min-h-[56px] px-6 text-lg"
          >
            <FiArrowLeft aria-hidden /> {t('cook.back')}
          </button>
          {screen < lastScreen ? (
            <button
              type="button"
              onClick={() => goTo(screen + 1)}
              className="btn-primary min-h-[56px] flex-1 text-lg"
            >
              {nextLabel}
              <FiArrowRight aria-hidden />
            </button>
          ) : (
            <Link
              to={`/detail-recipes/${meal.idMeal}`}
              className="btn-primary min-h-[56px] flex-1 text-lg"
            >
              {t('cook.doneButton')}
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default CookingMode;
