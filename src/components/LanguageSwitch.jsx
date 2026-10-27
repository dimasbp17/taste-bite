import React from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../i18n';

const labels = {
  id: { short: 'ID', full: 'Bahasa Indonesia' },
  en: { short: 'EN', full: 'English' },
};

const LanguageSwitch = ({ className = '' }) => {
  const { t, i18n } = useTranslation();

  return (
    <div
      role="group"
      aria-label={t('lang.label')}
      className={`inline-flex rounded-full bg-white p-1 ring-1 ring-line ${className}`}
    >
      {LANGUAGES.map((code) => {
        const active = i18n.resolvedLanguage === code;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            onClick={() => i18n.changeLanguage(code)}
            aria-pressed={active}
            aria-label={labels[code].full}
            title={labels[code].full}
            className={`min-h-[36px] min-w-[44px] rounded-full px-3 text-sm font-semibold transition-colors ${
              active ? 'bg-ink text-white' : 'text-ink-soft hover:text-ink'
            }`}
          >
            {labels[code].short}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitch;
