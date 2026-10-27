import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import idCommon from './locales/id/common.json';
import idNames from './locales/id/names.json';
import enCommon from './locales/en/common.json';
import enNames from './locales/en/names.json';

// Indonesian is the default; the visitor's choice is remembered in localStorage.
// Recipe content from TheMealDB (names, steps, measures) is English-only.
const STORAGE_KEY = 'tastebite:language';
export const LANGUAGES = ['id', 'en'];

const savedLanguage = () => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return LANGUAGES.includes(value) ? value : 'id';
  } catch {
    return 'id';
  }
};

i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language;
  try {
    localStorage.setItem(STORAGE_KEY, language);
  } catch {
    // Not critical: the choice just won't be remembered.
  }
});

i18n.use(initReactI18next).init({
  resources: {
    id: { common: idCommon, names: idNames },
    en: { common: enCommon, names: enNames },
  },
  lng: savedLanguage(),
  fallbackLng: 'en',
  supportedLngs: LANGUAGES,
  ns: ['common', 'names'],
  defaultNS: 'common',
  // Resources are bundled, so initialise synchronously before the first render.
  initAsync: false,
  interpolation: { escapeValue: false },
});

export default i18n;
