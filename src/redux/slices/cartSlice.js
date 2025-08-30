import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserId } from "@/utils/cookieUtils";
import { getCart, getNextCart } from '@/services/cart/CartServices';
import { mergeGuestCart } from '@/services/cart/cartService';
import Cookies from 'js-cookie';

// اکشن برای ادغام سبد خرید مهمان با سبد خرید کاربر
export const mergeGuestCartWithUser = createAsyncThunk(
  'cart/mergeGuestCart',
  async ({ guestUserId, currentUserId }, { rejectWithValue }) => {
    try {
      const response = await mergeGuestCart(guestUserId, currentUserId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const userCookie = Cookies.get('user');
      const userId = JSON.parse(userCookie)?.userId;
      
      if (!userId) return rejectWithValue("No user ID found");
      
      const [currentCart, nextCart] = await Promise.all([
        getCart(userId),
        getNextCart(userId)
      ]);
      
      return {
        currentItems: currentCart || [],
        nextItems: nextCart || []
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    currentItems: [],
    nextItems: [],
    cartType: 'current',
    loading: false,
    error: null,
    initialized: false // اضافه کردن flag برای تشخیص اینکه آیا قبلاً initialize شده یا نه
  },
  reducers: {
    setCartType: (state, action) => {
      state.cartType = action.payload;
    },
    clearCart: (state) => {
      state.currentItems = [];
      state.nextItems = [];
    },
    setInitialized: (state, action) => {
      state.initialized = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Merge Guest Cart
      .addCase(mergeGuestCartWithUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mergeGuestCartWithUser.fulfilled, (state, action) => {
        state.loading = false;
        // بعد از merge، cart data را دوباره fetch می‌کنیم
      })
      .addCase(mergeGuestCartWithUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch Cart Data (unified)
      .addCase(fetchCartData.pending, (state) => {
        // فقط اگر قبلاً initialize نشده باشد، loading را true کنیم
        if (!state.initialized) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItems = action.payload.currentItems;
        state.nextItems = action.payload.nextItems;
        state.error = null;
        state.initialized = true;
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.currentItems = [];
        state.nextItems = [];
        state.initialized = true;
      })
      // Current Cart (legacy support)
      .addCase(fetchCurrentCart.pending, (state) => {
        if (!state.initialized) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchCurrentCart.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItems = action.payload;
        state.error = null;
        state.initialized = true;
      })
      .addCase(fetchCurrentCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.currentItems = [];
        state.initialized = true;
      })
      // Next Cart (legacy support)
      .addCase(fetchNextCart.pending, (state) => {
        if (!state.initialized) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchNextCart.fulfilled, (state, action) => {
        state.loading = false;
        state.nextItems = action.payload;
        state.error = null;
        state.initialized = true;
      })
      .addCase(fetchNextCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.nextItems = [];
        state.initialized = true;
      });
  }
});

export const { setCartType, clearCart, setInitialized } = cartSlice.actions;
export default cartSlice.reducer; 