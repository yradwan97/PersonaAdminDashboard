import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstace from "src/utilities/axios";

let initialState = {
  isLoading: false,
  data: [],
  pages: 0,
  itemsCount: 0,
  error: null,
}

export const getTestmonials = createAsyncThunk(
  "testmonials/getTestmonials",
  async (args, thunkApi) => {
    try {
      const { page, size = 10, query } = args;
      const { data } = await axiosInstace.get(`/testmonials?page=${page}&size=${size}&query=${query}`,);
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const createTestmonial = createAsyncThunk(
  "testmonials/createTestmonial",
  async (args, thunkApi) => {
    try {
      const { data } = await axiosInstace.post("testmonials", args);
      return thunkApi.fulfillWithValue(data);
    }
    catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const updateTestmonial = createAsyncThunk(
  "testmonials/updateTestmonial",
  async (args, thunkApi) => {
    try {
      const { data } = await axiosInstace.put(`/testmonials/${args._id}`, args.values);
      return thunkApi.fulfillWithValue(data);
    }
    catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const deleteTestmonial = createAsyncThunk(
  "testmonials/deleteTestmonial",
  async (args, thunkApi) => {
    try {
      const { data } = await axiosInstace.delete(`/testmonials/${args._id}`);
      return thunkApi.fulfillWithValue(data);
    }
    catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

const testmonialsSlice = createSlice({
  name: "testmonials",
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getTestmonials.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTestmonials.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.data = payload.data;
        state.pages = payload.pages;
        state.itemsCount = payload.itemsCount;
      })
      .addCase(getTestmonials.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.error;
      })

      .addCase(createTestmonial.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTestmonial.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.data.push(payload.data);
        state.itemsCount++;
      })
      .addCase(createTestmonial.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.error;
      })

      .addCase(updateTestmonial.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTestmonial.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
        state.error = null;
        const indexAt = state.data?.findIndex(el => el._id === payload.data._id);
        state.data[indexAt] = payload.data;
      })
      .addCase(updateTestmonial.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.error;
      })

      .addCase(deleteTestmonial.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTestmonial.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.data = state.data.filter(el => el._id !== payload.data._id);
      })
      .addCase(deleteTestmonial.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.error;
      })
  }
});

export default testmonialsSlice.reducer;