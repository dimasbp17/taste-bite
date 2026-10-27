import React from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  useDocumentTitle(t('notFound.docTitle'));

  return (
    <section className="container-page flex flex-col items-center py-24 text-center">
      <p className="font-serif text-7xl font-semibold text-brand">404</p>
      <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">{t('notFound.title')}</h1>
      <p className="mt-3 max-w-md text-ink-soft">{t('notFound.text')}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="btn-primary"
        >
          {t('notFound.home')}
        </Link>
        <Link
          to="/recipes"
          className="btn-outline"
        >
          {t('notFound.browse')}
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
