import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EBaseUrl } from "../config/constants";

import { api } from "../services/apiService";
import { IGridRequest, IPaginated, IState } from "store/interfaces/main";
import {
  ICampaign,
  ICampaignState,
  ICampaignLog,
} from "store/interfaces/campaigns";

const name = "CAMPAIGNS";

const initialState: ICampaignState = {
  campaigns: null,
};

export const GetCampaigns = createAsyncThunk<
  IPaginated<ICampaign>,
  IGridRequest
>(`${name}/GetCampaigns`, async (formData) => {
  return (await api.post(`${EBaseUrl.API}/Campaign/Grid`, formData)).data;
});

export const GetCampaignLogs = createAsyncThunk<ICampaignLog[], number>(
  `${name}/GetCampaignLogs`,
  async (id) => {
    return (await api.get(`${EBaseUrl.API}/Campaign/Logs/${id}`)).data;
  }
);

export const DeleteCampaign = createAsyncThunk<unknown, number>(
  `${name}/DeleteCampaign`,
  async (id) => {
    return (await api.delete(`${EBaseUrl.API}/Campaign/${id}`)).data;
  }
);

export const UpdateCampaign = createAsyncThunk<
  ICampaignLog[],
  { formData: { name: string }; id: number }
>(`${name}/GetCampaignLogs`, async ({ formData, id }) => {
  return (await api.put(`${EBaseUrl.API}/Campaign/${id}`, formData)).data;
});

const campaignSlicer = createSlice({
  initialState,
  name,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetCampaigns.fulfilled, (state, { payload }) => {
      state.campaigns = payload;
    });
  },
});

export const selectCampaigns = (state: IState) => state.campaigns.campaigns;
export default campaignSlicer.reducer;