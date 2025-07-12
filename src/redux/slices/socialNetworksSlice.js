import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSocialNetworks } from '@/services/socialNetworks/socialNetworksService';
import { getItem } from '@/services/Item/item';

// اکشن برای پاک کردن state در زمان رفرش صفحه
export const clearSocialNetworksOnRefresh = createAsyncThunk(
  'socialNetworks/clearSocialNetworksOnRefresh',
  async (_, { dispatch }) => {
    // پاک کردن localStorage برای socialNetworks
    try {
      const existingState = localStorage.getItem('reduxState');
      if (existingState) {
        const parsedState = JSON.parse(existingState);
        delete parsedState.socialNetworks;
        localStorage.setItem('reduxState', JSON.stringify(parsedState));
      }
    } catch (error) {
      console.error('Error clearing socialNetworks from localStorage:', error);
    }
    return null;
  }
);

// اکشن برای دریافت شبکه‌های اجتماعی
export const fetchSocialNetworksData = createAsyncThunk(
  'socialNetworks/fetchSocialNetworksData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getItem({
        TypeId : 8,
        LangCode : "fa",
      });
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
            state.loading = false;
            state.error = null;
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
            })
            .addCase(clearSocialNetworksOnRefresh.fulfilled, (state) => {
                state.socialNetworks = [];
                state.loading = false;
                state.error = null;
            });
    }
});

export const { setSocialNetworks, clearSocialNetworks } = socialNetworksSlice.actions;
export default socialNetworksSlice.reducer; 