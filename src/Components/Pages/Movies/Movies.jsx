import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typograpy,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectGenreOrCategory } from "../../../Features/CurrentGenreOrCategory";
import { useGetMoviesQuery, searchQuery } from "../../../Services/TMDB";
import MovieList from "../../MovieList/MovieList";

const Movies = () => {
  const { page, setPage } = useState(1);
  const {genreIdOrCategoryName, searchQuery} = useSelector((state) => state.currentGenreOrCategory );
  const { data, isFetching, error } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });
  
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }
  
  
  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No Movies That Match That Name.
          <br />
          Please Search For Something else.
        </Typography>
      </Box>
    );
  }
  
  if (error) return "An Error Has Occured";


  return (
    <>
      <MovieList movies={data} />
    </>
  );
};

export default Movies;
