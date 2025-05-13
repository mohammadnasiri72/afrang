import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderNumber: null,
  orderData: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderData: (state, action) => {
      state.orderNumber = action.payload.orderNumber;
      state.orderData = action.payload;
    },
    clearOrderData: (state) => {
      state.orderNumber = null;
      state.orderData = null;
    },
  },
});

export const { setOrderData, clearOrderData } = orderSlice.actions;

export default orderSlice.reducer; 