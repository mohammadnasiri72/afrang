import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFilterLoading: false
};

const filterLoadingSlice = createSlice({
  name: 'filterLoading',
  initialState,
  reducers: {
    setFilterLoading: (state, action) => {
      state.isFilterLoading = action.payload;
    }
  }
});

export const { setFilterLoading } = filterLoadingSlice.actions;
export default filterLoadingSlice.reducer; 