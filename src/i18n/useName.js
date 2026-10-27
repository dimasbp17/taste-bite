import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Display name for a TheMealDB category, cuisine or ingredient,
 * e.g. "Chicken" → "Ayam". Names without a translation are shown as-is.
 */
const useName = () => {
  const { t } = useTranslation('names');
  return useCallback((value) => (value ? t(value, { defaultValue: value }) : value), [t]);
};

export default useName;
