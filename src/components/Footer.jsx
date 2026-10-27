import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useName from '../i18n/useName';

const exploreLinks = [
  { to: '/', label: 'nav.home' },
  { to: '/recipes', label: 'footer.allRecipes' },
  { to: '/cook-with-ingredients', label: 'footer.byIngredient' },
  { to: '/saved', label: 'footer.saved' },
  { to: '/about', label: 'footer.about' },
];

const popularCategories = ['Chicken', 'Vegetarian', 'Seafood', 'Dessert'];

const linkClass = 'transition-colors hover:text-white';

const Footer = () => {
  const { t } = useTranslation();
  const name = useName();

  return (
    <footer className="mt-24 bg-ink text-white/70 print:hidden">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <img
            src="/images/logo-taste.png"
            alt="Tastebite"
            className="h-12 w-auto invert"
          />
          <p className="mt-4 max-w-sm">{t('footer.tagline')}</p>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:col-span-7">
          <div>
            <h2 className="font-sans text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.explore')}
            </h2>
            <ul className="mt-4 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={linkClass}
                  >
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-sans text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.popular')}
            </h2>
            <ul className="mt-4 space-y-3">
              {popularCategories.map((category) => (
                <li key={category}>
                  <Link
                    to={`/meal-category/${category}`}
                    className={linkClass}
                  >
                    {name(category)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-sm sm:flex-row sm:justify-between">
          <p>{t('footer.rights', { year: new Date().getFullYear() })}</p>
          <p>
            {t('footer.dataBy')}{' '}
            <a
              href="https://www.themealdb.com"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-white"
            >
              TheMealDB
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
