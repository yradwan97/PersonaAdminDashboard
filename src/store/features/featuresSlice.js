import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstace from "src/utilities/axios";

let initialState = {
  isLoading: false,
  data: [],
  pages: 0,
  itemsCount: 0,
  error: null,
}

export const getFeatures = createAsyncThunk(
  "features/getFeatures",
  async (args, thunkApi) => {
    try {
      const { page, size = 10, query } = args;
      const { data } = await axiosInstace.get(`/features?page=${page}&size=${size}&query=${query}`,);
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const createFeature = createAsyncThunk(
  "features/createFeature",
  async (args, thunkApi) => {
    try {
      const { data } = await axiosInstace.post("features", args);
      return thunkApi.fulfillWithValue(data);
    }
    catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const updateFeature = createAsyncThunk(
  "features/updateFeature",
  async (args, thunkApi) => {
    try {
      const { data } = await axiosInstace.put(`/features/${args._id}`, args.values);
      return thunkApi.fulfillWithValue(data);
    }
    catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const deleteFeature = createAsyncThunk(
  "features/deleteFeature",
  async (args, thunkApi) => {
    try {
      const { data } = await axiosInstace.delete(`/features/${args._id}`);
      return thunkApi.fulfillWithValue(data);
    }
    catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

const featuresSlice = createSlice({
  name: "features",
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getFeatures.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeatures.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.data = payload.data;
        state.pages = payload.pages;
        state.itemsCount = payload.itemsCount;
      })
      .addCase(getFeatures.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.error;
      })

      .addCase(createFeature.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createFeature.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.data.push(payload.data);
        state.itemsCount++;
      })
      .addCase(createFeature.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.error;
      })

      .addCase(updateFeature.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateFeature.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
        state.error = null;
        const indexAt = state.data?.findIndex(el => el._id === payload.data._id);
        state.data[indexAt] = payload.data;
      })
      .addCase(updateFeature.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.error;
      })

      .addCase(deleteFeature.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteFeature.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.data = state.data.filter(el => el._id !== payload.data._id);
      })
      .addCase(deleteFeature.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.error;
      })
  }
});

export default featuresSlice.reducer;