import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstace from "src/utilities/axios";

let initialState = {
  isLoading: false,
  data: [],
  pages: 0,
  itemsCount: 0,
  error: null,
}

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (args, thunkApi) => {
    try {
      const { page, size = 10, query } = args;
      const { data } = await axiosInstace.get(`/users?page=${page}&size=${size}&query=${query}`,);
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (args, thunkApi) => {
    try {
      const { data } = await axiosInstace.post("users", args);
      return thunkApi.fulfillWithValue(data);
    }
    catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (args, thunkApi) => {
    try {
      const { data } = await axiosInstace.put(`/users/${args._id}`, args.values);
      return thunkApi.fulfillWithValue(data);
    }
    catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (args, thunkApi) => {
    try {
      const { data } = await axiosInstace.delete(`/users/${args._id}`);
      return thunkApi.fulfillWithValue(data);
    }
    catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
)

const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getUsers.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.data = payload.data;
        state.pages = payload.pages;
        state.itemsCount = payload.itemsCount;
      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.message;
      })

      .addCase(createUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.data.push(payload.data);
        state.itemsCount++;
      })
      .addCase(createUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.message;
      })

      .addCase(updateUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
        state.error = null;
        const indexAt = state.data?.findIndex(el => el._id === payload.data._id);
        state.data[indexAt] = payload.data;
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.message;
      })

      .addCase(deleteUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.data = state.data.filter(el => el._id !== payload.data._id);
      })
      .addCase(deleteUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.message;
      })
  }
});

export default usersSlice.reducer;