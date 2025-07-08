import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loadingBlog: false,
};

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setLoadingBlog: (state, action) => {
            state.loadingBlog = action.payload;
        },
        
    }
});

export const { setLoadingBlog } = blogSlice.actions;
export default blogSlice.reducer; 