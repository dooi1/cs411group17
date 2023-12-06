// WelcomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

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
        <h1>Hi, Welcome to Meal + Music</h1>
        <p>Discover delicious recipes paired with great music!</p>
        <Link to="/ingredientspage">
          <button>Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
