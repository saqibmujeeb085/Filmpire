import React, {useState, useEffect} from 'react';
import {Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, Rating} from '@mui/material';
import {Movie as MoviesIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack} from '@mui/icons-material';
import {Link, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useGetMovieQuery, useGetRecommendationsQuery } from '../../../Services/TMDB';
import useStyles from './Styles';
import genreIcons from './../../../img/genres';
import { selectGenreOrCategory } from '../../../Features/CurrentGenreOrCategory';
import MovieList from '../../MovieList/MovieList';
import {userSelector} from '../../../Features/auth';
import { useGetMoviesListOfUserQuery } from '../../../Services/TMDB';

const Movie = () => {
  const { id } = useParams();
  const { user } = useSelector(userSelector);
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const {data, isFetching, error} = useGetMovieQuery(id);
  const {data: recommendations} = useGetRecommendationsQuery({list: '/recommendations', movie_id: id});
  
  
  const [isMovieFavorited, setIsmovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);
  const {data: favoriteMovies} = useGetMoviesListOfUserQuery({listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1});
  const {data: watchlistMovies} = useGetMoviesListOfUserQuery({listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1});
  
  useEffect(() => {
  setIsmovieFavorited(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id));
}, [favoriteMovies, data]);

useEffect(() => {
  setIsMovieWatchlisted(!!watchlistMovies?.results?.find((movie) => movie?.id === data?.id));
}, [watchlistMovies, data]);

const addToFavorites = async () => {
  await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
    media_type: 'movie',
    media_id: id,
    favorite: !isMovieFavorited,
  });
  setIsmovieFavorited((prev) => !prev)  
};

const addToWatchlist = async () => {
  await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
    media_type: 'movie',
    media_id: id,
    watchlist: !isMovieWatchlisted,
  });
  setIsMovieWatchlisted((prev) => !prev)
  };
  
  const [open, setOpen] = useState(false);

  if (isFetching){
    <Box display='flex' justifyContent='center' alignItems='center'>
      <CircularProgress size='8rem' />
    </Box>
  };

  if (error){
    <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' gap='10px'>
      <Typography variant='h4'>Something Is Wrong Kindly</Typography>
      <Link to='/'>GO BACK</Link>
    </Box>
  };

  return (
    <Grid container className={classes.ContainerSpaceArround}>
      <Grid item sm={12} lg={4}>
        <img 
        className={classes.poster}
        src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
        alt={data?.title}
        />
      </Grid>
      <Grid item container direction='column' lg={7}>
       <Typography variant='h3' align='center' gutterBottom>
          {data?.title} ({data?.release_date.split('-')[0]})
        </Typography>
        <Typography variant='h5' align='center' gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.ContainerSpaceArround}>
         <Box display='flex' item='center'>
           <Rating readOnly value={data?.vote_average /2}/>
           <Typography variant='subtitle1' gutterBottom style={{marginLeft: '10px'}}>
             {data?.vote_average} /10
           </Typography>
         </Box>
           <Typography variant='h6' align='center' gutterBottom>
            {data?.runtime}min {data?.spoken_languages.length > 0 ?  `/ ${data?.spoken_languages[0].name}` : ''}
           </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre) => (
            <Link key={genre.name} className={classes.links} to='/' onClick={()=>dispatch(selectGenreOrCategory(genre.id))}>
               <img src={genreIcons[genre.name.toLowerCase()]} alt={genre.name} className={classes.genreImage} height={25} />
               <Typography color='textPrimary' variant="subtitle1">
                {genre?.name}
               </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant='h5' gutterBottom style={{maginTop: '10px'}}>
          Overview
          <Typography style={{marginBottom: '2rem'}}>
            {data?.overview}
          </Typography>
        </Typography>
        <Typography variant="h5" gutterBottom> Top Cast</Typography>
         <Grid item container spacing={2}>
          {data && data?.credits.cast.map((character, i)=> (
            character.profile_path && 
            <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{textDecoration: 'none'}}>
              <img className={classes.castImage} src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name}/>
              
              <Typography color='textPrimary' style={{textAlign: 'center'}}>
                {character.name}
              </Typography>
              <Typography color="textSecondary" style={{textAlign: 'center'}}>
                {character.character.split('/')[0]}
              </Typography>
            </Grid>
          )).slice(0, 6)}
         </Grid>
         <Grid item container style={{marginTop: '2rem'}}>
          <div className={classes.buttonContainer}>
            <Grid item xs={12} sm={6} >
               <ButtonGroup size='small' variant='outlined'>
                <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>
                Website
                </Button> 
                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MoviesIcon />}>
                IMDB
                </Button> 
                <Button onClick={() => setOpen(true)} href='#' endIcon={<Theaters/>}>
                Trailer
                </Button> 
               </ButtonGroup>
            </Grid>

            <Grid item xs={12} sm={6}>
               <ButtonGroup size='small' variant='outlined'>
               <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteBorderOutlined/> : <Favorite/>}>
                {isMovieFavorited ? 'unfavorite' : 'Favorite'}
               </Button>
               <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove/> : <PlusOne/>}>
                Watchlist
               </Button>
               <Button endIcon={<ArrowBack/>} xs={{borderColor: 'primary.main'}}>
                <Typography component={Link} to="/" color='inherit' variant='subtitle2' style={{textDecoration: 'none'}}>
                  Back
                </Typography>
               </Button>
               </ButtonGroup>
            </Grid>
          </div>
         </Grid>
      </Grid>
      <Box marginTop='5rem' width='100%'>
        <Typography variant='h3' gutterBottom align="center">
          You May Also Like
        </Typography>
        {/* loop through the recommended movies... */}
        {recommendations
        ? <MovieList movies={recommendations} numberOfMovies={12}/>
        : <Box>Sorry, Nothing Was Fined</Box>
        }
      </Box> 
      <Modal 
      closeAfterTransition 
      className={classes.modal} 
      open={open} 
      onClose={() => setOpen(false)}
      >
        <>
        {data?.videos?.results?.length > 0 && (
          <iframe
          autoPlay
          className={classes.videos}
          frameBorder="0"
          title='Trailer'
          src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
          allow='autoplay'
          />
          )}
          </>
        
      </Modal>
     
    </Grid>
  )
}

export default Movie;
