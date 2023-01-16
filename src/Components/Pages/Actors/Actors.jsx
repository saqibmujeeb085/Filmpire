import React, { useState } from 'react';
import {Box, Button, CircularProgress, Grid, Typography} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import {ArrowBack} from '@mui/icons-material';
import { useGetActorsDetailsQuery, useGetMoviesByActorQuery } from '../../../Services/TMDB';
import { ClassNames } from '@emotion/react';
import useStyles from './Styles';
import MovieList from '../../MovieList/MovieList'
import Pagination from '../../Pagination/Pagination';

const Actors = () => {
  const classes = useStyles();
  const {id} = useParams();
  const {data, isFetching, error} = useGetActorsDetailsQuery(id);
  const history = useNavigate();
  const [page, setPage] = useState(1);
  const{data: movies} = useGetMoviesByActorQuery({id, page});
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  };

  if (error){
    <Box display="flex" justifyContent="center" alignItems='center'>
      <Button color='primary' startIcon={<ArrowBack/>} onClick={()=>history.goBack()}>
        alt={data.name}
        Go Back
      </Button> 
    </Box>
  }
  return (
    <>
    <Grid container spacing={3}>
      <Grid item lg={5} xl={4}>
        <img 
        className={classes.image}
        src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
        />
      </Grid>
      <Grid item lg={7} xl={8} styles={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
        <Typography variant='h2' gutterBottom>
          {data?.name}
        </Typography>
        <Typography variant='h5' gutterBottom>
          Born: {new Date(data?.birthday).toDateString()}
        </Typography>
        <Typography variant={'body2'} align='justify' paragraph>
          {data?.biography || 'sorry, No Biograpy Yeath'}
        </Typography>
          <Box marginTop='2rem' display='flex' justifyContent='space-around'>
            <Button variant="contained" color='primary' target='_blank' href={`https://www.imdb.com/name/${data?.imdb_id}`}>IMDB</Button>
            <Button startIcon={<ArrowBack/>} onClick={() => history.goback()} color='primary'> GO BACK</Button>
          </Box>
      </Grid>
    </Grid>
    <Box margin='2rem 0'>
      <Typography variant='h2' gutterBottom align='center'>
        Movies Done By Actor 
      </Typography>
       {movies && <MovieList movies={movies} numberOfMovies={12}/> }
       <Pagination currentPage={page} setPage={setPage} totalPages={movies?.total_pages}/>
    </Box>
    </>
  )
}

export default Actors;
