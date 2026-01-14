import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedInsurance: [],
};

const selectedInsuranceSlice = createSlice({
  name: "selectedInsurance",
  initialState,
  reducers: {
    setSelectedInsurance: (state, action) => {
      state.selectedInsurance = action.payload;
    },
   
   
  },
});

export const { setSelectedInsurance  } = selectedInsuranceSlice.actions;
export default selectedInsuranceSlice.reducer;
