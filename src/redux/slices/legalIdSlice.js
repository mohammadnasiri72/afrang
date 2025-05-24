import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLegalEnabled: false,
    selectedLegal: null
};

const legalIdSlice = createSlice({
    name: 'legalId',
    initialState,
    reducers: {
        setLegalEnabled: (state, action) => {
            state.isLegalEnabled = action.payload;
            if (!action.payload) {
                state.selectedLegal = null;
            }
        },
        setSelectedLegal: (state, action) => {
            state.selectedLegal = action.payload;
        },
        clearLegalState: (state) => {
            state.isLegalEnabled = false;
            state.selectedLegal = null;
        },
        resetLegalState: (state) => {
            return initialState;
        }
    }
});

export const { setLegalEnabled, setSelectedLegal, clearLegalState, resetLegalState } = legalIdSlice.actions;
export default legalIdSlice.reducer; 