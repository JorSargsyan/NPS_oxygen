import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EBaseUrl } from "store/config/constants";
import thunkOptions from "store/config/thunkOptions";
import {
  ICampaignDetailsState,
  ITrigger,
  ITemplate,
  ICampaignDetailed,
  ICampaignSurvey,
  IDistributionSchedule,
  ICampaignSurveyDetails,
  IUpdateSurveyTemplateRequest,
  ICreateCampaignSurveyRequest,
  ICreateCampaignSurveyResponse,
  IUpdateSurveyRequest,
  ICreateSurveyLogic,
  ISurveyLogicResponse,
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
  surveyLogic: null,
  surveyDetails: null,
  surveyTemplate: null,
  form: {
    survey: null,
    settings: null,
  },
};

export const GetCampaignSurveyById = createAsyncThunk<
  ICampaignSurveyDetails,
  number
>(
  `${name}/GetCampaignSurveyById`,
  async (id: number) => {
    return (await api.get(`${EBaseUrl.API}/Survey/${id}`)).data;
  },
  thunkOptions
);

export const ChangeCampaignSurveyPositions = createAsyncThunk<
  unknown,
  { data: ICampaignSurvey[]; id: number }
>(
  `${name}/ChangeCampaignSurveyPositions`,
  async ({ data, id }) => {
    return (await api.put(`${EBaseUrl.API}/Survey/Status/${id}`, data)).data;
  },
  thunkOptions
);

export const CreateSurvey = createAsyncThunk<
  ICreateCampaignSurveyResponse,
  ICreateCampaignSurveyRequest
>(
  `${name}/CreateSurvey`,
  async (formData) => {
    return (await api.post(`${EBaseUrl.API}/Survey`, formData)).data;
  },
  thunkOptions
);

export const RemoveCampaignSurvey = createAsyncThunk<unknown, number>(
  `${name}/RemoveCampaignSurvey`,
  async (id) => {
    return (await api.delete(`${EBaseUrl.API}/Survey/${id}`)).data;
  },
  thunkOptions
);

export const GetCampaignSurveyTemplateById = createAsyncThunk<
  ITemplate,
  number
>(
  `${name}/GetCampaignSurveyTemplateById`,
  async (id: number) => {
    return (await api.get(`${EBaseUrl.API}/SurveyTemplate/${id}`)).data;
  },
  thunkOptions
);

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
  },
  thunkOptions
);

export const GetTemplates = createAsyncThunk<ITemplate[], number>(
  `${name}/GetTemplates`,
  async (id) => {
    return (await api.get(`${EBaseUrl.API}/Templates/${id}`)).data;
  },
  thunkOptions
);

export const GetSurveys = createAsyncThunk<ICampaignSurvey[], number>(
  `${name}/GetSurveys`,
  async (id: number) => {
    return (await api.get(`${EBaseUrl.API}/Surveys/${id}`)).data;
  },
  thunkOptions
);

export const UpdateSurvey = createAsyncThunk<
  unknown,
  { data: IUpdateSurveyRequest; id: number }
>(
  `${name}/UpdateSurvey`,
  async ({ id, data }: { id: number; data: IUpdateSurveyRequest }) => {
    return (await api.put(`${EBaseUrl.API}/Survey/${id}`, data)).data;
  },
  thunkOptions
);

export const UpdateSurveyTemplate = createAsyncThunk<
  unknown,
  { data: IUpdateSurveyTemplateRequest; id: number }
>(
  `${name}/UpdateSurveyTemplate`,
  async ({ id, data }: { id: number; data: IUpdateSurveyTemplateRequest }) => {
    return (await api.put(`${EBaseUrl.API}/SurveyTemplate/Default/${id}`, data))
      .data;
  },
  thunkOptions
);

export const DeleteCampaignTemplate = createAsyncThunk<unknown, number>(
  `${name}/RemoveCampaignTemplate`,
  async (id) => {
    return (await api.delete(`${EBaseUrl.API}/SurveyTemplate/Campaign/${id}`))
      .data;
  },
  thunkOptions
);

export const DeleteSurveyTemplate = createAsyncThunk<unknown, number>(
  `${name}/RemoveSurveyTemplate`,
  async (id) => {
    return (await api.delete(`${EBaseUrl.API}/SurveyTemplate/${id}`)).data;
  },
  thunkOptions
);

export const ApplySurvey = createAsyncThunk<
  unknown,
  { surveyID: string; templateID: number }
>(
  `${name}/ApplySurvey`,
  async (formData) => {
    return (await api.post(`${EBaseUrl.API}/SurveyTemplate/Apply`, formData))
      .data;
  },
  thunkOptions
);

export const ApplyForAllSurveys = createAsyncThunk<
  unknown,
  { campaignID: string; templateID: number }
>(
  `${name}/ApplyForAllSurveys`,
  async (formData) => {
    return (await api.post(`${EBaseUrl.API}/SurveyTemplate/ApplyAll`, formData))
      .data;
  },
  thunkOptions
);

export const GetSurveyLogic = createAsyncThunk<ISurveyLogicResponse, number>(
  `${name}/GetSurveyLogic`,
  async (id: number) => {
    return (await api.get(`${EBaseUrl.API}/SurveyLogic/${id}`)).data;
  },
  thunkOptions
);

export const CreateSurveyLogic = createAsyncThunk<
  unknown,
  { formData: ICreateSurveyLogic; id: number }
>(
  `${name}/CreateSurveyLogic`,
  async ({ formData, id }) => {
    return (await api.post(`${EBaseUrl.API}/SurveyLogic?id=${id}`, formData))
      .data;
  },
  thunkOptions
);

export const DeleteSurveyLogic = createAsyncThunk<unknown, number[]>(
  `${name}/DeleteSurveyLogic`,
  async (data) => {
    return (await api.delete(`${EBaseUrl.API}/SurveyLogic`, { data })).data;
  },
  thunkOptions
);

export const DistributionSchedule = createAsyncThunk<
  unknown,
  { data: IDistributionSchedule; id: number }
>(
  `${name}/DistributionSchedule`,
  async ({ id, data }: { id: number; data: IDistributionSchedule }) => {
    return (await api.put(`${EBaseUrl.API}/Campaign/Schedule/${id}`, data))
      .data;
  },
  thunkOptions
);

const campaignDetailSlice = createSlice({
  initialState,
  name,
  reducers: {
    setSelectedSurvey(state, { payload }) {
      state.selectedSurvey = payload;
    },
    setSurveyForm(state, { payload }) {
      state.form.survey = payload;
    },
    setSettingsForm(state, { payload }) {
      state.form.settings = payload;
    },
    resetCampaignDetails() {
      return initialState;
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
    builder.addCase(GetSurveyLogic.fulfilled, (state, { payload }) => {
      state.surveyLogic = payload;
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
export const selectForm = (state: IState) => state.campaignDetails.form;
export const selectSurveyLogic = (state: IState) =>
  state.campaignDetails.surveyLogic;
export const selectSurveyInfo = (state: IState) => {
  return {
    details: state.campaignDetails.surveyDetails,
    template: state.campaignDetails.surveyTemplate,
  };
};

export const {
  setSelectedSurvey,
  setSettingsForm,
  setSurveyForm,
  resetCampaignDetails,
} = campaignDetailSlice.actions;
export default campaignDetailSlice.reducer;
