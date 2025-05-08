import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    openShopping: false,
};

export const ShoppingSlice = createSlice({
  name: "menuRes",
  initialState,
  reducers: {
    setOpenShopping: (state , action) => {
      state.openShopping = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setOpenShopping} =
ShoppingSlice.actions;

export default ShoppingSlice.reducer;
