import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstace from "src/utilities/axios";

let initialState = {
  isLoading: false,
  data: {},
  error: null,
}

export const getGlobalConfig = createAsyncThunk(
  "globalConfig/getGlobalConfig",
  async (_, thunkApi) => {
    try {
      const { data } = await axiosInstace.get("/config");
      return thunkApi.fulfillWithValue(data);
    } catch (errors) {
      return thunkApi.rejectWithValue(errors.response.data);
    }
  }
);

export const updateGlobalConfig = createAsyncThunk(
  "globalConfig/updateGlobalConfig",
  async (args, thunkApi) => {
    try {
      const { data } = await axiosInstace.put("/config", args);
      return thunkApi.fulfillWithValue(data);
    } catch (errors) {
      return thunkApi.rejectWithValue(errors.response.data);
    }
  }
);

const globalConfigSlice = createSlice({
  name: "globalConfig",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getGlobalConfig.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getGlobalConfig.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload.data || {};
        state.error = null;
      })
      .addCase(getGlobalConfig.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.error;
      })

      .addCase(updateGlobalConfig.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateGlobalConfig.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload.data || {};
        state.error = null;
      })
      .addCase(updateGlobalConfig.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.error;
      })
  }
});

export default globalConfigSlice.reducer;