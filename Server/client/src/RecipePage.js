import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { brown } from '@mui/material/colors';

const customImage = '/photo.png';
const imageUrl = "/chilldinner.jpeg";
const imageUrl2 = "/dinnerwithfriends.jpeg"
const imageUrl3 = "/jazzyromance.webp"
const imageUrl4 = "/classical.jpeg"
const Playlists = {
  Dinner: [
    {
      imageUrl: imageUrl ,// Replace with actual Spotify playlist image URL
      link: "https://open.spotify.com/playlist/37i9dQZF1DX4xuWVBs4FgJ?si=ef1ca2887f7b4e25"
    },
    {
      imageUrl: imageUrl2,
      link: "https://open.spotify.com/playlist/37i9dQZF1DXb83YJL7gTWj?si=38c139b8e3c84e72"
    }
  ],
  Romance: [
    {
      imageUrl: imageUrl3,
      link: "https://open.spotify.com/playlist/37i9dQZF1DWTbzY5gOVvKd?si=c497261654a24821"
    },
    {
      imageUrl: imageUrl4,
      link: "https://open.spotify.com/playlist/37i9dQZF1DX4s3V2rTswzO?si=7690c75112d54f82"
    }
    // ... add Romance playlists
  ],
  Casual: [
    // ... add Casual playlists
  ]
};

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
    display: 'flex',       
    flexWrap: 'wrap',      
    justifyContent: 'center',
    marginTop: '20px',     
  },
  playlistItem: {
    margin: '10px',
    padding: '10px',
    maxWidth: '200px',
    minWidth: '150px', // Prevents the item from becoming too narrow
    textAlign: 'center',
    height: '300px', // Example fixed height, adjust as needed
  },
  playlistImage: {
    width: '100%',  // Ensures the image doesn't exceed its container
    height: 'auto', // Keeps the image aspect ratio
    objectFit: 'cover', // Adjust how the image fits (cover, contain, etc.)
  }

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
  

  /*const fetchPlaylists =  async () => {
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
    
  } */
  const fetchPlaylists = () => {
    // Setting playlists based on the selected category
    if (selectedCategory) {
      setPlaylists(Playlists[selectedCategory] || []);
    }
  };

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
    <div key={index} style={styles.playlistItem}>
      <a href={playlist.link} target="_blank" rel="noopener noreferrer">
        <img src={playlist.imageUrl} alt="Playlist" style={styles.playlistImage} />
      </a>
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
