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
};

export const CreateCustomer = createAsyncThunk<
  { hash: string },
  { hash: string }
>(
  `${name}/CreateCustomer`,
  async (formData) => {
    return (await api.post(`${EBaseUrl.API}/customer`, formData)).data;
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

const surveyPreviewSlice = createSlice({
  initialState,
  name,
  reducers: {},
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

export default surveyPreviewSlice.reducer;
