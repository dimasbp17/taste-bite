import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { filterByArea } from '../../lib/api';
import { getAreaImage } from '../../data/areas';
import useFetch from '../../hooks/useFetch';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { useTranslation } from 'react-i18next';
import useName from '../../i18n/useName';
import MealGrid from '../../components/MealGrid';
import ShowMore from '../../components/ShowMore';
import usePaged from '../../hooks/usePaged';

const PAGE_SIZE = 12;

const CategoriesByArea = () => {
  const { area } = useParams();
  const { t } = useTranslation();
  const name = useName();
  const label = name(area);
  const image = getAreaImage(area);
  useDocumentTitle(t('recipes.categoryTitle', { category: label }));
  const { data, loading, error, retry } = useFetch(() => filterByArea(area), [area]);
  const meals = (data || []).map((meal) => ({ ...meal, strArea: area }));
  const paged = usePaged(meals, PAGE_SIZE, area);

  return (
    <>
      <section className="relative overflow-hidden bg-ink">
        {image && (
          <img
            src={image}
            alt=""
            className="absolute inset-0 size-full object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-transparent" />
        <div className="container-page relative py-16 text-white lg:py-24">
          <Link
            to="/#cuisines"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white"
          >
            <FiArrowLeft aria-hidden /> {t('area.back')}
          </Link>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-brand-100">
            {t('area.eyebrow')}
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-white sm:text-6xl">
            {t('area.title', { area: label })}
          </h1>
          {!loading && !error && (
            <p className="mt-3 text-lg text-white/85">{t('area.count', { count: meals.length })}</p>
          )}
        </div>
      </section>

      <div className="container-page py-12">
        <MealGrid
          meals={paged.visible}
          loading={loading}
          error={error}
          onRetry={retry}
          skeletonCount={PAGE_SIZE}
          emptyMessage={t('area.empty', { area: label })}
        />
        {!loading && <ShowMore paged={paged} />}
      </div>
    </>
  );
};

export default CategoriesByArea;
