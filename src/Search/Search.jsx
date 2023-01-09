import React, {useState, useEffect} from 'react';
import {TextField, InputAdornment} from '@mui/material';
import {Search as SearchIcon} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useStyles from './Styles'
import { searchMovie } from '../Features/CurrentGenreOrCategory';

const Search = () => {
  const dispatch = useDispatch();
  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      dispatch(searchMovie(query));
    }
  }
  const [query, setQuery] = useState('');
   
    const classes = useStyles();
  return (
    <div className={classes.searchContainer}>
      <TextField 
       onKeyPress={handleKeyPress}
       value={query}
       onChange={(e) => setQuery(e.target.value)}
       variant="standard"
       InputProps={{
        className: classes.input,
        startAdornment: (
            <InputAdornment position='start'>
            <SearchIcon/>
            </InputAdornment>
        )
       }}
      />
    </div>
  )
}

export default Search
