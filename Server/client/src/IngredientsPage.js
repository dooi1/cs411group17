import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { brown } from '@mui/material/colors';

const customImage = '/ingredients.png';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(brown[500]),
  backgroundColor: brown[500],
  '&:hover': {
    backgroundColor: brown[700],
  },
}));

const GenerateRecipeButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(brown[500]),
  backgroundColor: brown[500],
  '&:hover': {
    backgroundColor: brown[700],
  },
}));

const styles = {
  container: {
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundImage: `url(${customImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  enterIngredients: {
    color: 'white',
    fontSize: '24px',
    marginBottom: '10px',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  input: {
    flex: '1',
    width: 'calc(100% - 8px)',
    marginRight: '5px',
    height: '40px',
    fontSize: '16px',
  },
  listItem: {
    color: 'white',
    fontSize: '18px',
    margin: '5px 0',
  },
};

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

  return (
    <div style={styles.container}>
      <h1 style={styles.enterIngredients}>Enter Ingredients</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          placeholder="Type an ingredient"
          style={styles.input}
        />
        <ColorButton
          variant="contained"
          style={styles.input}
          onClick={addIngredient}
        >
          Add Ingredient
        </ColorButton>
      </div>
      <ul>
        {ingredientList.map((item, index) => (
          <li key={index} style={styles.listItem}>{item}</li>
        ))}
      </ul>
      <GenerateRecipeButton
        variant="contained"
        onClick={generateRecipe}
      >
        Generate Recipe
      </GenerateRecipeButton>
    </div>
  );
};

export default IngredientsPage;
