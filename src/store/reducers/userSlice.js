import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../../requestMethods";

export const addUser = createAsyncThunk(
  "user/addUser",
  async (user, { rejectWithValue }) => {
    try {
      const res = await publicRequest.post(`/users/signup`, user);
      localStorage.setItem("jwt", res.data.token);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      window.dispatchEvent(new Event("storage"));
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signIn = createAsyncThunk(
  "user/signIn",
  async (user, { rejectWithValue }) => {
    try {
      const res = await publicRequest.post(`/users/login`, user);
      localStorage.setItem("jwt", res.data.token);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      window.dispatchEvent(new Event("storage"));
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  isLoading: false,
  serverError: null,
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOutHandler: (state, action) => {
      state.user = null;
      state.isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    },
  },
  extraReducers: {
    [addUser.pending]: (state, action) => {
      state.isLoading = true;
      state.serverError = null;
    },
    [addUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.serverError = null;
      state.isLoading = false;
      state.isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    },
    [addUser.rejected]: (state, action) => {
      state.serverError = action.payload;
      state.isLoading = false;
    },
    [signIn.pending]: (state, action) => {
      state.isLoading = true;
      state.serverError = null;
    },
    [signIn.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.serverError = null;
      state.isLoading = false;
      state.isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    },
    [signIn.rejected]: (state, action) => {
      state.serverError = action.payload;
      state.isLoading = false;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
