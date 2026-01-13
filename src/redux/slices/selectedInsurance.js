import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedInsurance: [],
  selectedIdInsurance: null,
};

const selectedInsuranceSlice = createSlice({
  name: "selectedInsurance",
  initialState,
  reducers: {
    setSelectedInsurance: (state, action) => {
      state.selectedInsurance = action.payload;
    },
    setSelectedIdInsurance: (state, action) => {
      state.selectedIdInsurance = action.payload;
    },
  },
});

export const { setSelectedInsurance , setSelectedIdInsurance} = selectedInsuranceSlice.actions;
export default selectedInsuranceSlice.reducer;
