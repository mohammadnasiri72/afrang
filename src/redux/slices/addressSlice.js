import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedAddress: null,
    addresses: []
};

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        setSelectedAddress: (state, action) => {
            state.selectedAddress = action.payload;
        },
        setAddresses: (state, action) => {
            state.addresses = action.payload;
        },
        clearAddressState: (state) => {
            state.selectedAddress = null;
            state.addresses = [];
        }
    }
});

export const { setSelectedAddress, setAddresses, clearAddressState } = addressSlice.actions;
export default addressSlice.reducer; 