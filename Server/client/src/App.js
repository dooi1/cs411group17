import React, { useState } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState([]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    // For simplicity, this example just sets the result to an array containing the entered ingredients
    setResult(searchTerm.split(',').map(ingredient => ingredient.trim()));
  };

  return (
    <div className="App">
      <h1>Enter your ingredients below</h1>
      <div>
        <input
          type="text"
          placeholder="Enter ingredients (comma separated)"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <h2>Results:</h2>
        <ul>
          {result.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
