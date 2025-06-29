import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  compareItems: [],
  maxItems: 4
};

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addToCompare: (state, action) => {
      const product = action.payload;
      const existingIndex = state.compareItems.findIndex(item => item.id === product.id);
      
      if (existingIndex === -1) {
        if (state.compareItems.length < state.maxItems) {
          state.compareItems.push(product);
        }
      }
    },
    removeFromCompare: (state, action) => {
      const productId = action.payload;
      state.compareItems = state.compareItems.filter(item => item.id !== productId);
    },
    clearCompare: (state) => {
      state.compareItems = [];
    }
  }
});

export const { addToCompare, removeFromCompare, clearCompare } = compareSlice.actions;
export default compareSlice.reducer; 