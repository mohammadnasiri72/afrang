import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCart, getNextCart } from '@/services/cart/cartService';
import Cookies from 'js-cookie';

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (cartType = 'current', { rejectWithValue }) => {
    try {
      const userId = JSON.parse(Cookies.get("user"))?.userId;
      const response = cartType === 'next' 
        ? await getNextCart(userId)
        : await getCart(userId);
      return { data: response, cartType };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    cartType: 'current'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.data;
        state.cartType = action.payload.cartType;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer; 