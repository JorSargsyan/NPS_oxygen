import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { defaultTableData, EBaseUrl } from "store/config/constants";
import {
  ICauseCategory,
  IChangeCustomerMood,
  IChangeCustomerRootCause,
  IChangeFeedbackStatus,
  IFeedback,
  IFeedbacksState,
} from "store/interfaces/feedback";
import { IGridRequest, IPaginated, IState } from "store/interfaces/main";
import { api } from "store/services/apiService";

const name = "FEEDBACK";

const initialState: IFeedbacksState = {
  listData: defaultTableData,
  causeAndMoodList: [],
};

export const GetFeedbacks = createAsyncThunk<
  IPaginated<IFeedback>,
  IGridRequest
>(`${name}/GetFeedbacks`, async (formData: IGridRequest) => {
  return (await api.post(`${EBaseUrl.API}/Feedback/Grid`, formData)).data;
});

export const ChangeFeedbackStatus = createAsyncThunk<
  unknown,
  IChangeFeedbackStatus
>(`${name}/ChangeFeedbackStatus`, async (data: IChangeFeedbackStatus) => {
  return (
    await api.put(`${EBaseUrl.API}/Feedback/Status/${data.id}`, data.formData)
  ).data;
});

export const GetFeedbackCauseAndMood = createAsyncThunk<unknown, number>(
  `${name}/GetFeedbackCauseAndMood`,
  async (id: number) => {
    return (await api.get(`${EBaseUrl.API}/Feedback/CauseAndMood/${id}`)).data;
  }
);

export const GetFeedbackCauseAndMoodCategoriesList = createAsyncThunk<
  ICauseCategory[]
>(`${name}/GetFeedbackCauseAndMoodCategoriesList`, async () => {
  return (await api.get(`${EBaseUrl.API}/Feedback/CauseCategoriesAndRootCause`))
    .data;
});

export const UpdateCustomerRootCause = createAsyncThunk<
  unknown,
  IChangeCustomerRootCause
>(`${name}/UpdateCustomerRootCause`, async (data: IChangeCustomerRootCause) => {
  return (
    await api.put(
      `${EBaseUrl.API}/Feedback/RootCauses/${data.id}`,
      data.formData
    )
  ).data;
});

export const UpdateCustomerMood = createAsyncThunk<
  unknown,
  IChangeCustomerMood
>(`${name}/UpdateCustomerMood`, async (data: IChangeCustomerMood) => {
  return (
    await api.put(`${EBaseUrl.API}/Feedback/Mood/${data.id}`, data.formData)
  ).data;
});

const FeedbacksSlice = createSlice({
  initialState,
  name,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetFeedbacks.fulfilled, (state, { payload }) => {
      state.listData = payload;
    });
    builder.addCase(
      GetFeedbackCauseAndMoodCategoriesList.fulfilled,
      (state, { payload }) => {
        state.causeAndMoodList = payload;
      }
    );
  },
});

export const selectFeedbacks = (state: IState) => state.feedbacks.listData;
export const selectCauseCategories = (state: IState) =>
  state.feedbacks.causeAndMoodList;

export default FeedbacksSlice.reducer;
