import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    putOrders: (state, action) => {
      state.orders = action.payload
    },
    removeOrder: (state,action) => {
      state.orders=state.orders.filter(item=>item._id !== action.payload)
    },
    updateOrder: (state, action) => {
      const orderIndex = state.orders.findIndex(order => order._id === action.payload._id);
      if (orderIndex >= 0) {
        state.orders[orderIndex] = {
          ...state.orders[orderIndex],
          ...action.payload,
        };
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { putOrders, putCartFromDB, removeOrder, updateOrder } = orderSlice.actions;

export default orderSlice.reducer;