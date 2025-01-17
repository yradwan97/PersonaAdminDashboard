import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstace from "src/utilities/axios";

let initialState = {
  isLoading: false,
  data: {},
  error: null,
}

export const getHomeAbout = createAsyncThunk(
  "homeAbout/getHomeAbout",
  async (_, thunkApi) => {
    try {
      const { data } = await axiosInstace.get("/home/about");
      return thunkApi.fulfillWithValue(data);
    } catch (errors) {
      return thunkApi.rejectWithValue(errors.response.data);
    }
  }
);

export const updateHomeAbout = createAsyncThunk(
  "homeAbout/updateHomeAbout",
  async (args, thunkApi) => {
    try {
      const { data } = await axiosInstace.put("/home/about", args);
      return thunkApi.fulfillWithValue(data);
    } catch (errors) {
      return thunkApi.rejectWithValue(errors.response.data);
    }
  }
);

const homeAboutSlice = createSlice({
  name: "homeAbout",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getHomeAbout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getHomeAbout.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload.data || {};
        state.error = null;
      })
      .addCase(getHomeAbout.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.error;
      })

      .addCase(updateHomeAbout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateHomeAbout.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload.data || {};
        state.error = null;
      })
      .addCase(updateHomeAbout.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.error;
      })
  }
});

export default homeAboutSlice.reducer;