"use client";

import { createSlice } from "@reduxjs/toolkit";
import { fetchMenuItems } from "@/services/menuService";

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

export const fetchMenu = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const items = await fetchMenuItems();
    dispatch(setMenuItems(items));
  } catch (error) {
    console.error("Error fetching menu items:", error);
    dispatch(setError(error.message));
  }
};

export default menuResSlice.reducer;
