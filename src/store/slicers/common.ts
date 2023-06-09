import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EBaseUrl, ETheme } from "../config/constants";
import {
  ICommonState,
  IPermissionGroup,
  IGetConfigResponse,
  IManagers,
} from "../interfaces/common";
import { IState } from "../interfaces/main";
import { api } from "store/services/apiService";
import thunkOptions from "store/config/thunkOptions";

const name = "COMMON";

const initialState: ICommonState = {
  loading: false,
  campaignLoading: false,
  theme: ETheme.Light,
  tableLoading: true,
  permissions: null,
  permissionGroups: [],
  managers: [],
  sidebarVisible: true,
  buttonLoading: false,
  isTranslationsLoaded: false,
};

export const GetPermissions = createAsyncThunk<{ [key: string]: any }>(
  `${name}/GetPermissions`,
  async () => {
    return (await api.get(`${EBaseUrl.API}/User/Permissions`)).data;
  },
  thunkOptions
);

export const GetPermissionGroups = createAsyncThunk<IPermissionGroup[]>(
  `${name}/GetPermissionGroups`,
  async () => {
    return (await api.get(`${EBaseUrl.API}/Permission`)).data;
  },
  thunkOptions
);

export const GetConfig = createAsyncThunk<IGetConfigResponse>(
  `${name}/GetConfig`,
  async () => {
    return (await api.get(`${EBaseUrl.API}/User/Config`)).data;
  },
  thunkOptions
);

export const GetUserManagers = createAsyncThunk<IManagers[]>(
  `${name}/GetUserManagers`,
  async () => {
    return (await api.get(`${EBaseUrl.API}/User/Managers`)).data;
  },
  thunkOptions
);

const commonSlice = createSlice({
  initialState,
  name,
  reducers: {
    setLoading(state, { payload }) {
      state.loading = payload;
    },
    setButtonLoading(state, { payload }) {
      state.buttonLoading = payload;
    },
    setCampaignLoading(state, { payload }) {
      state.campaignLoading = payload;
    },
    setTheme(state, { payload }) {
      state.theme = payload;
    },
    setTableLoading(state, { payload }) {
      state.tableLoading = payload;
    },
    setSidebarVisible(state, { payload }) {
      state.sidebarVisible = payload;
    },
    setTranslationsLoaded(state, { payload }) {
      state.isTranslationsLoaded = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetPermissions.fulfilled, (state, { payload }) => {
      state.permissions = payload.permissions;
    });
    builder.addCase(GetPermissionGroups.fulfilled, (state, { payload }) => {
      state.permissionGroups = payload;
    });
    builder.addCase(GetConfig.fulfilled, (state, { payload }) => {
      state.theme = payload.themeColor;
    });
    builder.addCase(GetUserManagers.fulfilled, (state, { payload }) => {
      state.managers = payload;
    });
  },
});

export const {
  setLoading,
  setTheme,
  setTableLoading,
  setSidebarVisible,
  setCampaignLoading,
  setButtonLoading,
  setTranslationsLoaded,
} = commonSlice.actions;
export const selectLoadingState = (state: IState) => state.common.loading;
export const selectButtonLoadingState = (state: IState) =>
  state.common.buttonLoading;
export const selectCampaignLoading = (state: IState) =>
  state.common.campaignLoading;
export const selectTableLoadingState = (state: IState) =>
  state.common.tableLoading;
export const selectTheme = (state: IState) => state.common.theme;
export const selectPermissions = (state: IState) => state.common.permissions;
export const selectPermissionGroups = (state: IState) =>
  state.common.permissionGroups;
export const selectManagers = (state: IState) => state.common.managers;
export const selectSidebarVisible = (state: IState) =>
  state.common.sidebarVisible;
export const selectIsTranslationLoaded = (state: IState) =>
  state.common.isTranslationsLoaded;

export default commonSlice.reducer;
