import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idEdit: 0,
  activeTab: 1,
  flag: true,
};

const idEditSlice = createSlice({
  name: "idEdit",
  initialState,
  reducers: {
    setIdEdit: (state, action) => {
      state.idEdit = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setFlag: (state, action) => {
      state.flag = action.payload;
    },
  },
});

export const { setIdEdit, setActiveTab, setFlag } = idEditSlice.actions;
export default idEditSlice.reducer;
