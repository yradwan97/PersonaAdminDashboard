import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstace from "src/utilities/axios";

let initialState = {
  isLoading: false,
  data: {},
  error: null,
}

export const getGlobalDiscover = createAsyncThunk(
  "globalDiscover/getGlobalDiscover",
  async (_, thunkApi) => {
    try {
      const { data } = await axiosInstace.get("/discover");
      return thunkApi.fulfillWithValue(data);
    } catch (errors) {
      return thunkApi.rejectWithValue(errors.response.data);
    }
  }
);

export const updateGlobalDiscover = createAsyncThunk(
  "globalDiscover/updateGlobalDiscover",
  async (args, thunkApi) => {
    try {
      const { data } = await axiosInstace.put("/discover", args);
      return thunkApi.fulfillWithValue(data);
    } catch (errors) {
      return thunkApi.rejectWithValue(errors.response.data);
    }
  }
);

const globalDiscoverSlice = createSlice({
  name: "globalDiscover",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getGlobalDiscover.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getGlobalDiscover.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload.data || {};
        state.error = null;
      })
      .addCase(getGlobalDiscover.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.error;
      })

      .addCase(updateGlobalDiscover.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateGlobalDiscover.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload.data || {};
        state.error = null;
      })
      .addCase(updateGlobalDiscover.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.error;
      })
  }
});

export default globalDiscoverSlice.reducer;