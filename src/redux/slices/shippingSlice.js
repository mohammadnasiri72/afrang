import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedShipping: null,
};

const shippingSlice = createSlice({
    name: 'shipping',
    initialState,
    reducers: {
        setSelectedShipping: (state, action) => {
            state.selectedShipping = action.payload;
        },
        clearSelectedShipping: (state) => {
            state.selectedShipping = null;
        },
    },
});

export const { setSelectedShipping, clearSelectedShipping } = shippingSlice.actions;
export default shippingSlice.reducer; 