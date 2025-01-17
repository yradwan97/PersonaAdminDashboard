import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import axiosInstace from "src/utilities/axios";

let initialState = {
  isLoading: false,
  isAuth: false,
  user: null,
  token: Cookies.get('token') || "",
  error: null
}

export const login = createAsyncThunk(
  "auth/login",
  async (args, thunkApi) => {
    try {
      const { data } = await axiosInstace.post('/login', args);
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const checkAuthentication = createAsyncThunk(
  "auth/checkAuthentication",
  async (_, thunkApi) => {
    try {
      const { data } = await axiosInstace.post("/check_auth");
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoading = false;
      state.error = null;
      state.isAuth = false;
      state.token = "";
      Cookies.remove("token");
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
        Cookies.set("token", payload.token, {
          expires: 250
        });
        console.log(payload);
        state.token = payload.token;
        state.user = payload.user;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.message;
        state.isAuth = false;
        state.token = "";
        state.user = null;
        Cookies.remove("token");
      })

      .addCase(checkAuthentication.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuthentication.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
        state.user = payload.user;
      })
      .addCase(checkAuthentication.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.message;
        state.token = "";
        state.isAuth = false;
        Cookies.remove("token");
        state.user = null;
      })
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer