import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    supportBox: null,
};

const supportBoxSlice = createSlice({
    name: 'supportBox',
    initialState,
    reducers: {
        setSupportBox: (state, action) => {
            state.supportBox = action.payload;
        },
        clearSupportBox: (state) => {
            state.supportBox = null;
        },
    },
});

export const { setSupportBox, clearSupportBox } = supportBoxSlice.actions;
export default supportBoxSlice.reducer; 