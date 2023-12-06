import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import IngredientsPage from './IngredientsPage';
import RecipePage from './RecipePage';
import WelcomePage from './WelcomePage';

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/app" element={<App />} />
      <Route path="/ingredientspage" element={<IngredientsPage />} />
      <Route path="/recipepage" element={<RecipePage />} />
    </Routes>
  );
};

export default Main;
