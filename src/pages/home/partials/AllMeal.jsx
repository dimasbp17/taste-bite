import React from 'react';
import { searchMeals } from '../../../lib/api';
import useFetch from '../../../hooks/useFetch';
import SectionHeader from '../../../components/SectionHeader';
import MealGrid from '../../../components/MealGrid';
import ShowMore from '../../../components/ShowMore';
import usePaged from '../../../hooks/usePaged';
import { useTranslation } from 'react-i18next';

const PAGE_SIZE = 8;

const AllMeals = () => {
  const { t } = useTranslation();
  const { data, loading, error, retry } = useFetch(() => searchMeals(''));
  const paged = usePaged(data || [], PAGE_SIZE);

  return (
    <section className="container-page py-16 lg:py-20">
      <SectionHeader
        eyebrow={t('allMeals.eyebrow')}
        title={t('allMeals.title')}
        link={{ to: '/recipes', label: t('allMeals.browse') }}
      />
      <MealGrid
        meals={paged.visible}
        loading={loading}
        error={error}
        onRetry={retry}
      />
      {!loading && <ShowMore paged={paged} />}
    </section>
  );
};

export default AllMeals;
