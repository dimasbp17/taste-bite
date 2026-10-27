import { useEffect } from 'react';
import useLanguage from '../i18n/useLanguage';

const SITE_NAME = 'Tastebite';

/** Sets the browser tab title, e.g. "Pad See Ew · Tastebite". */
const useDocumentTitle = (title) => {
  const { t } = useLanguage();
  const defaultTitle = t('site.defaultTitle');

  useEffect(() => {
    document.title = title ? `${title} · ${SITE_NAME}` : defaultTitle;
  }, [title, defaultTitle]);
};

export default useDocumentTitle;
