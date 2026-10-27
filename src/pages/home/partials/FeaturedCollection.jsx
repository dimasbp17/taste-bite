import React from 'react';
import { filterByCategory } from '../../../lib/api';
import useFetch from '../../../hooks/useFetch';
import SectionHeader from '../../../components/SectionHeader';
import MealGrid from '../../../components/MealGrid';
import { useTranslation } from 'react-i18next';
import useName from '../../../i18n/useName';

const FeaturedCollection = ({ eyebrow, title, category, offset = 0 }) => {
  const { t } = useTranslation();
  const name = useName();
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
        link={{
          to: `/meal-category/${category}`,
          label: t('featured.viewAll', { category: name(category).toLowerCase() }),
        }}
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
