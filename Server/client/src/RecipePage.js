import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecipesPage = () => {
  const navigate = useNavigate();

  // Add logic for displaying generated recipes

  const goBackToHome = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Yummy Recipes Generated</h1>
      {/* Add your generated recipes or content here */}
      <button onClick={goBackToHome}>Back to Home</button>
    </div>
  );
};

export default RecipesPage;
