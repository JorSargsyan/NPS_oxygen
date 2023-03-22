import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EBaseUrl } from "../config/constants";

import { api } from "../services/apiService";
import { IGridRequest, IPaginated, IState } from "store/interfaces/main";
import { ICampaign, ICampaignState } from "store/interfaces/campaigns";

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
