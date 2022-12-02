import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../../requestMethods";

export const getDayAppointments = createAsyncThunk(
  "appointment/getDayAppointments",
  async ([date, jwt], { rejectWithValue }) => {
    try {
      const res = await publicRequest.get(
        `/appointements/dayAppointements/${date}`,
        { headers: { jwt: jwt } }
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  appointments: null,
  isLoading: false,
  serverError: null,
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {},
  extraReducers: {
    [getDayAppointments.pending]: (state, action) => {
      state.isLoading = true;
      state.serverError = null;
    },
    [getDayAppointments.fulfilled]: (state, action) => {
      state.appointments = action.payload;
      state.serverError = null;
      state.isLoading = false;
    },
    [getDayAppointments.rejected]: (state, action) => {
      state.serverError = action.payload;
      state.isLoading = false;
    },
  },
});

export const appointmentReducer = appointmentSlice.reducer;
export const appointmentActions = appointmentSlice.actions;
