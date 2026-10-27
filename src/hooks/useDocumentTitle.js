import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SITE_NAME = 'Tastebite';

/** Sets the browser tab title, e.g. "Pad See Ew · Tastebite". */
const useDocumentTitle = (title) => {
  const { t } = useTranslation();
  const defaultTitle = t('site.defaultTitle');

  useEffect(() => {
    document.title = title ? `${title} · ${SITE_NAME}` : defaultTitle;
  }, [title, defaultTitle]);
};

export default useDocumentTitle;
