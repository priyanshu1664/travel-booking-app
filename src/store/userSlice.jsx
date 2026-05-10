import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null, token: null, isLogin: true };
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserToken: (state, action) => {
      state.token = action.payload;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    clearUser: (state, action) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser, setUserToken, setIsLogin } =
  userSlice.actions;

export default userSlice.reducer;
