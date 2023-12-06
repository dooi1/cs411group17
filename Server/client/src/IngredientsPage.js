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
    // Add logic to generate a recipe based on ingredients
    navigate('/recipepage');
  };

  const containerStyle = {
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
  };

  const inputContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px', // Adjust spacing as needed
  };

  return (
    <div style={containerStyle}>
      <h1>Enter Ingredients</h1>
      <div style={inputContainerStyle}>
        <input
          type="text"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          placeholder="Type an ingredient"
        />
        <button onClick={addIngredient}>Add Ingredient</button>
      </div>
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
