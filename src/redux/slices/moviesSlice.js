import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "c0352483";
const BASE_URL = "https://www.omdbapi.com/";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async (query) => {
  const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
  return response.data.Search;
});

export const fetchMoviesByGenre = createAsyncThunk("movies/fetchMoviesByGenre", async (genre) => {
  const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=${genre}`);
  return { genre, movies: response.data.Search };
});

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    moviesByGenre: {},
    watchLater: [],
    likedMovies: [],
    searchedMovie: null, // New state for the searched movie
  },
  reducers: {
    addToWatchLater: (state, action) => {
      if (!state.watchLater.some((movie) => movie.imdbID === action.payload.imdbID)) {
        state.watchLater.push(action.payload);
      }
    },
    addToLikedMovies: (state, action) => {
      if (!state.likedMovies.some((movie) => movie.imdbID === action.payload.imdbID)) {
        state.likedMovies.push(action.payload);
      }
    },
    setSearchedMovie: (state, action) => {
      state.searchedMovie = action.payload; // Set the searched movie details
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      })
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        state.moviesByGenre[action.payload.genre] = action.payload.movies;
      });
  },
});

export const { addToWatchLater, addToLikedMovies, setSearchedMovie } = movieSlice.actions;
export default movieSlice.reducer;
