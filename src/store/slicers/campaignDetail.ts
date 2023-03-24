import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EBaseUrl } from "store/config/constants";
import {
  ICampaignDetailsState,
  ITrigger,
  ITemplate,
  ICampaignDetailed,
  ICampaignSurvey,
  IDistributionSchedule,
} from "store/interfaces/campaignDetails";
import { IState } from "store/interfaces/main";
import { api } from "store/services/apiService";

const name = "CAMPAIGN_DETAILS";

const initialState: ICampaignDetailsState = {
  triggers: [],
  templates: [],
  surveys: [],
  details: null,
};

export const GetCampaignTriggers = createAsyncThunk<ITrigger[]>(
  `${name}/GetCampaignTriggers`,
  async () => {
    return (await api.get(`${EBaseUrl.API}/Triggers`)).data;
  }
);

export const GetCampaignById = createAsyncThunk<ICampaignDetailed, number>(
  `${name}/GetCampaignById`,
  async (id: number) => {
    return (await api.get(`${EBaseUrl.API}/Campaign/${id}`)).data;
  }
);

export const GetTemplates = createAsyncThunk<ITemplate[], number>(
  `${name}/GetTemplates`,
  async (id) => {
    return (await api.get(`${EBaseUrl.API}/Templates/${id}`)).data;
  }
);

export const GetSurveys = createAsyncThunk<ICampaignSurvey[], number>(
  `${name}/GetSurveys`,
  async (id: number) => {
    return (await api.get(`${EBaseUrl.API}/Surveys/${id}`)).data;
  }
);

export const DistributionSchedule = createAsyncThunk<
  unknown,
  { data: IDistributionSchedule; id: number }
>(
  `${name}/DistributionSchedule`,
  async ({ id, data }: { id: number; data: IDistributionSchedule }) => {
    return (await api.put(`${EBaseUrl.API}/Campaign/Schedule/${id}`, data))
      .data;
  }
);

const campaignDetailSlice = createSlice({
  initialState,
  name,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetCampaignTriggers.fulfilled, (state, { payload }) => {
      state.triggers = payload;
    });
    builder.addCase(GetTemplates.fulfilled, (state, { payload }) => {
      state.templates = payload;
    });
    builder.addCase(GetCampaignById.fulfilled, (state, { payload }) => {
      state.details = payload;
    });
    builder.addCase(GetSurveys.fulfilled, (state, { payload }) => {
      state.surveys = payload;
    });
  },
});

export const selectTriggers = (state: IState) => state.campaignDetails.triggers;
export const selectCampaignInfo = (state: IState) =>
  state.campaignDetails.details;
export const selectCampaignSurveys = (state: IState) =>
  state.campaignDetails.surveys;
export const selectTemplates = (state: IState) =>
  state.campaignDetails.templates;

export default campaignDetailSlice.reducer;
