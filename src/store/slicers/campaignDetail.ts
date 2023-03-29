import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EBaseUrl } from "store/config/constants";
import {
  ICampaignDetailsState,
  ITrigger,
  ITemplate,
  ICampaignDetailed,
  ICampaignSurvey,
  IDistributionSchedule,
  ICampaignSurveyDetails,
  IUpdateSurveyRequest,
  ICreateCampaignSurveyRequest,
  ICreateCampaignSurveyResponse,
} from "store/interfaces/campaignDetails";
import { IState } from "store/interfaces/main";
import { api } from "store/services/apiService";

const name = "CAMPAIGN_DETAILS";

const initialState: ICampaignDetailsState = {
  triggers: [],
  templates: [],
  surveys: [],
  details: null,
  selectedSurvey: 0,
  surveyDetails: null,
  surveyTemplate: null,
};

export const GetCampaignSurveyById = createAsyncThunk<
  ICampaignSurveyDetails,
  number
>(`${name}/GetCampaignSurveyById`, async (id: number) => {
  return (await api.get(`${EBaseUrl.API}/Survey/${id}`)).data;
});

export const ChangeCampaignSurveyPositions = createAsyncThunk<
  unknown,
  { data: ICampaignSurvey[]; id: number }
>(`${name}/ChangeCampaignSurveyPositions`, async ({ data, id }) => {
  return (await api.put(`${EBaseUrl.API}/Survey/Status/${id}`, data)).data;
});

export const CreateSurvey = createAsyncThunk<
  ICreateCampaignSurveyResponse,
  ICreateCampaignSurveyRequest
>(`${name}/CreateSurvey`, async (formData) => {
  return (await api.post(`${EBaseUrl.API}/Survey`, formData)).data;
});

export const RemoveCampaignSurvey = createAsyncThunk<unknown, number>(
  `${name}/RemoveCampaignSurvey`,
  async (id) => {
    return (await api.delete(`${EBaseUrl.API}/Survey/${id}`)).data;
  }
);

export const GetCampaignSurveyTemplateById = createAsyncThunk<
  ITemplate,
  number
>(`${name}/GetCampaignSurveyTemplateById`, async (id: number) => {
  return (await api.get(`${EBaseUrl.API}/SurveyTemplate/${id}`)).data;
});

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

export const UpdateSurvey = createAsyncThunk<
  unknown,
  { data: IUpdateSurveyRequest; id: number }
>(
  `${name}/UpdateSurvey`,
  async ({ id, data }: { id: number; data: IUpdateSurveyRequest }) => {
    return (await api.put(`${EBaseUrl.API}/Survey/${id}`, data)).data;
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
  reducers: {
    setSelectedSurvey(state, { payload }) {
      state.selectedSurvey = payload;
    },
  },
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
    builder.addCase(GetCampaignSurveyById.fulfilled, (state, { payload }) => {
      state.surveyDetails = payload;
    });
    builder.addCase(
      GetCampaignSurveyTemplateById.fulfilled,
      (state, { payload }) => {
        state.surveyTemplate = payload;
      }
    );
  },
});

export const selectSelectedSurvey = (state: IState) =>
  state.campaignDetails.selectedSurvey;
export const selectTriggers = (state: IState) => state.campaignDetails.triggers;
export const selectCampaignInfo = (state: IState) =>
  state.campaignDetails.details;
export const selectCampaignSurveys = (state: IState) =>
  state.campaignDetails.surveys;
export const selectTemplates = (state: IState) =>
  state.campaignDetails.templates;
export const selectSurveyInfo = (state: IState) => {
  return {
    details: state.campaignDetails.surveyDetails,
    template: state.campaignDetails.surveyTemplate,
  };
};

export const { setSelectedSurvey } = campaignDetailSlice.actions;
export default campaignDetailSlice.reducer;
