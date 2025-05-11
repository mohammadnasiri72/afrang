import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedLegal: null,
};

const legalIdSlice = createSlice({
    name: 'legalId',
    initialState,
    reducers: {
        setSelectedLegal: (state, action) => {
            state.selectedLegal = action.payload;
        },
        clearSelectedLegal: (state) => {
            state.selectedLegal = null;
        },
    },
});

export const { setSelectedLegal, clearSelectedLegal } = legalIdSlice.actions;
export default legalIdSlice.reducer; 