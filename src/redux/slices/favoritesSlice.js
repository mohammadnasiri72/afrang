import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
  loading: false,
  error: null
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(item => item.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearFavorites: (state) => {
      state.favorites = [];
      state.loading = false;
      state.error = null;
    }
  }
});

export const {
  setFavorites,
  addToFavorites,
  removeFromFavorites,
  setLoading,
  setError,
  clearFavorites
} = favoritesSlice.actions;

export default favoritesSlice.reducer; 