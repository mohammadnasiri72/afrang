"use client";

import { createSlice } from "@reduxjs/toolkit";
import { fetchContactUs } from "@/services/contactUsService";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const supportBoxSlice = createSlice({
  name: "supportBox",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
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

export const { setData, setLoading, setError } = supportBoxSlice.actions;

export const fetchSupportBoxData = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const data = await fetchContactUs();
    dispatch(setData(data));
  } catch (error) {
    console.error("Error fetching support box data:", error);
    dispatch(setError(error.message));
  }
};

export default supportBoxSlice.reducer; 