import { createSlice } from '@reduxjs/toolkit';



const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    currentItems: [],
    nextItems: [],
    cartType: 'current',
   
  },
  reducers: {
    setCurrentItems: (state, action) => {
      state.currentItems = action.payload;
    },
    setNextItems: (state, action) => {
      state.nextItems = action.payload;
    },
     setCartType: (state, action) => {
      state.cartType = action.payload;
    },
  },
 
});

export const { setCurrentItems, setNextItems , setCartType} = cartSlice.actions;
export default cartSlice.reducer; 