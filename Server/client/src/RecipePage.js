import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  recipesContainer: {
    display: 'flex',       // Enables Flexbox
    flexWrap: 'wrap',      // Allows items to wrap to the next line
    justifyContent: 'center', // Centers items horizontally
  },
  recipeContainer: {
    margin: '10px',
    padding: '10px',
    maxWidth: '200px',
    textAlign: 'center', // Center text and images inside each recipe container
  },
  recipeImage: {
    maxWidth: '100%',    // Makes image responsive within the container
    height: 'auto',
  },
  playlistsContainer: {
    display: 'flex',       // Enables Flexbox
    flexWrap: 'wrap',      // Allows items to wrap to the next line
    justifyContent: 'center', // Centers items horizontally
    marginTop: '20px',     // Adds space above the playlist container
  },
  playlistItem: {
    margin: '10px',
    padding: '10px',
    maxWidth: '200px',
    textAlign: 'center', // Center text and images inside each playlist item
  },
};

const RecipePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const recipes = location.state?.recipes || [];
  const [selectedCategory, setSelectedCategory] = useState('');
  const [playlists, setPlaylists] = useState([]);

  const handleCategoryChange = (e) =>{
    const category = e.target.value;

    console.log("Selected category:", category);
    setSelectedCategory(category);

  }


  const fetchPlaylists =  async () => {
    if (selectedCategory){
      console.log(`Request URL: http://127.0.0.1:5000/getPlaylists?category=${selectedCategory}`);  // Log the request URL
      const response = await fetch(`http://127.0.0.1:5000/getPlaylists?category=${selectedCategory}`);
      console.log(response);
      if (response.ok){
        console.log("Received data:", data);  // Log the received data

        const data = await response.json();
        setPlaylists(data);
      }else{
        console.log('Error Fetching Playlist')
      }
    }
    
  }

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
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Select a Category</option>
        <option value="Dinner">Dinner</option>
        <option value="category2">Romance</option>
        <option value="category3">Casual</option>
      </select>
      {/* Add your generated recipes or content here */} 
        <div style={styles.recipesContainer}>
          {recipes.map((recipe, index) => (
           <div key={index} style={styles.recipeContainer}>
              <img src={recipe.image} alt={recipe.title} style={styles.recipeImage} />
              <p>{recipe.title}</p>
            </div>
          ))}
      </div>

      {/* Render playlists */}
      <div style={styles.playlistsContainer}>
                {playlists.map((playlist, index) => (
                    <div key={index}>
                        {/* Render playlist details */}
                        <p>{playlist.name}</p>
                        {/* More details */}
                    </div>
                ))}
            </div>
      <div style={styles.buttonContainer}>
      <ColorButton variant="contained" onClick={fetchPlaylists} style={styles.button}>
        Generate Playlist
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
