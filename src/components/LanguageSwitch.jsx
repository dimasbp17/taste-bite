import React from 'react';
import useLanguage, { LANGUAGES } from '../i18n/useLanguage';

const labels = {
  id: { short: 'ID', full: 'Bahasa Indonesia' },
  en: { short: 'EN', full: 'English' },
};

const LanguageSwitch = ({ className = '' }) => {
  const { lang, setLanguage, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t('lang.label')}
      className={`inline-flex rounded-full bg-white p-1 ring-1 ring-line ${className}`}
    >
      {LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          onClick={() => setLanguage(code)}
          aria-pressed={lang === code}
          aria-label={labels[code].full}
          title={labels[code].full}
          className={`min-h-[36px] min-w-[44px] rounded-full px-3 text-sm font-semibold transition-colors ${
            lang === code ? 'bg-ink text-white' : 'text-ink-soft hover:text-ink'
          }`}
        >
          {labels[code].short}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitch;
