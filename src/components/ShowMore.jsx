import React from 'react';
import { useTranslation } from 'react-i18next';

/** "Showing 12 of 168 recipes" with a button to load the next page (see usePaged). */
const ShowMore = ({ paged }) => {
  const { t } = useTranslation();
  if (!paged.hasMore) return null;

  return (
    <div className="mt-12 flex flex-col items-center gap-3">
      <p className="text-sm text-ink-soft">
        {t('list.showing', { shown: paged.shown, total: paged.total })}
      </p>
      <div
        className="h-1.5 w-48 overflow-hidden rounded-full bg-line"
        aria-hidden
      >
        <div
          className="h-full rounded-full bg-brand"
          style={{ width: `${(paged.shown / paged.total) * 100}%` }}
        />
      </div>
      <button
        type="button"
        onClick={paged.showMore}
        className="btn-outline mt-1 px-8"
      >
        {t('list.showMore')}
      </button>
    </div>
  );
};

export default ShowMore;
