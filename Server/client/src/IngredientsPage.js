import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IngredientsPage = () => {
  const navigate = useNavigate();
  const [ingredient, setIngredient] = useState('');
  const [ingredientList, setIngredientList] = useState([]);

  const addIngredient = () => {
    if (ingredient.trim() !== '') {
      setIngredientList([...ingredientList, ingredient.trim()]);
      setIngredient('');
    }
  };

  const generateRecipe = () => {
    // Add logic to generate recipe based on ingredients
    navigate('/recipespage');
  };

  return (
    <div>
      <h1>Enter Ingredients</h1>
      <input
        type="text"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        placeholder="Type an ingredient"
      />
      <button onClick={addIngredient}>Add Ingredient</button>
      <ul>
        {ingredientList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={generateRecipe}>Generate Recipe</button>
    </div>
  );
};

export default IngredientsPage;
