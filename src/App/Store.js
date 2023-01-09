import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from '../Services/TMDB'
import genreOrCategoryReducer  from '../Features/CurrentGenreOrCategory';
import  userReducer from '../Features/auth';

export default configureStore({
    reducer: {
        [tmdbApi.reducerPath]: tmdbApi.reducer,
        currentGenreOrCategory: genreOrCategoryReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware),
})