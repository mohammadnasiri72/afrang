"use client";

import { createSlice } from "@reduxjs/toolkit";
import { fetchSettings } from "@/services/settingsService";

// Static flag to track if request has been made
let isRequested = false;

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action) => {
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

export const { setSettings, setLoading, setError } = settingsSlice.actions;

export const fetchSettingsData = () => async (dispatch) => {
  if (isRequested) return;
  isRequested = true;

  try {
    dispatch(setLoading());
    const data = await fetchSettings();
    dispatch(setSettings(data));
  } catch (error) {
    console.error('Error fetching settings:', error);
    dispatch(setError(error.message));
  }
};

export default settingsSlice.reducer; 