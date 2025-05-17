"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openMenuRes: false,
  items: [],
  loading: false,
  error: null,
};

export const menuResSlice = createSlice({
  name: "menuRes",
  initialState,
  reducers: {
    setOpenMenuRes: (state) => {
      state.openMenuRes = !state.openMenuRes;
    },
    setMenuItems: (state, action) => {
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

export const { setOpenMenuRes, setMenuItems, setLoading, setError } = menuResSlice.actions;
export default menuResSlice.reducer;
