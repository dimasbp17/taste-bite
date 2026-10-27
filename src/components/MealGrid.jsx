import React from 'react';
import MealCard, { MealCardSkeleton } from './MealCard';
import StatusMessage from './StatusMessage';
import useLanguage from '../i18n/useLanguage';

const columnClasses = {
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 lg:grid-cols-4',
};

const MealGrid = ({
  meals = [],
  loading,
  error,
  onRetry,
  columns = 4,
  skeletonCount = 8,
  emptyMessage,
}) => {
  const { t } = useLanguage();

  if (error) {
    return (
      <StatusMessage
        title={t('grid.errorTitle')}
        message={t('grid.errorMessage')}
        onRetry={onRetry}
      />
    );
  }

  if (!loading && meals.length === 0) {
    return <StatusMessage title={emptyMessage || t('grid.empty')} />;
  }

  return (
    <div className={`grid gap-x-5 gap-y-8 ${columnClasses[columns]}`}>
      {loading
        ? Array.from({ length: skeletonCount }, (_, i) => (
            <MealCardSkeleton key={i} />
          ))
        : meals.map((meal) => (
            <MealCard
              key={meal.idMeal}
              meal={meal}
              size={columns === 3 ? 'lg' : 'md'}
            />
          ))}
    </div>
  );
};

export default MealGrid;
