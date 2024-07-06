import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  success: false
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productIndex = state.products.findIndex(
        (product) =>
          product.productId === action.payload.productId &&
          product.color === action.payload.color &&
          product.size === action.payload.size
      );

      if (productIndex >= 0) {
        // If the product exists, update the quantity
        state.products[productIndex] = action.payload;
      } else {
        // If the product does not exist, add it to the cart
        state.products.push(action.payload);
      }
    },
    updateCartItem: (state, action) => {
      const productIndex = state.products.findIndex(
        (product) => product._id === action.payload.cartId
      );
      if (productIndex >= 0) {
        state.products[productIndex] = {
          ...state.products[productIndex],
          ...action.payload,
        };
      }
    },
    putCartFromDB: (state, action) => {
      state.products = action.payload
    },
    removeItem: (state,action) => {
      state.products=state.products.filter(item=>item._id !== action.payload)
    },
    resetCart: (state) => {
      state.products = []
    },
    setSuccess:(state, action) => {
      state.success = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { addToCart,removeItem,resetCart, toConfirm, setSuccess,putCartFromDB, updateCartItem } = cartSlice.actions;

export default cartSlice.reducer;