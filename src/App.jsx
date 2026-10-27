import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/home/HomePage';
import RecipesPage from './pages/recipes/RecipesPage';
import DetailRecipes from './pages/recipes/DetailRecipes';
import CookWithIngredients from './pages/ingredients/CookWithIngredients';
import SavedRecipes from './pages/saved/SavedRecipes';
import About from './pages/about/About';
import CategoriesMeals from './pages/categories/CategoriesMeals';
import CategoriesByArea from './pages/categories/CategoriesByArea';
import NotFound from './pages/NotFound';
import CookingMode from './pages/cook/CookingMode';

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
          element={<CookingMode />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
