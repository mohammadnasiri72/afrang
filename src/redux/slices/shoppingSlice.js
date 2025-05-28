import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    openShopping: false,
};

const shoppingSlice = createSlice({
    name: "shopping",
    initialState,
    reducers: {
        setOpenShopping: (state, action) => {
            state.openShopping = action.payload;
        },
    },
});

export const { setOpenShopping } = shoppingSlice.actions;
export default shoppingSlice.reducer; 