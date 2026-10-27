import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import PageLoader from './components/PageLoader';
import HomePage from './pages/home/HomePage';

// Home is where most visits start, so it ships in the main bundle.
// Every other page is downloaded only when it is opened.
const RecipesPage = lazy(() => import('./pages/recipes/RecipesPage'));
const DetailRecipes = lazy(() => import('./pages/recipes/DetailRecipes'));
const CookWithIngredients = lazy(() => import('./pages/ingredients/CookWithIngredients'));
const SavedRecipes = lazy(() => import('./pages/saved/SavedRecipes'));
const ShoppingList = lazy(() => import('./pages/shopping/ShoppingList'));
const About = lazy(() => import('./pages/about/About'));
const CategoriesMeals = lazy(() => import('./pages/categories/CategoriesMeals'));
const CategoriesByArea = lazy(() => import('./pages/categories/CategoriesByArea'));
const NotFound = lazy(() => import('./pages/NotFound'));
const CookingMode = lazy(() => import('./pages/cook/CookingMode'));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/recipes"
            element={<RecipesPage />}
          />
          <Route
            path="/cook-with-ingredients"
            element={<CookWithIngredients />}
          />
          <Route
            path="/saved"
            element={<SavedRecipes />}
          />
          <Route
            path="/shopping-list"
            element={<ShoppingList />}
          />
          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/detail-recipes/:id"
            element={<DetailRecipes />}
          />
          <Route
            path="/meal-category/:category"
            element={<CategoriesMeals />}
          />
          <Route
            path="/meal-category-area/:area"
            element={<CategoriesByArea />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Route>
        <Route
          path="/cook/:id"
          element={
            <Suspense fallback={<PageLoader fullScreen />}>
              <CookingMode />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
