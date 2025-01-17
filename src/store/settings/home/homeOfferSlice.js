import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstace from "src/utilities/axios";

let initialState = {
  isLoading: false,
  data: {},
  error: null,
}

export const getHomeOffer = createAsyncThunk(
  "homeOffer/getHomeOffer",
  async (_, thunkApi) => {
    try {
      const { data } = await axiosInstace.get("/home/offer");
      return thunkApi.fulfillWithValue(data);
    } catch (errors) {
      return thunkApi.rejectWithValue(errors.response.data);
    }
  }
);

export const updateHomeOffer = createAsyncThunk(
  "homeOffer/updateHomeOffer",
  async (args, thunkApi) => {
    try {
      const { data } = await axiosInstace.put("/home/offer", args);
      return thunkApi.fulfillWithValue(data);
    } catch (errors) {
      return thunkApi.rejectWithValue(errors.response.data);
    }
  }
);

const homeOfferSlice = createSlice({
  name: "homeOffer",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getHomeOffer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getHomeOffer.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload.data || {};
        state.error = null;
      })
      .addCase(getHomeOffer.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.error;
      })

      .addCase(updateHomeOffer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateHomeOffer.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload.data || {};
        state.error = null;
      })
      .addCase(updateHomeOffer.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.error;
      })
  }
});

export default homeOfferSlice.reducer;