import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSocialNetworks } from '@/services/socialNetworks/socialNetworksService';

// اکشن برای دریافت شبکه‌های اجتماعی
export const fetchSocialNetworksData = createAsyncThunk(
  'socialNetworks/fetchSocialNetworksData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getSocialNetworks();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
    socialNetworks: [],
    loading: false,
    error: null
};

const socialNetworksSlice = createSlice({
    name: 'socialNetworks',
    initialState,
    reducers: {
        setSocialNetworks: (state, action) => {
            state.socialNetworks = action.payload;
        },
        clearSocialNetworks: (state) => {
            state.socialNetworks = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSocialNetworksData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSocialNetworksData.fulfilled, (state, action) => {
                state.loading = false;
                state.socialNetworks = action.payload;
                state.error = null;
            })
            .addCase(fetchSocialNetworksData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { setSocialNetworks, clearSocialNetworks } = socialNetworksSlice.actions;
export default socialNetworksSlice.reducer; 