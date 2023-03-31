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
import thunkOptions from "store/config/thunkOptions";

const name = "AUTH";

const initialState: IAuthState = {
  isAuth: !!localStorage.getItem(LStorage.AUTH),
};

export const Authorize = createAsyncThunk<
  IAuthorizeResponse,
  IAuthorizeRequest
>(
  `${name}/Login`,
  async (formData) => {
    return (await api.post(`${EBaseUrl.API}/login`, formData)).data;
  },
  thunkOptions
);

export const RefreshToken = createAsyncThunk<IAuthorizeResponse>(
  `${name}/RefreshToken`,
  async () => {
    return (await api.get(`${EBaseUrl.API}/Refresh`)).data;
  },
  thunkOptions
);

export const ForgetPassword = createAsyncThunk<
  IAuthChangePasswordResponse,
  IAuthChangePasswordRequest
>(
  `${name}/ForgetPassword`,
  async (formData) => {
    return (
      await api.post(`${EBaseUrl.API}/admin/auth/forget-password`, formData)
    ).data;
  },
  thunkOptions
);

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
    builder.addCase(Authorize.fulfilled, (_, { payload }) => {
      localStorage.setItem(LStorage.AUTH, payload.accessToken);
      localStorage.setItem(LStorage.EXPIRATION_DATE, payload.expires);
      localStorage.setItem(
        LStorage.EXPIRATION_HOURS,
        payload.expireHours.toString()
      );
    });
    builder.addCase(RefreshToken.fulfilled, (_, { payload }) => {
      localStorage.setItem(LStorage.AUTH, payload.accessToken);
      localStorage.setItem(LStorage.EXPIRATION_DATE, payload.expires);
      localStorage.setItem(
        LStorage.EXPIRATION_HOURS,
        payload.expireHours.toString()
      );
    });
  },
});

export const { signOut, setAuth } = authSlicer.actions;
export const selectAuth = (state: IState) => state.auth.isAuth;
export default authSlicer.reducer;
