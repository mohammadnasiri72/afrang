import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSettings } from '@/services/settings/settingsService';

// اکشن برای دریافت تنظیمات
export const fetchSettingsData = createAsyncThunk(
  'settings/fetchSettingsData',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getSettings();
      return data;
    } catch (error) {
      console.error('Error in fetchSettingsData thunk:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
    settings: [],
    loading: false,
    error: null
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setSettings: (state, action) => {
            state.settings = action.payload;
        },
        clearSettings: (state) => {
            state.settings = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSettingsData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSettingsData.fulfilled, (state, action) => {
                state.loading = false;
                state.settings = action.payload;
                state.error = null;
            })
            .addCase(fetchSettingsData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { setSettings, clearSettings } = settingsSlice.actions;
export default settingsSlice.reducer; 