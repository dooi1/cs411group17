import React from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/ingredientspage');
  };

  return (
    <div>
      <h1>Hi! Welcome to Meal + Music</h1>
      <button onClick={handleGetStartedClick}>Get Started</button>
    </div>
  );
}

export default App;
