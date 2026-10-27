import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiMenu, FiSearch, FiX } from 'react-icons/fi';
import { FaRegHeart } from 'react-icons/fa';
import SearchDialog from './SearchDialog';
import useFavorites from '../hooks/useFavorites';

const links = [
  { to: '/', label: 'Home' },
  { to: '/recipes', label: 'Recipes' },
  { to: '/cook-with-ingredients', label: 'By Ingredient' },
  { to: '/about', label: 'About' },
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

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-cream/90 backdrop-blur print:hidden">
      <nav
        className="container-page flex h-16 items-center justify-between gap-4 lg:h-20"
        aria-label="Main"
      >
        <Link
          to="/"
          className="shrink-0 rounded-md"
        >
          <img
            src="/images/logo-taste.png"
            alt="Tastebite home"
            className="h-10 w-auto lg:h-12"
          />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={linkClass}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="btn-ghost px-3 sm:px-4"
            aria-label="Search recipes"
          >
            <FiSearch className="text-lg" />
            <span className="hidden sm:inline">Search</span>
          </button>
          <NavLink
            to="/saved"
            className={({ isActive }) =>
              `btn relative px-3 sm:px-4 ${
                isActive ? 'bg-brand-50 text-brand' : 'text-ink hover:bg-cream-dark'
              }`
            }
            aria-label={`Saved recipes (${favorites.length})`}
          >
            <FaRegHeart className="text-lg" />
            <span className="hidden sm:inline">Saved</span>
            {favorites.length > 0 && (
              <span className="absolute -right-0.5 top-0.5 flex min-w-[1.25rem] items-center justify-center rounded-full bg-brand px-1 text-xs font-semibold leading-5 text-white sm:static sm:bg-brand-100 sm:text-brand">
                {favorites.length}
              </span>
            )}
          </NavLink>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="btn-ghost px-3 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-line bg-cream md:hidden"
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
                  {link.label}
                </NavLink>
              </li>
            ))}
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
