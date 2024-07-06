import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    putAllData: (state, action) => {
        state.data = action.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const { putAllData } = productSlice.actions;

export default productSlice.reducer;