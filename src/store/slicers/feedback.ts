import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { defaultTableData, EBaseUrl } from "store/config/constants";
import {
  IChangeFeedbackStatus,
  IFeedback,
  IFeedbacksState,
} from "store/interfaces/feedback";
import { IGridRequest, IPaginated, IState } from "store/interfaces/main";
import { api } from "store/services/apiService";

const name = "FEEDBACK";

const initialState: IFeedbacksState = {
  listData: defaultTableData,
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

const FeedbacksSlice = createSlice({
  initialState,
  name,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetFeedbacks.fulfilled, (state, { payload }) => {
      state.listData = payload;
    });
  },
});

export const selectFeedbacks = (state: IState) => state.feedbacks.listData;

export default FeedbacksSlice.reducer;
