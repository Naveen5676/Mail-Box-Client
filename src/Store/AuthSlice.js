import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: { islogged: false },
  reducers: {
    login(state) {
      state.islogged = true;
    },
    logout(state) {
      state.islogged = false;
      localStorage.removeItem("loginemail");
    },
  },
});

export const Authaction = AuthSlice.actions;
export default AuthSlice;
