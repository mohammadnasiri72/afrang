import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  estimateData: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setEstimateData: (state, action) => {
      state.estimateData = action.payload;
    },
    clearEstimateData: (state) => {
      state.estimateData = null;
    },
  },
});

// Export actions
export const { setEstimateData, clearEstimateData } = paymentSlice.actions;

// Export selectors
export const selectEstimateData = (state) => state.payment.estimateData;

// Export reducer
export default paymentSlice.reducer; 