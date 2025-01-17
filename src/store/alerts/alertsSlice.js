import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstace from "src/utilities/axios";

let initialState = {
  isLoading: false,
  data: [],
  pages: 0,
  itemsCount: 0,
  error: null,
}

export const getAlerts = createAsyncThunk(
  "alerts/getAlerts",
  async (args, thunkApi) => {
    try {
      const { page, size = 10, query } = args;
      const { data } = await axiosInstace.get(`/alerts?page=${page}&size=${size}&query=${query}`,);
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const createAlert = createAsyncThunk(
  "alerts/createAlert",
  async (args, thunkApi) => {
    try {
      const { data } = await axiosInstace.post("alerts", args);
      return thunkApi.fulfillWithValue(data);
    }
    catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const updateAlert = createAsyncThunk(
  "alerts/updateAlert",
  async (args, thunkApi) => {
    try {
      const { data } = await axiosInstace.put(`/alerts/${args._id}`, args.values);
      return thunkApi.fulfillWithValue(data);
    }
    catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const deleteAlert = createAsyncThunk(
  "alerts/deleteAlert",
  async (args, thunkApi) => {
    try {
      const { data } = await axiosInstace.delete(`/alerts/${args._id}`);
      return thunkApi.fulfillWithValue(data);
    }
    catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
)

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getAlerts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAlerts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.data = payload.data;
        state.pages = payload.pages;
        state.itemsCount = payload.itemsCount;
      })
      .addCase(getAlerts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.error;
      })

      .addCase(createAlert.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createAlert.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.data.push(payload.data);
        state.itemsCount++;
      })
      .addCase(createAlert.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.error;
      })

      .addCase(updateAlert.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAlert.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
        state.error = null;
        const indexAt = state.data?.findIndex(el => el._id === payload.data._id);
        state.data[indexAt] = payload.data;
      })
      .addCase(updateAlert.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.error;
      })

      .addCase(deleteAlert.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteAlert.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.data = state.data.filter(el => el._id !== payload.data._id);
      })
      .addCase(deleteAlert.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.error;
      })
  }
});

export default alertsSlice.reducer;