import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import useLanguage from '../i18n/useLanguage';

const Layout = () => {
  const { pathname, hash } = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const target = hash && document.getElementById(hash.slice(1));
    if (target) target.scrollIntoView();
    else window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        {t('layout.skip')}
      </a>
      <Navbar />
      <main
        id="main"
        className="flex-1"
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
