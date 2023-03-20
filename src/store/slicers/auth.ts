import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EBaseUrl, LStorage } from "../config/constants";
import {
  IAuthChangePasswordRequest,
  IAuthChangePasswordResponse,
  IAuthorizeRequest,
  IAuthorizeResponse,
  IAuthState,
} from "../interfaces/auth";
import { api } from "../services/apiService";

const name = "AUTH";

const initialState: IAuthState = {
  isAuth: false,
};

export const Authorize = createAsyncThunk<
  IAuthorizeResponse,
  IAuthorizeRequest
>(`${name}/Login`, async (formData) => {
  return (await api.post(`${EBaseUrl.API}/login`, formData)).data;
});

export const ForgetPassword = createAsyncThunk<
  IAuthChangePasswordResponse,
  IAuthChangePasswordRequest
>(`${name}/ForgetPassword`, async (formData) => {
  return (
    await api.post(`${EBaseUrl.API}/admin/auth/forget-password`, formData)
  ).data;
});

const authSlicer = createSlice({
  initialState,
  name,
  reducers: {
    setAuth(state, { payload }) {
      state.isAuth = payload;
    },
    signOut(state) {
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(Authorize.fulfilled, (state, { payload }) => {
      state.isAuth = true;
      localStorage.setItem(LStorage.accessToken, payload.token);
    });
  },
});

export const { signOut, setAuth } = authSlicer.actions;
export default authSlicer.reducer;
