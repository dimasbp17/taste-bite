import React from 'react';
import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'Explore',
    links: [
      { to: '/', label: 'Home' },
      { to: '/recipes', label: 'All recipes' },
      { to: '/cook-with-ingredients', label: 'Cook by ingredient' },
      { to: '/about', label: 'About us' },
    ],
  },
  {
    title: 'Popular',
    links: [
      { to: '/meal-category/Chicken', label: 'Chicken' },
      { to: '/meal-category/Vegetarian', label: 'Vegetarian' },
      { to: '/meal-category/Seafood', label: 'Seafood' },
      { to: '/meal-category/Dessert', label: 'Dessert' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="mt-24 bg-ink text-white/70 print:hidden">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <img
            src="/images/logo-taste.png"
            alt="Tastebite"
            className="h-12 w-auto invert"
          />
          <p className="mt-4 max-w-sm">
            Simple, honest recipes from kitchens around the world — written so
            anyone can cook them at home.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:col-span-7">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="font-sans text-sm font-semibold uppercase tracking-wider text-white">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-sm sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Tastebite. All rights reserved.</p>
          <p>
            Recipe data by{' '}
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
