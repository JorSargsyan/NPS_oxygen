import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { defaultTableData, EBaseUrl } from "store/config/constants";
import {
  IAddNote,
  ICauseAndMoodRes,
  ICauseCategory,
  IChangeCustomerMood,
  IChangeCustomerRootCause,
  IChangeFeedbackStatus,
  IFeedback,
  IFeedbackDetails,
  IFeedbackLog,
  IFeedbackNoteHistory,
  IFeedbackNotes,
  IFeedbacksState,
  IUpdateManager,
  IUpdateNote,
} from "store/interfaces/feedback";
import { IGridRequest, IPaginated, IState } from "store/interfaces/main";
import { api } from "store/services/apiService";

const name = "FEEDBACK";

const initialState: IFeedbacksState = {
  listData: defaultTableData,
  causeAndMoodList: [],
  feedbackDetails: null,
  feedbackNotes: [],
  feedbackLogs: [],
  feedbackNoteHistory: [],
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

export const GetFeedbackCauseAndMood = createAsyncThunk<
  ICauseAndMoodRes,
  number
>(`${name}/GetFeedbackCauseAndMood`, async (id: number) => {
  return (await api.get(`${EBaseUrl.API}/Feedback/CauseAndMood/${id}`)).data;
});

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

export const GetFeedbackDetail = createAsyncThunk<IFeedbackDetails, number>(
  `${name}/GetFeedbackDetail`,
  async (id: number) => {
    return (await api.get(`${EBaseUrl.API}/Feedback/${id}`)).data;
  }
);

export const GetFeedbackNotes = createAsyncThunk<IFeedbackNotes[], number>(
  `${name}/GetFeedbackNotes`,
  async (params: number) => {
    return (await api.get(`${EBaseUrl.API}/Notes?id=${params}`)).data;
  }
);

export const AddFeedbackNote = createAsyncThunk<unknown, IAddNote>(
  `${name}/AddFeedbackNote`,
  async (data: IAddNote) => {
    return (await api.post(`${EBaseUrl.API}/Note`, data)).data;
  }
);

export const UpdateFeedbackNote = createAsyncThunk<unknown, IUpdateNote>(
  `${name}/UpdateFeedbackNote`,
  async (data: IUpdateNote) => {
    return (await api.put(`${EBaseUrl.API}/Note/${data.noteID}`, data.formData))
      .data;
  }
);

export const DeleteFeedbackNote = createAsyncThunk<unknown, number>(
  `${name}/DeleteFeedbackNote`,
  async (noteID: number) => {
    return (await api.delete(`${EBaseUrl.API}/Note/${noteID}`)).data;
  }
);

export const GetFeedbackDeletedNoteHistory = createAsyncThunk<
  IFeedbackNoteHistory[],
  string
>(`${name}/GetFeedbackDeletedNoteHistory`, async (params: string) => {
  return (await api.get(`${EBaseUrl.API}/Note/Deleted/Logs?${params}`)).data;
});

export const GetFeedbackEditedNoteHistory = createAsyncThunk<
  IFeedbackNoteHistory[],
  string
>(`${name}/GetFeedbackEditedNoteHistory`, async (params: string) => {
  return (await api.get(`${EBaseUrl.API}/Note/Edited/Logs?${params}`)).data;
});

export const UpdateFeedbackManager = createAsyncThunk<unknown, IUpdateManager>(
  `${name}/UpdateFeedbackManager`,
  async (data: IUpdateManager) => {
    return (await api.put(`${EBaseUrl.API}/Feedback/Assign`, data)).data;
  }
);

export const GetFeedbackLogs = createAsyncThunk<IFeedbackLog[], string>(
  `${name}/GetFeedbackLogs`,
  async (id: string) => {
    return (await api.get(`${EBaseUrl.API}/Feedback/Logs/${id}`)).data;
  }
);

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
    builder.addCase(GetFeedbackDetail.fulfilled, (state, { payload }) => {
      state.feedbackDetails = payload;
    });
    builder.addCase(GetFeedbackNotes.fulfilled, (state, { payload }) => {
      state.feedbackNotes = payload;
    });

    builder.addCase(
      GetFeedbackDeletedNoteHistory.fulfilled,
      (state, { payload }) => {
        state.feedbackNoteHistory = payload;
      }
    );
    builder.addCase(
      GetFeedbackEditedNoteHistory.fulfilled,
      (state, { payload }) => {
        state.feedbackNoteHistory = payload;
      }
    );
    builder.addCase(GetFeedbackLogs.fulfilled, (state, { payload }) => {
      state.feedbackLogs = payload;
    });
  },
});

export const selectFeedbacks = (state: IState) => state.feedbacks.listData;
export const selectCauseCategories = (state: IState) =>
  state.feedbacks.causeAndMoodList;
export const selectFeedbackDetails = (state: IState) =>
  state.feedbacks.feedbackDetails;
export const selectFeedbackNotes = (state: IState) =>
  state.feedbacks.feedbackNotes;
export const selectFeedbackLogs = (state: IState) =>
  state.feedbacks.feedbackLogs;
export const selectFeedbackNoteHistory = (state: IState) =>
  state.feedbacks.feedbackNoteHistory;

export default FeedbacksSlice.reducer;
