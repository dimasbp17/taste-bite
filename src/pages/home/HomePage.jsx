import React from 'react';
import Hero from './partials/Hero';
import Categories from './partials/Categories';
import AreaCategories from './partials/AreaCategories';
import FeaturedCollection from './partials/FeaturedCollection';
import Newsletter from './partials/Newsletter';
import IngredientPromo from './partials/IngredientPromo';
import AllMeals from './partials/AllMeal';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();
  useDocumentTitle();

  return (
    <>
      <Hero />
      <Categories />
      <FeaturedCollection
        eyebrow={t('featured.chickenEyebrow')}
        title={t('featured.chickenTitle')}
        category="Chicken"
      />
      <IngredientPromo />
      <AreaCategories />
      <FeaturedCollection
        eyebrow={t('featured.dessertEyebrow')}
        title={t('featured.dessertTitle')}
        category="Dessert"
        offset={3}
      />
      <Newsletter />
      <AllMeals />
    </>
  );
};

export default HomePage;
