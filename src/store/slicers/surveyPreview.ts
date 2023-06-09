import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EBaseUrl } from "store/config/constants";
import thunkOptions from "store/config/thunkOptions";
import { IState } from "store/interfaces/main";
import {
  IQuestionConfig,
  ISurveyPreviewState,
  IQuestionRequest,
  IQuestionDetails,
  IQuestionAnswerRequest,
} from "store/interfaces/surveyPreview";
import { api } from "store/services/apiService";

const name = "SURVEY_PREVIEW";

const initialState: ISurveyPreviewState = {
  questionConfig: null,
  questionDetails: null,
  activeTemplateID: 0
};

export const CreateCustomer = createAsyncThunk<
  { hash: string },
  { hash: string }
>(
  `${name}/CreateCustomer`,
  async (formData) => {
    return (await api.post(`${EBaseUrl.API}/Customer`, formData)).data;
  },
  thunkOptions
);

export const GetQuestionDetails = createAsyncThunk<
  IQuestionDetails,
  IQuestionRequest
>(
  `${name}/GetQuestionDetails`,
  async (formData) => {
    return (await api.post(`${EBaseUrl.API}/Question/Next`, formData)).data;
  },
  thunkOptions
);

export const GetQuestionConfiguration = createAsyncThunk<
  IQuestionConfig,
  string
>(
  `${name}/GetQuestionConfiguration`,
  async (hash) => {
    return (await api.get(`${EBaseUrl.API}/Question/${hash}`)).data;
  },
  thunkOptions
);

export const SubmitAnswer = createAsyncThunk<unknown, IQuestionAnswerRequest>(
  `${name}/SubmitAnswer`,
  async (formData) => {
    return (await api.post(`${EBaseUrl.API}/Question/Answer`, formData)).data;
  },
  thunkOptions
);

export const SkipQuestion = createAsyncThunk<unknown, IQuestionAnswerRequest>(
  `${name}/SkipQuestion`,
  async (formData) => {
    return (await api.patch(`${EBaseUrl.API}/Question/Skip`, formData)).data;
  },
  thunkOptions
);

export const SetQuestionFinished = createAsyncThunk<unknown, { hash: string }>(
  `${name}/SetQuestionFinished`,
  async (formData) => {
    return (await api.patch(`${EBaseUrl.API}/Question/Finish`, formData)).data;
  },
  thunkOptions
);

const surveyPreviewSlice = createSlice({
  initialState,
  name,
  reducers: {
    setActiveTemplate(state,{payload}){
      state.activeTemplateID = payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      GetQuestionConfiguration.fulfilled,
      (state, { payload }) => {
        state.questionConfig = payload;
      }
    );
    builder.addCase(GetQuestionDetails.fulfilled, (state, { payload }) => {
      state.questionDetails = payload;
    });
  },
});

export const selectQuestion = (state: IState) => {
  return {
    config: state.surveyPreview.questionConfig,
    details: state.surveyPreview.questionDetails,
  };
};
export const selectActiveTemplate = (state:IState) => state.surveyPreview.activeTemplateID;

export const {setActiveTemplate} = surveyPreviewSlice.actions;

export default surveyPreviewSlice.reducer;
