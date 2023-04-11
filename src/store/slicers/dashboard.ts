import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EBaseUrl } from "store/config/constants";
import thunkOptions from "store/config/thunkOptions";
import {
  IDashboardData,
  IDashboardDataRequest,
  IDashboardState,
  IDeliveredData,
  IDeliveredDataRequest,
} from "store/interfaces/dashboard";
import { IState } from "store/interfaces/main";
import { api } from "store/services/apiService";

const name = "DASHBOARD";

const initialState: IDashboardState = {
  deliveredData: null,
  dashboardData: null,
};

export const GetSurveyDeliveredData = createAsyncThunk<
  IDeliveredData,
  IDeliveredDataRequest
>(
  `${name}/GetSurveyDeliveredData`,
  async (formData) => {
    return (await api.post(`${EBaseUrl.API}/Dashboard/Delivered`, formData))
      .data;
  },
  thunkOptions
);

export const GetDashboardData = createAsyncThunk<
  IDashboardData,
  IDashboardDataRequest
>(
  `${name}/GetDashboardData`,
  async (formData) => {
    return (await api.post(`${EBaseUrl.API}/Dashboard/Data`, formData)).data;
  },
  thunkOptions
);

const dashboardSlice = createSlice({
  initialState,
  name,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetSurveyDeliveredData.fulfilled, (state, { payload }) => {
      state.deliveredData = payload;
    });
    builder.addCase(GetDashboardData.fulfilled, (state, { payload }) => {
      state.dashboardData = payload;
    });
  },
});

export const selectDeliveredData = (state: IState) =>
  state.dashboard.deliveredData;
export const selectDashboardData = (state: IState) =>
  state.dashboard.dashboardData;

export default dashboardSlice.reducer;
