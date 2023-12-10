// WelcomePage.jsx
import React, { useState, useEffect } from 'react';
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
  const [spotifyUrl, setSpotifyUrl] = useState('');

  useEffect(() => {
    const fetchLoginUrl = async () => {
      try {
        const response = await fetch('http://localhost:5000/login');
        if (response.ok) {
          const data = await response.json(); // Parse response as JSON
          setSpotifyUrl(data.auth_url); // Assuming the backend sends JSON with { auth_url: "..." }
        }
        
      } catch  (error) {
        console.error('Error fetching Spotify login URL:', error);
      }
    };

    fetchLoginUrl();
  }, []);  

  const handleGetStartedClick = () => {
    if (spotifyUrl) {
      window.location.href = spotifyUrl;
    }else {
      console.error("Spotify URL not set");
    }
  };
    return (
    <div style={styles.body}>
      <div style={styles.overlay}>
        <div style={styles.welcomePage}>
          <h1 style={styles.title}>Meal + Music</h1>
          <p style={styles.description}>
            Discover delicious recipes paired with great music!
          </p>
          <ColorButton onClick={handleGetStartedClick} variant="contained">
            Get Started
          </ColorButton>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
