import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EBaseUrl, ETheme } from "../config/constants";
import {
  ICommonState,
  IGetPermissionsResponse,
  IGetConfigResponse,
} from "../interfaces/common";
import { IState } from "../interfaces/main";
import { api } from "store/services/apiService";

const name = "COMMON";

const initialState: ICommonState = {
  loading: false,
  theme: ETheme.Light,
  permissions: [],
};

export const GetPermissions = createAsyncThunk<IGetPermissionsResponse>(
  `${name}/GetPermissions`,
  async () => {
    return (await api.get(`${EBaseUrl.API}/User/Permissions`)).data;
  }
);

export const GetConfig = createAsyncThunk<IGetConfigResponse>(
  `${name}/GetConfig`,
  async () => {
    return (await api.get(`${EBaseUrl.API}/User/Config`)).data;
  }
);

const commonSlice = createSlice({
  initialState,
  name,
  reducers: {
    setLoading(state, { payload }) {
      state.loading = payload;
    },

    setTheme(state, { payload }) {
      state.theme = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetPermissions.fulfilled, (state, { payload }) => {
      state.permissions = payload.permissions;
    });
    builder.addCase(GetConfig.fulfilled, (state, { payload }) => {
      state.theme = payload.themeColor;
    });
  },
});

export const { setLoading, setTheme } = commonSlice.actions;
export const selectLoadingState = (state: IState) => state.common.loading;
export const selectTheme = (state: IState) => state.common.theme;
export const selectPermissions = (state: IState) => state.common.permissions;
export default commonSlice.reducer;
