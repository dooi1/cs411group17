import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div>
      <h1>Hi, Welcome to Meal + Music</h1>
      <p>Discover delicious recipes paired with great music!</p>
      <Link to="/ingredientspage">
        <button>Get Started</button>
      </Link>
    </div>
  );
};

export default WelcomePage;
