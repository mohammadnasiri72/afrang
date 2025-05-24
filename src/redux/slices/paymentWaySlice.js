import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedPayment: null,
    paymentMethods: []
};

const paymentWaySlice = createSlice({
    name: 'paymentWay',
    initialState,
    reducers: {
        setSelectedPayment: (state, action) => {
            state.selectedPayment = action.payload;
        },
        setPaymentMethods: (state, action) => {
            state.paymentMethods = action.payload;
        },
        clearPaymentState: (state) => {
            state.selectedPayment = null;
            state.paymentMethods = [];
        }
    }
});

export const { setSelectedPayment, setPaymentMethods, clearPaymentState } = paymentWaySlice.actions;
export default paymentWaySlice.reducer; 