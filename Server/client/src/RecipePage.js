import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecipePage = () => {
  const navigate = useNavigate();

  // Add logic for displaying generated recipes

  const goBackToIngredients = () => {
    navigate('/ingredientspage');
  };

  const handleLogout = () => {
    // Add logic for handling logout, such as clearing user session
    navigate('/');
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

  const buttonContainerStyle = {
    display: 'flex',
    marginTop: '10px', // Add some margin between the buttons
  };

  return (
    <div style={containerStyle}>
      <h1>Yummy Recipes Generated</h1>
      <p>Here are your recipes and generated playlists.</p>
      {/* Add your generated recipes or content here */}
      <div style={buttonContainerStyle}>
        <button onClick={goBackToIngredients}>Make New Recipe</button>
        <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
      </div>
    </div>
  );
};

export default RecipePage;
