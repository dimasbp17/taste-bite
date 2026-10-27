import React from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';

const NotFound = () => {
  useDocumentTitle('Page not found');

  return (
    <section className="container-page flex flex-col items-center py-24 text-center">
      <p className="font-serif text-7xl font-semibold text-brand">404</p>
      <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">
        This page isn&apos;t on the menu
      </h1>
      <p className="mt-3 max-w-md text-ink-soft">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="btn-primary"
        >
          Back to home
        </Link>
        <Link
          to="/recipes"
          className="btn-outline"
        >
          Browse recipes
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
