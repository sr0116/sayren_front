import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  content: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    open: (state, action) => {
      state.isOpen = true;
      state.content = action.payload; // content 전달
    },
    close: (state) => {
      state.isOpen = false;
      state.content = null;
    },
  },
});

export const { open, close } = modalSlice.actions;
export default modalSlice.reducer;
