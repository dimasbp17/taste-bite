import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiCheck, FiCopy, FiPrinter, FiShare2, FiShoppingCart, FiX } from 'react-icons/fi';
import useShoppingList from '../../hooks/useShoppingList';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { getIngredientImage } from '../../lib/api';

// Plain-text version for sharing to WhatsApp, notes, etc. Bought items are left out.
const toText = (title, recipes) =>
  [
    title,
    ...recipes
      .map((recipe) => ({ ...recipe, items: recipe.items.filter((item) => !item.bought) }))
      .filter((recipe) => recipe.items.length > 0)
      .map(
        (recipe) =>
          `\n${recipe.strMeal}\n` +
          recipe.items
            .map((item) => `• ${item.name}${item.measure ? ` (${item.measure})` : ''}`)
            .join('\n')
      ),
  ].join('\n');

const ShoppingList = () => {
  const { t } = useTranslation();
  const list = useShoppingList();
  const [notice, setNotice] = useState('');
  useDocumentTitle(t('shop.docTitle'));

  const canShare = typeof navigator !== 'undefined' && 'share' in navigator;
  const text = toText(t('shop.shareTitle'), list.recipes);

  const share = async () => {
    try {
      await navigator.share({ title: t('shop.shareTitle'), text });
    } catch {
      // The user closed the share sheet; nothing to do.
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setNotice(t('shop.copied'));
    } catch {
      setNotice(t('shop.copyFailed'));
    }
  };

  const clearAll = () => {
    if (window.confirm(t('shop.confirmClear'))) list.clear();
  };

  if (list.recipes.length === 0) {
    return (
      <div className="container-page py-10 lg:py-14">
        <p className="eyebrow">{t('shop.eyebrow')}</p>
        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{t('shop.title')}</h1>
        <div className="mt-10 rounded-3xl border border-dashed border-line bg-white/60 px-6 py-16 text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-50 text-2xl text-brand">
            <FiShoppingCart aria-hidden />
          </span>
          <p className="mt-5 font-serif text-2xl text-ink">{t('shop.emptyTitle')}</p>
          <p className="mx-auto mt-2 max-w-md text-ink-soft">{t('shop.emptyText')}</p>
          <Link
            to="/recipes"
            className="btn-primary mt-6"
          >
            {t('shop.browse')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-10 lg:py-14">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow print:hidden">{t('shop.eyebrow')}</p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{t('shop.title')}</h1>
          <p
            className="mt-3 text-lg text-ink-soft"
            aria-live="polite"
          >
            {list.remaining > 0
              ? t('shop.summary', { remaining: list.remaining, total: list.total })
              : t('shop.allBought')}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 print:hidden">
          {canShare && (
            <button
              type="button"
              onClick={share}
              className="btn-primary"
            >
              <FiShare2 aria-hidden /> {t('shop.share')}
            </button>
          )}
          <button
            type="button"
            onClick={copy}
            className={canShare ? 'btn-outline' : 'btn-primary'}
          >
            <FiCopy aria-hidden /> {t('shop.copy')}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="btn-outline"
          >
            <FiPrinter aria-hidden /> {t('shop.print')}
          </button>
        </div>
      </header>

      {notice && (
        <p
          role="status"
          className="mt-6 rounded-xl bg-sage-50 px-4 py-3 text-sage print:hidden"
        >
          {notice}
        </p>
      )}

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {list.recipes.map((recipe) => {
          const left = recipe.items.filter((item) => !item.bought).length;
          return (
            <section
              key={recipe.idMeal}
              className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-line sm:p-6 print:break-inside-avoid print:shadow-none"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`${recipe.strMealThumb}/preview`}
                  alt=""
                  className="size-14 shrink-0 rounded-xl object-cover print:hidden"
                />
                <div className="min-w-0 flex-1">
                  <h2
                    lang="en"
                    className="truncate font-sans text-lg font-semibold"
                  >
                    {recipe.strMeal}
                  </h2>
                  <p className="text-sm text-ink-soft">
                    {t('shop.itemsLeft', { count: left })} ·{' '}
                    <Link
                      to={`/detail-recipes/${recipe.idMeal}`}
                      className="font-medium text-brand hover:underline print:hidden"
                    >
                      {t('shop.viewRecipe')}
                    </Link>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => list.removeRecipe(recipe.idMeal)}
                  className="btn-ghost size-11 shrink-0 p-0 text-ink-muted print:hidden"
                  aria-label={t('shop.removeRecipe', { name: recipe.strMeal })}
                  title={t('shop.removeRecipe', { name: recipe.strMeal })}
                >
                  <FiX className="text-lg" />
                </button>
              </div>

              <ul
                lang="en"
                className="mt-4 divide-y divide-line"
              >
                {recipe.items.map((item) => (
                  <li
                    key={item.name}
                    className="group flex items-center gap-2"
                  >
                    <button
                      type="button"
                      onClick={() => list.toggleItem(recipe.idMeal, item.name)}
                      aria-pressed={item.bought}
                      className="flex min-h-[52px] flex-1 items-center gap-3 py-2 text-left"
                    >
                      <span
                        className={`flex size-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                          item.bought ? 'border-sage bg-sage text-white' : 'border-line'
                        }`}
                        aria-hidden
                      >
                        {item.bought && <FiCheck className="text-sm" />}
                      </span>
                      <img
                        src={getIngredientImage(item.name)}
                        alt=""
                        loading="lazy"
                        className={`size-9 shrink-0 object-contain print:hidden ${item.bought ? 'opacity-40' : ''}`}
                      />
                      <span className={item.bought ? 'text-ink-muted line-through' : 'text-ink'}>
                        <span className="font-semibold">{item.name}</span>
                        {item.measure && (
                          <span className={item.bought ? '' : 'text-ink-soft'}> — {item.measure}</span>
                        )}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => list.removeItem(recipe.idMeal, item.name)}
                      className="flex size-10 shrink-0 items-center justify-center rounded-full text-ink-muted hover:bg-cream-dark hover:text-ink print:hidden"
                      aria-label={t('shop.removeItem', { name: item.name })}
                    >
                      <FiX aria-hidden />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <p className="text-sm text-ink-soft">{t('shop.note')}</p>
        <div className="flex flex-wrap gap-2">
          {list.bought > 0 && (
            <button
              type="button"
              onClick={list.clearBought}
              className="btn-outline"
            >
              {t('shop.clearBought')}
            </button>
          )}
          <button
            type="button"
            onClick={clearAll}
            className="btn-ghost text-ink-soft"
          >
            {t('shop.clearAll')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
