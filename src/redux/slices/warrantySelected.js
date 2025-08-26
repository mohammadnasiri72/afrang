import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    warrantySelected: {},
};

const warrantySlice = createSlice({
    name: 'warranty',
    initialState,
    reducers: {
        setWarrantySelected: (state, action) => {
            state.warrantySelected = action.payload;
        },
        
    }
});

export const { setWarrantySelected } = warrantySlice.actions;
export default warrantySlice.reducer; 