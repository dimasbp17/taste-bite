import React from 'react';
import { filterByCategory } from '../../../lib/api';
import useFetch from '../../../hooks/useFetch';
import SectionHeader from '../../../components/SectionHeader';
import MealGrid from '../../../components/MealGrid';
import useLanguage from '../../../i18n/useLanguage';

const FeaturedCollection = ({ eyebrow, title, category, offset = 0 }) => {
  const { t, name } = useLanguage();
  const { data, loading, error, retry } = useFetch(
    () => filterByCategory(category),
    [category]
  );
  const meals = (data || [])
    .slice(offset, offset + 3)
    .map((meal) => ({ ...meal, strCategory: category }));

  return (
    <section className="container-page py-16 lg:py-20">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        link={{ to: `/meal-category/${category}`, label: t('featured.viewAll', name(category)) }}
      />
      <MealGrid
        meals={meals}
        loading={loading}
        error={error}
        onRetry={retry}
        columns={3}
        skeletonCount={3}
      />
    </section>
  );
};

export default FeaturedCollection;
