import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCart, getNextCart } from '@/services/cart/cartService';
import Cookies from 'js-cookie';

// ایجاد thunk برای دریافت سبد خرید
export const fetchCartData = createAsyncThunk(
  'cart/fetchCartData',
  async (cartType = 'current') => {
    const userId = JSON.parse(Cookies.get("user"))?.userId;
    const response = cartType === 'next'
      ? await getNextCart(userId)
      : await getCart(userId);
    return { items: response || [], cartType };
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    cartType: 'current',
    loading: false,
    error: null
  },
  reducers: {
    updateCart: (state, action) => {
      state.items = action.payload.items;
      state.cartType = action.payload.cartType;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.cartType = action.payload.cartType;
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.items = [];
      });
  }
});

export const { updateCart, setItems, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 