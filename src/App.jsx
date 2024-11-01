import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import DetailRecipes from './pages/recipes/DetailRecipes';

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
            path="/detail-recipes"
            element={<DetailRecipes />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
