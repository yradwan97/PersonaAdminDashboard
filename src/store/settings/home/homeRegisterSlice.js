import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstace from "src/utilities/axios";

let initialState = {
  isLoading: false,
  data: {},
  error: null,
}

export const getHomeRegister = createAsyncThunk(
  "homeRegister/getHomeRegister",
  async (_, thunkApi) => {
    try {
      const { data } = await axiosInstace.get("/home/register");
      return thunkApi.fulfillWithValue(data);
    } catch (errors) {
      return thunkApi.rejectWithValue(errors.response.data);
    }
  }
);

export const updateHomeRegister = createAsyncThunk(
  "homeRegister/updateHomeRegister",
  async (args, thunkApi) => {
    try {
      const { data } = await axiosInstace.put("/home/register", args);
      return thunkApi.fulfillWithValue(data);
    } catch (errors) {
      return thunkApi.rejectWithValue(errors.response.data);
    }
  }
);

const homeRegisterSlice = createSlice({
  name: "homeRegister",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getHomeRegister.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getHomeRegister.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload.data || {};
        state.error = null;
      })
      .addCase(getHomeRegister.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.error;
      })

      .addCase(updateHomeRegister.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateHomeRegister.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload.data || {};
        state.error = null;
      })
      .addCase(updateHomeRegister.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.error;
      })
  }
});

export default homeRegisterSlice.reducer;