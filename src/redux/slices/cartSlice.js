import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserId } from "@/utils/cookieUtils";
import { getCart, getNextCart } from '@/services/cart/CartServices';
import Cookies from 'js-cookie';

// اکشن برای دریافت سبد خرید فعلی
export const fetchCurrentCart = createAsyncThunk(
  'cart/fetchCurrentCart',
  async (_, { rejectWithValue }) => {
    try {
      const userCookie = Cookies.get('user');
     
      const userId =  JSON.parse(userCookie)?.userId
     
      
      if (!userId) return rejectWithValue("No user ID found");
      const response = await getCart(userId);
      return response || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// اکشن برای دریافت سبد خرید بعدی
export const fetchNextCart = createAsyncThunk(
  'cart/fetchNextCart',
  async (_, { rejectWithValue }) => {
    try {
      const userId = getUserId();
      if (!userId) return rejectWithValue("No user ID found");
      const response = await getNextCart(userId);
      return response || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// اکشن برای دریافت هر دو سبد خرید
export const fetchCartData = createAsyncThunk(
  'cart/fetchCartData',
  async (_, { dispatch }) => {
    await Promise.all([
      dispatch(fetchCurrentCart()),
      dispatch(fetchNextCart())
    ]);
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    currentItems: [],
    nextItems: [],
    cartType: 'current',
    loading: true,
    error: null
  },
  reducers: {
    setCartType: (state, action) => {
      state.cartType = action.payload;
    },
    clearCart: (state) => {
      state.currentItems = [];
      state.nextItems = [];
    },
    mergeGuestCartWithUser: (state, action) => {
      // Merge guest cart items with user cart
      const { guestCart } = action.payload;
      if (guestCart && guestCart.length > 0) {
        // Add guest cart items to current items
        state.currentItems = [...state.currentItems, ...guestCart];
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Current Cart
      .addCase(fetchCurrentCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentCart.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItems = action.payload;
        
        
      })
      .addCase(fetchCurrentCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.currentItems = [];
      })
      // Next Cart
      .addCase(fetchNextCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNextCart.fulfilled, (state, action) => {
        state.loading = false;
        state.nextItems = action.payload;
      })
      .addCase(fetchNextCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.nextItems = [];
      });
  }
});

export const { setCartType, clearCart, mergeGuestCartWithUser } = cartSlice.actions;
export default cartSlice.reducer; 