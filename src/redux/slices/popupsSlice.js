import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    popupsList: [],
   
};

const popupsSlice = createSlice({
    name: 'popups',
    initialState,
    reducers: {
        setPopupsList: (state, action) => {
            state.popupsList = action.payload;
        },
    }
});

export const {setPopupsList } = popupsSlice.actions;
export default popupsSlice.reducer; 