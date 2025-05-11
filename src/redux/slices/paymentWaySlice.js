import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedPayment: null,
};

const paymentWaySlice = createSlice({
    name: 'paymentWay',
    initialState,
    reducers: {
        setSelectedPayment: (state, action) => {
            state.selectedPayment = action.payload;
        },
        clearSelectedPayment: (state) => {
            state.selectedPayment = null;
        },
    },
});

export const { setSelectedPayment, clearSelectedPayment } = paymentWaySlice.actions;
export default paymentWaySlice.reducer; 