import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  error: {},
  loading: false,
  success: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
        state.user = action.payload
        state.loading = false
        state.error = {}
        state.success = true
    },
    Loading: (state) => {
      state.loading = true
      state.error = {}
      state.user = {}
      state.success = false
    },
    loginFailed: (state, action) => {
      state.error = action.payload
      state.loading = false
      state.user = {}
      state.success = false
    },
    logout: (state) => {
      state.error = {}
      state.loading = false
      state.success = false
      state.user = {}
    }, 
    verifyUser: (state) => {
      state.user.isVerified = true
    },
    setUserCustomer: (state, action) => {
      state.user = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { loginSuccess, Loading, loginFailed, logout, verifyUser, setUserCustomer } = userSlice.actions;

export default userSlice.reducer;