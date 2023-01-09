import React, { useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/styles";
import useStyles from "./styles";
import Black from "./../../img/Black.png";
import White from "./../../img/White.png";
import { useGetGenresQuery } from "../../Services/TMDB";
import { useDispatch, useSelector } from "react-redux";
import { genreOrCategory, selectGenreOrCategory } from "../../Features/CurrentGenreOrCategory";



const Cate2 = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];


const Sidebar = ({ setMobileOpen }) => {
  const {genreIdOrCategoryName} = useSelector((state) => state.currentGenreOrCategory );
  const theme = useTheme();
  const classes = useStyles();
  const {data, isFetching} = useGetGenresQuery();
  const dispatch = useDispatch();
  return (
    <>
      <Link to='/' className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? Black : White}
          alt="Filmpire Logo"
        />
      </Link>
      <List>
      <Divider />
      <ListSubheader>Categories</ListSubheader>
      <Divider />
      {Cate2.map(({label, value}) => (
        <Link key={value} className={classes.links} to='/'>
          <ListItem onClick={()=>dispatch(selectGenreOrCategory(value))} button>
            {/* <ListItemIcon>
              
            </ListItemIcon> */}
            <ListItemText primary={label} />
          </ListItem>  
        </Link>
      ))}
      </List>
      <List>
      <Divider />
      <ListSubheader>Genres</ListSubheader>
      <Divider />
      {isFetching ? (
        <Box display="flex" justifyContent="center">
        <CircularProgress />
        </Box>
      ) :
      data.genres.map(({name, id}) => (
        <Link key={name} className={classes.links} to='/'>
          <ListItem onClick={()=>dispatch(selectGenreOrCategory(id))} button>
            {/* <ListItemIcon>
              
            </ListItemIcon> */}
            <ListItemText primary={name} />
          </ListItem>  
        </Link>
      ))}
      </List>
    </>
  );
};

export default Sidebar;
