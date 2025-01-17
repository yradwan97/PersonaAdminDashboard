import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstace from "src/utilities/axios";

let initialState = {
  isLoading: false,
  data: {},
  error: null,
}

export const getHomeHeader = createAsyncThunk(
  "homeHeader/getHomeHeader",
  async (_, thunkApi) => {
    try {
      const { data } = await axiosInstace.get("/home/header");
      return thunkApi.fulfillWithValue(data);
    } catch (errors) {
      return thunkApi.rejectWithValue(errors.response.data);
    }
  }
);

export const updateHomeHeader = createAsyncThunk(
  "homeHeader/updateHomeHeader",
  async (args, thunkApi) => {
    try {
      const { data } = await axiosInstace.put("/home/header", args);
      return thunkApi.fulfillWithValue(data);
    } catch (errors) {
      return thunkApi.rejectWithValue(errors.response.data);
    }
  }
);

const homeHeaderSlice = createSlice({
  name: "homeHeader",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getHomeHeader.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getHomeHeader.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload.data || {};
        state.error = null;
      })
      .addCase(getHomeHeader.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.error;
      })

      .addCase(updateHomeHeader.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateHomeHeader.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload.data || {};
        state.error = null;
      })
      .addCase(updateHomeHeader.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.error;
      })
  }
});

export default homeHeaderSlice.reducer;