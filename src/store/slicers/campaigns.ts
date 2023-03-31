import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EBaseUrl } from "../config/constants";

import { api } from "../services/apiService";
import { IGridRequest, IPaginated, IState } from "store/interfaces/main";
import {
  ICampaign,
  ICampaignState,
  ICampaignLog,
  ICreateCampaignRequest,
} from "store/interfaces/campaigns";
import thunkOptions from "store/config/thunkOptions";

const name = "CAMPAIGNS";

const initialState: ICampaignState = {
  campaigns: null,
};

export const GetCampaigns = createAsyncThunk<
  IPaginated<ICampaign>,
  IGridRequest
>(
  `${name}/GetCampaigns`,
  async (formData) => {
    return (await api.post(`${EBaseUrl.API}/Campaign/Grid`, formData)).data;
  },
  thunkOptions
);

export const CreateCampaign = createAsyncThunk<unknown, ICreateCampaignRequest>(
  `${name}/GetCampaigns`,
  async (formData) => {
    return (await api.post(`${EBaseUrl.API}/Campaign/Grid`, formData)).data;
  },
  thunkOptions
);

export const ChangeCampaignState = createAsyncThunk<
  unknown,
  { state: boolean; id: number }
>(
  `${name}/ChangeCampaignState`,
  async (formData) => {
    return (
      await api.put(`${EBaseUrl.API}/Campaign/Status/${formData.id}`, {
        state: formData.state,
      })
    ).data;
  },
  thunkOptions
);

export const GetCampaignLogs = createAsyncThunk<ICampaignLog[], number>(
  `${name}/GetCampaignLogs`,
  async (id) => {
    return (await api.get(`${EBaseUrl.API}/Campaign/Logs/${id}`)).data;
  },
  thunkOptions
);

export const TestCustomersCampaign = createAsyncThunk<
  unknown,
  {
    campaignID: number;
    phoneNumbers: string[];
  }
>(
  `${name}/TestCustomersCampaign`,
  async (formData) => {
    return (await api.post(`${EBaseUrl.API}/TestCustomers`, formData)).data;
  },
  thunkOptions
);

export const DeleteCampaign = createAsyncThunk<unknown, number>(
  `${name}/DeleteCampaign`,
  async (id) => {
    return (await api.delete(`${EBaseUrl.API}/Campaign/${id}`)).data;
  },
  thunkOptions
);

export const UpdateCampaign = createAsyncThunk<
  ICampaignLog[],
  { formData: { name: string }; id: number }
>(
  `${name}/GetCampaignLogs`,
  async ({ formData, id }) => {
    return (await api.put(`${EBaseUrl.API}/Campaign/${id}`, formData)).data;
  },
  thunkOptions
);

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
