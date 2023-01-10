import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../Features/auth';
import {
  Typography,
  Button,
  Box
} from '@mui/material';
import { ExitToApp } from '@mui/icons-material';


const Profile = () => {
  const favoriteMovies = [];
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  const {user} = useSelector(userSelector);
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5" gutterBottom> My Profile</Typography>
        <Button color='inherit' onClick={logout}>
          LogOut &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies.length ? <Typography variant="h">Add favrites or watchlist some movies to see them here!</Typography>
      :
      <Box>
        Favorite Movies
      </Box>
      }
    </Box>
  )
}

export default Profile
