import { useCallback, useSyncExternalStore } from 'react';
import translations, { names } from './translations';

// The chosen language is remembered in localStorage; Indonesian is the default.
const STORAGE_KEY = 'tastebite:language';
export const LANGUAGES = ['id', 'en'];
const DEFAULT_LANGUAGE = 'id';
const listeners = new Set();

const read = () => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return LANGUAGES.includes(value) ? value : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
};

let language = read();
document.documentElement.lang = language;

export const setLanguage = (next) => {
  if (!LANGUAGES.includes(next) || next === language) return;
  language = next;
  document.documentElement.lang = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Not critical: the choice just won't be remembered.
  }
  listeners.forEach((listener) => listener());
};

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => language;

const useLanguage = () => {
  const lang = useSyncExternalStore(subscribe, getSnapshot);

  const t = useCallback(
    (key, ...args) => {
      const value = translations[lang][key] ?? translations.en[key];
      if (value === undefined) {
        console.warn(`Missing translation: ${key}`);
        return key;
      }
      return typeof value === 'function' ? value(...args) : value;
    },
    [lang]
  );

  // Display name for a category, cuisine or ingredient from TheMealDB.
  const name = useCallback((value) => (value && names[lang][value]) || value, [lang]);

  return { lang, setLanguage, t, name };
};

export default useLanguage;
