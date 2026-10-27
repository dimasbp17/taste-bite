import React from 'react';
import Hero from './partials/Hero';
import Categories from './partials/Categories';
import AreaCategories from './partials/AreaCategories';
import FeaturedCollection from './partials/FeaturedCollection';
import Newsletter from './partials/Newsletter';
import IngredientPromo from './partials/IngredientPromo';
import AllMeals from './partials/AllMeal';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const HomePage = () => {
  useDocumentTitle();

  return (
    <>
      <Hero />
      <Categories />
      <FeaturedCollection
        eyebrow="Weeknight favourites"
        title="Comforting chicken dishes"
        category="Chicken"
      />
      <IngredientPromo />
      <AreaCategories />
      <FeaturedCollection
        eyebrow="Something sweet"
        title="Desserts worth saving room for"
        category="Dessert"
        offset={3}
      />
      <Newsletter />
      <AllMeals />
    </>
  );
};

export default HomePage;
