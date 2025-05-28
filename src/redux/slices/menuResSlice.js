import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    openMenuRes: false,
    loading: false,
    error: null
};

const menuResSlice = createSlice({
    name: 'menuRes',
    initialState,
    reducers: {
        setMenuItems: (state, action) => {
            state.items = action.payload;
            state.loading = false;
            state.error = null;
        },
        setOpenMenuRes: (state, action) => {
            state.openMenuRes = action.payload;
        },
        setLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        setError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearMenuRes: (state) => {
            state.items = [];
            state.openMenuRes = false;
            state.loading = false;
            state.error = null;
        }
    }
});

export const {
    setMenuItems,
    setOpenMenuRes,
    setLoading,
    setError,
    clearMenuRes
} = menuResSlice.actions;

export default menuResSlice.reducer; 