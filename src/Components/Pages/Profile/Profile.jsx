import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../Features/auth';
import {
  Typography,
  Button,
  Box
} from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useGetMoviesListOfUserQuery } from '../../../Services/TMDB';
import Ratedcards from '../../RatedCards/Ratedcards';

const Profile = () => {

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  const {user} = useSelector(userSelector);

  const {data: favoriteMovies, refetch: refetchFavorite} = useGetMoviesListOfUserQuery({listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1});
  const {data: watchlistMovies, refetch: refetchWatchlisted } = useGetMoviesListOfUserQuery({listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1});
  
  useEffect(() => {
    refetchWatchlisted();
    refetchFavorite();
  }, [])
  

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5" gutterBottom> My Profile</Typography>
        <Button color='inherit' onClick={logout}>
          LogOut &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length  && !watchlistMovies?.results?.length ?
      <Typography variant="h">Add favrites or watchlist some movies to see them here!</Typography>
      :
      <Box>
        <Ratedcards title="Favorite Movies" data={favoriteMovies}/>
        <Ratedcards title="Watchlist Movies" data={watchlistMovies}/>
      </Box>
      }
    </Box>
  )
}

export default Profile; 
