import React from 'react'
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Movies from './Pages/Movies/Movies';
import Actors from './Pages/Actors/Actors';
import Movie from './Pages/MovieInforrmation/Movie';
import Profile from './Pages/Profile/Profile';
import Navbar from './Navbar/Navbar';
import useStyles from './Styles'

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar/>
      <main className={classes.content}>
      <div className={classes.toolbar}/>
      <Routes>
        <Route exact path='/' element={<Movies/>} />
        <Route path='/actors/:id' element={<Actors />} />
        <Route path='/movie/:id' element={<Movie />} />
        <Route path='/Profile/:id' element={<Profile />} />
      </Routes>
      </main>
    </div>
  )
}

export default App

