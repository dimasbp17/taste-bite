import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import DetailRecipes from './pages/recipes/DetailRecipes';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import About from './pages/about/About';
import CategoriesMeals from './pages/categories/CategoriesMeals';
import CategoriesByArea from './pages/categories/CategoriesByArea';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/register"
            element={<Register />}
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
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
