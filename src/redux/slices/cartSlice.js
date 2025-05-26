import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCart, getNextCart } from '@/services/cart/cartService';
import Cookies from 'js-cookie';
import { getUserId } from "@/utils/cookieUtils";

// ایجاد thunk برای دریافت سبد خرید
export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (_, { rejectWithValue }) => {
    try {
      const userId = getUserId();
      if (!userId) return rejectWithValue("No user ID found");
      const response = await getCart(userId);
      return { items: response || [], cartType: 'current' };
    } catch (error) {
      return rejectWithValue(error.message);
    }
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
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.cartType = action.payload.cartType;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.items = [];
      });
  }
});

export const { updateCart, setItems, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 