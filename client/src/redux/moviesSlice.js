// src/redux/moviesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async () => {
    const response = await api.get('/movies');
    return response.data;
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: [],
  reducers: {
    setMovies: (state, action) => {
      return action.payload;
    },
    updateMovie: (state, action) => {
      const index = state.findIndex(movie => movie._id === action.payload._id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteMovie: (state, action) => {
      return state.filter(movie => movie._id !== action.payload);
    },
    addMovie: (state, action) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { setMovies, updateMovie, deleteMovie, addMovie } = moviesSlice.actions;
export default moviesSlice.reducer;