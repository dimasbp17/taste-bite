import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiMenu, FiSearch, FiShoppingCart, FiX } from 'react-icons/fi';
import { FaRegHeart } from 'react-icons/fa';
import SearchDialog from './SearchDialog';
import LanguageSwitch from './LanguageSwitch';
import useFavorites from '../hooks/useFavorites';
import useShoppingList from '../hooks/useShoppingList';
import { useTranslation } from 'react-i18next';

// Labels hide at lg, where the main links take the space, and return at xl.
const labelClass = 'hidden sm:inline lg:hidden xl:inline';

const IconLink = ({ to, icon: Icon, label, ariaLabel, count }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `btn relative px-3 sm:px-4 ${isActive ? 'bg-brand-50 text-brand' : 'text-ink hover:bg-cream-dark'}`
    }
    aria-label={ariaLabel}
  >
    <Icon className="text-lg" />
    <span className={labelClass}>{label}</span>
    {count > 0 && (
      <span className="absolute -right-0.5 top-0.5 flex min-w-[1.25rem] items-center justify-center rounded-full bg-brand px-1 text-xs font-semibold leading-5 text-white sm:static sm:bg-brand-100 sm:text-brand lg:absolute lg:bg-brand lg:text-white xl:static xl:bg-brand-100 xl:text-brand">
        {count}
      </span>
    )}
  </NavLink>
);

const links = [
  { to: '/', label: 'nav.home' },
  { to: '/recipes', label: 'nav.recipes' },
  { to: '/cook-with-ingredients', label: 'nav.byIngredient' },
  { to: '/about', label: 'nav.about' },
];

const linkClass = ({ isActive }) =>
  `rounded-full px-4 py-2 font-medium transition-colors ${
    isActive ? 'bg-brand-50 text-brand' : 'text-ink-soft hover:text-ink'
  }`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { pathname } = useLocation();
  const { favorites } = useFavorites();
  const { remaining } = useShoppingList();
  const { t } = useTranslation();

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-cream/90 backdrop-blur print:hidden">
      <nav
        className="container-page flex h-16 items-center justify-between gap-4 lg:h-20"
        aria-label={t('nav.main')}
      >
        <Link
          to="/"
          className="shrink-0 rounded-md"
        >
          <img
            src="/images/logo-taste.png"
            alt={t('nav.logo')}
            className="h-10 w-auto lg:h-12"
          />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={linkClass}
              >
                {t(link.label)}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="btn-ghost px-3 sm:px-4"
            aria-label={t('nav.searchRecipes')}
          >
            <FiSearch className="text-lg" />
            <span className={labelClass}>{t('nav.search')}</span>
          </button>
          <IconLink
            to="/saved"
            icon={FaRegHeart}
            label={t('nav.saved')}
            ariaLabel={t('nav.savedCount', { count: favorites.length })}
            count={favorites.length}
          />
          <IconLink
            to="/shopping-list"
            icon={FiShoppingCart}
            label={t('nav.shopping')}
            ariaLabel={t('nav.shoppingCount', { count: remaining })}
            count={remaining}
          />
          <LanguageSwitch className="ml-1 hidden lg:inline-flex" />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="btn-ghost px-3 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
          >
            {menuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-line bg-cream lg:hidden"
        >
          <ul className="container-page flex flex-col gap-1 py-4">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-lg font-medium ${
                      isActive ? 'bg-brand-50 text-brand' : 'text-ink'
                    }`
                  }
                >
                  {t(link.label)}
                </NavLink>
              </li>
            ))}
            <li className="mt-2 flex items-center justify-between gap-4 border-t border-line px-4 pt-4">
              <span className="font-medium text-ink-soft">{t('lang.label')}</span>
              <LanguageSwitch />
            </li>
          </ul>
        </div>
      )}

      <SearchDialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </header>
  );
};

export default Navbar;
