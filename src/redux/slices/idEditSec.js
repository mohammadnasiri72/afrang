import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    idEdit: 0,
   activeTab:0
};

const idEditSlice = createSlice({
    name: 'idEdit',
    initialState,
    reducers: {
        setIdEdit: (state, action) => {
            state.idEdit = action.payload;
        },
        setActiveTab: (state, action) => {
            state.activeTab = action.payload;
        },
       
    }
});

export const { setIdEdit , setActiveTab} = idEditSlice.actions;
export default idEditSlice.reducer; 