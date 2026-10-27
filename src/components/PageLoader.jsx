import React from 'react';
import { useTranslation } from 'react-i18next';

/** Shown while a page's code is downloading. */
const PageLoader = ({ fullScreen = false }) => {
  const { t } = useTranslation();

  return (
    <div
      role="status"
      className={`flex items-center justify-center ${fullScreen ? 'min-h-screen' : 'min-h-[60vh]'}`}
    >
      <span
        className="size-10 animate-spin rounded-full border-4 border-brand-100 border-t-brand"
        aria-hidden
      />
      <span className="sr-only">{t('status.loading')}</span>
    </div>
  );
};

export default PageLoader;
