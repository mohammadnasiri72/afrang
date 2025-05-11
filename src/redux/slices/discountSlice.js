import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    discountCode: '',
    estimateData: null,
    isLoading: false,
    error: null
};

const discountSlice = createSlice({
    name: 'discount',
    initialState,
    reducers: {
        setDiscountCode: (state, action) => {
            state.discountCode = action.payload;
        },
        setEstimateData: (state, action) => {
            state.estimateData = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearDiscount: (state) => {
            state.discountCode = '';
            state.estimateData = null;
            state.error = null;
        }
    },
});

export const { 
    setDiscountCode, 
    setEstimateData, 
    setLoading, 
    setError, 
    clearDiscount 
} = discountSlice.actions;

export default discountSlice.reducer; 