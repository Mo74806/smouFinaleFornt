import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "language",
  initialState: {
    lang: "arabic",
  },
  reducers: {
    changeLanguge(state) {
      if (state.lang === "arabic") {
        state.lang = "english";
      } else {
        state.lang = "arabic";
      }
    },
  },
});

export const { changeLanguge } = languageSlice.actions;
export const languageReducer = languageSlice.reducer;
