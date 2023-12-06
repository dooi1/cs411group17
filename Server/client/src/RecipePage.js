import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { brown } from '@mui/material/colors';

const customImage = '/photo.png';

const ColorButton = styled(Button)(({ theme }) => ({
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
    opacity: 0.8,  // Set the opacity value (0 to 1) as needed
  },
  buttonContainer: {
    display: 'flex',
    marginTop: '10px',
  },
  button: {
    marginLeft: '10px',
  },
};

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

  return (
    <div style={styles.container}>
      <h1>Select A Recipe To Get Playlist</h1>
      {/* Add your generated recipes or content here */}
      <div style={styles.buttonContainer}>
        <ColorButton
          variant="contained"
          onClick={goBackToIngredients}
          style={styles.button}
        >
          Make New Recipe
        </ColorButton>
        <ColorButton
          variant="contained"
          onClick={handleLogout}
          style={styles.button}
        >
          Logout
        </ColorButton>
      </div>
    </div>
  );
};

export default RecipePage;
