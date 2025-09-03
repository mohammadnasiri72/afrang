import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedShipping: null,
    shippingMethods: [],
    descShipping : ''
};

const shippingSlice = createSlice({
    name: 'shipping',
    initialState,
    reducers: {
        setSelectedShipping: (state, action) => {
            state.selectedShipping = action.payload;
        },
        setShippingMethods: (state, action) => {
            state.shippingMethods = action.payload;
        },
        setDescShipping: (state, action) => {
            state.descShipping = action.payload;
        },
        clearShippingState: (state) => {
            state.selectedShipping = null;
            state.shippingMethods = [];
        }
    }
});

export const { setSelectedShipping, setShippingMethods, clearShippingState , setDescShipping} = shippingSlice.actions;
export default shippingSlice.reducer; 