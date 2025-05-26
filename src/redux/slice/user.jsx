import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserCookie } from "@/utils/cookieUtils";
import { getUserProfile } from "@/services/dashboard/dashboardService";

// Create async thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const userCookie = getUserCookie();
      if (!userCookie) return rejectWithValue("No user cookie found");
      
      const userData = JSON.parse(userCookie);
      if (!userData.token) return rejectWithValue("No token found");

      const profileData = await getUserProfile(userData.token);
      return { ...userData, ...profileData };
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch user profile");
    }
  }
);

const initialState = {
  user: getUserCookie() || '',
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      // Update cookie when user data changes
      if (action.payload) {
        Cookies.set("user", JSON.stringify(action.payload));
      }
    },
    updateUserFields: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      // Update cookie with new user data
      Cookies.set("user", JSON.stringify(state.user));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        // Update cookie with new user data
        Cookies.set("user", JSON.stringify(action.payload));
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setUser, updateUserFields } = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user.user;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;
