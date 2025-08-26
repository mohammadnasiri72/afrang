import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    insuranceSelected: {},
};

const insuranceSlice = createSlice({
    name: 'insurance',
    initialState,
    reducers: {
        setInsuranceSelected: (state, action) => {
            state.insuranceSelected = action.payload;
        },
        
    }
});

export const { setInsuranceSelected } = insuranceSlice.actions;
export default insuranceSlice.reducer; 