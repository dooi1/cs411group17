// WelcomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { brown } from '@mui/material/colors';

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
  },
  welcomePage: {
    textAlign: 'center',
  },
};

const WelcomePage = () => {
  return (
    <div style={styles.body}>
      <div style={styles.welcomePage}>
        <h1>Meal + Music</h1>
        <p>Discover delicious recipes paired with great music!</p>
        <Link to="/ingredientspage">
          <ColorButton variant="contained">Get Started</ColorButton>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
