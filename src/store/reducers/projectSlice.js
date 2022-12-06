import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  "https://smou-alasala-server-ap-qy3u2378d-mo74806.vercel.app/api/v1/projects";

export const getAllProjects = createAsyncThunk(
  "project/getAllProjects",
  async ([page, limit], { rejectWithValue }) => {
    try {
      if (page && limit) {
        let res = await axios.get(`${BASE_URL}?page=${page}&limit=${limit}`);
        return res.data;
      } else {
        let res = await axios.get(`${BASE_URL}/`);
        return res.data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getProjectById = createAsyncThunk(
  "project/getProjectById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  projects: [],
  projectById: {},
  isLoading: false,
  serverError: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllProjects.pending]: (state, action) => {
      state.isLoading = true;
      state.serverError = null;
    },
    [getAllProjects.fulfilled]: (state, action) => {
      state.projects = action.payload;
      state.serverError = null;
      state.isLoading = false;
    },
    [getAllProjects.rejected]: (state, action) => {
      state.serverError = action.payload;
      state.isLoading = false;
    },
    [getProjectById.pending]: (state, action) => {
      state.isLoading = true;
      state.serverError = null;
    },
    [getProjectById.fulfilled]: (state, action) => {
      state.projectById = action.payload;
      state.serverError = null;
      state.isLoading = false;
    },
    [getProjectById.rejected]: (state, action) => {
      state.serverError = action.payload;
      state.isLoading = false;
    },
  },
});

export const projectReducer = projectSlice.reducer;
export const projectActions = projectSlice.actions;
