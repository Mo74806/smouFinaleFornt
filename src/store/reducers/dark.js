import { createSlice } from "@reduxjs/toolkit";

const darkSlice = createSlice({
  name: "dark",
  initialState: {
    dark: false,
  },
  reducers: {
    changeDark(state) {
      if (state.dark === true) {
        state.dark = false;
      } else {
        state.dark = true;
      }
    },
  },
});

export const { changeDark } = darkSlice.actions;
export const darkReducer = darkSlice.reducer;
