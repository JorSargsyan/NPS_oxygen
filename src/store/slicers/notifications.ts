import {
  INotification,
  INotificationState,
  IAddEditNotificationRequest,
} from "../interfaces/notifications";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { defaultTableData, EBaseUrl } from "store/config/constants";
import { IPaginated, IState } from "store/interfaces/main";
import { api } from "store/services/apiService";

const name = "NOTIFICATIONS";

const initialState: INotificationState = {
  list: defaultTableData,
};

export const GetNotifications = createAsyncThunk<
  IPaginated<INotification>,
  string
>(`${name}/GetNotifications`, async (params) => {
  return (await api.get(`${EBaseUrl.API}/admin/notifications?${params}`)).data;
});

export const CreateNotification = createAsyncThunk<
  INotification,
  IAddEditNotificationRequest
>(`${name}/CreateNotification`, async (formData) => {
  return (await api.post(`${EBaseUrl.API}/admin/notifications`, formData)).data;
});

export const EditNotification = createAsyncThunk<
  INotification,
  { formData: IAddEditNotificationRequest; id: number }
>(`${name}/EditNotification`, async ({ formData, id }) => {
  return (await api.put(`${EBaseUrl.API}/admin/notifications/${id}`, formData))
    .data;
});

export const DeleteNotification = createAsyncThunk<INotification, number>(
  `${name}/DeleteNotification`,
  async (id) => {
    return (await api.delete(`${EBaseUrl.API}/admin/notifications/${id}`)).data;
  }
);

const notificationsSlice = createSlice({
  initialState,
  name,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetNotifications.fulfilled, (state, { payload }) => {
      state.list = payload;
    });
  },
});

export const selectNotifications = (state: IState) => state.notifications.list;

export default notificationsSlice.reducer;
