import { createSlice } from "@reduxjs/toolkit";

const ModalSlice = createSlice({
  name: "modal",
  initialState: { composebtn: false },
  reducers: {
    setTrue(state) {
      state.composebtn = true;
    },
    setFalse(state) {
      state.composebtn = false;
    },
  },
});

export const Modalaction = ModalSlice.actions;
export default ModalSlice;
