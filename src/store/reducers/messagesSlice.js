import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userRequest } from "../../requestMethods";

const BASE_URL =
  "https://smou-alasala-server-ap-qy3u2378d-mo74806.vercel.app/api/v1/contacts";

export const getAllMessages = createAsyncThunk(
  "messages/getAllMessages",
  async (args, { rejectWithValue }) => {
    try {
      const res = await userRequest.get(`${BASE_URL}/`);
      return res.data.data.contacts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  messages: [],
  isLoading: false,
  serverError: null,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllMessages.pending]: (state, action) => {
      state.isLoading = true;
      state.serverError = null;
    },
    [getAllMessages.fulfilled]: (state, action) => {
      state.messages = action.payload;
      state.serverError = null;
      state.isLoading = false;
    },
    [getAllMessages.rejected]: (state, action) => {
      state.serverError = action.payload;
      state.isLoading = false;
    },
  },
});

export const messagesReducer = messagesSlice.reducer;
export const messagesActions = messagesSlice.actions;
