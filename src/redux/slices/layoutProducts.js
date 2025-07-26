import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    layoutProducts: 'list',
};

const layoutProductsSlice = createSlice({
    name: 'layoutProducts',
    initialState,
    reducers: {
        setLayoutProducts: (state, action) => {
            state.layoutProducts = action.payload;
        },
       
    }
});

export const { setLayoutProducts} = layoutProductsSlice.actions;
export default layoutProductsSlice.reducer; 