import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



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
   
});

export const { setSettings, clearSettings } = settingsSlice.actions;
export default settingsSlice.reducer; 