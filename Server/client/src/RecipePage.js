import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const RecipePage = () => {
  const [ingredient, setIngredient] = useState('');
  const [ingredientList, setIngredientList] = useState([]);
  const history = useHistory();

  const handleInputChange = (e) => {
    setIngredient(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter' && ingredient.trim() !== '') {
      setIngredientList([...ingredientList, ingredient.trim()]);
      setIngredient('');
    }
  };

  const handleGenerateRecipe = () => {
    // Navigate to another page (you can replace '/recipe' with your desired route)
    history.push('/recipe');
  };

  return (
    <div>
      <h1>Recipe Page</h1>
      <div>
        <input
          type="text"
          placeholder="Enter ingredient"
          value={ingredient}
          onChange={handleInputChange}
          onKeyPress={handleEnter}
        />
        <button onClick={handleGenerateRecipe}>Generate Recipe</button>
      </div>
      <div>
        <h2>Ingredient List:</h2>
        <ul>
          {ingredientList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipePage;
