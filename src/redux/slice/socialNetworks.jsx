"use client";

import { createSlice } from "@reduxjs/toolkit";
import { fetchSocialNetworks } from "@/services/socialNetworksService";

// Static flag to track if request has been made
let isRequested = false;

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const socialNetworksSlice = createSlice({
  name: "socialNetworks",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setItems, setLoading, setError } = socialNetworksSlice.actions;

export const fetchSocialNetworksData = () => async (dispatch) => {
  if (isRequested) return;
  isRequested = true;

  try {
    dispatch(setLoading());
    const items = await fetchSocialNetworks();
    dispatch(setItems(items));
  } catch (error) {
    console.error("Error fetching social networks:", error);
    dispatch(setError(error.message));
  }
};

export default socialNetworksSlice.reducer;
