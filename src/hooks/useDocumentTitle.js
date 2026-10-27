import { useEffect } from 'react';

const SITE_NAME = 'Tastebite';
const DEFAULT_TITLE = `${SITE_NAME} — Recipes from around the world`;

/** Sets the browser tab title, e.g. "Pad See Ew · Tastebite". */
const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE_NAME}` : DEFAULT_TITLE;
  }, [title]);
};

export default useDocumentTitle;
