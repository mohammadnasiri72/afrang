import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedColorMode: null,
};

const productColorSlice = createSlice({
  name: "productColor",
  initialState,
  reducers: {
    setSelectedColorMode: (state, action) => {
      state.selectedColorMode = action.payload;
    },
    resetSelectedColorMode: (state) => {
      state.selectedColorMode = null;
    },
  },
});

export const { setSelectedColorMode, resetSelectedColorMode } = productColorSlice.actions;
export default productColorSlice.reducer; 