// WelcomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { brown } from '@mui/material/colors';

// Background image
const customImage = '/homepage.png';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(brown[500]),
  backgroundColor: brown[500],
  '&:hover': {
    backgroundColor: brown[700],
  },
}));

const styles = {
  body: {
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: `url(${customImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust opacity here
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
  welcomePage: {
    textAlign: 'center',
  },
  title: {
    fontSize: '3em', // Adjust the font size as needed
    marginBottom: '10px', // Add spacing
  },
  description: {
    fontSize: '1.5em', // Adjust the font size as needed
    marginBottom: '20px', // Add spacing
  },
};

const WelcomePage = () => {
  return (
    <div style={styles.body}>
      <div style={styles.overlay}>
        <div style={styles.welcomePage}>
          <h1 style={styles.title}>Meal + Music</h1>
          <p style={styles.description}>
            Discover delicious recipes paired with great music!
          </p>
          <Link to="/ingredientspage">
            <ColorButton variant="contained">Get Started</ColorButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
