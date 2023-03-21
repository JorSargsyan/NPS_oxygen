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
import { IState } from "store/interfaces/main";

const name = "AUTH";

const initialState: IAuthState = {
  isAuth: !!localStorage.getItem(LStorage.AUTH),
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
});

export const { signOut, setAuth } = authSlicer.actions;
export const selectAuth = (state: IState) => state.auth.isAuth;
export default authSlicer.reducer;
