import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest, publicRequest } from "../../requestMethods";

export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (jwt, { rejectWithValue }) => {
    try {
      const res = await publicRequest.get(`/users`, { headers: { jwt: jwt } });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const res = await userRequest.delete(`/users/${id}`);
      return res.status;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserById = createAsyncThunk(
  "admin/getUserById",
  async ([id, jwt], { rejectWithValue }) => {
    try {
      const res = await publicRequest.get(`/users/${id}`, {
        headers: {
          jwt: jwt,
        },
      });
      return res.data.data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ([id, user, jwt], { rejectWithValue }) => {
    try {
      const res = await publicRequest.patch(`/users/${id}`, user, {
        headers: {
          jwt: jwt,
        },
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  usersList: null,
  userById: null,
  updated: null,
  status: null,
  isLoading: false,
  serverError: null,
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")),
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logOutHandler: (state, action) => {
      state.isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    },
  },
  extraReducers: {
    [getAllUsers.pending]: (state, action) => {
      state.isLoading = true;
      state.serverError = null;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.usersList = action.payload;
      state.serverError = null;
      state.isLoading = false;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.serverError = action.payload;
      state.usersList = null;
      state.isLoading = false;
    },
    [deleteUser.pending]: (state, action) => {
      state.isLoading = true;
      state.serverError = null;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.status = action.payload;
      state.serverError = null;
      state.isLoading = false;
    },
    [deleteUser.rejected]: (state, action) => {
      state.serverError = action.payload;
      state.isLoading = false;
    },
    [getUserById.pending]: (state, action) => {
      state.isLoading = true;
      state.serverError = null;
    },
    [getUserById.fulfilled]: (state, action) => {
      state.userById = action.payload;
      state.serverError = null;
      state.isLoading = false;
    },
    [getUserById.rejected]: (state, action) => {
      state.serverError = action.payload;
      state.isLoading = false;
    },
    [getUserById.pending]: (state, action) => {
      state.isLoading = true;
      state.serverError = null;
    },
    [getUserById.fulfilled]: (state, action) => {
      state.userById = action.payload;
      state.serverError = null;
      state.isLoading = false;
    },
    [getUserById.rejected]: (state, action) => {
      state.serverError = action.payload;
      state.isLoading = false;
    },
    [updateUser.pending]: (state, action) => {
      state.isLoading = true;
      state.serverError = null;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.updated = action.payload;
      state.serverError = null;
      state.isLoading = false;
    },
    [updateUser.rejected]: (state, action) => {
      state.serverError = action.payload;
      state.isLoading = false;
    },
  },
});

export const adminReducer = adminSlice.reducer;
export const adminActions = adminSlice.actions;
