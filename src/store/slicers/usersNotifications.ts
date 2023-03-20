import {
  IUserNotification,
  IUserNotificationState,
  ISendUserNotificationRequest,
} from "../interfaces/userNotifications";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { defaultTableData, EBaseUrl } from "store/config/constants";
import { IPaginated, IState } from "store/interfaces/main";
import { api } from "store/services/apiService";

const name = "USERNOTIFICATIONS";

const initialState: IUserNotificationState = {
  list: defaultTableData,
};

export const GetUserNotifications = createAsyncThunk<
  IPaginated<IUserNotification>,
  string
>(`${name}/GetUserNotifications`, async (params) => {
  return (await api.get(`${EBaseUrl.API}/admin/user-notifications?${params}`))
    .data;
});

export const CreateUserNotification = createAsyncThunk<
  IUserNotification,
  ISendUserNotificationRequest
>(`${name}/CreateUserNotification`, async (formData) => {
  return (await api.post(`${EBaseUrl.API}/admin/user-notifications`, formData))
    .data;
});


export const DeleteUserNotification = createAsyncThunk<
  IUserNotification,
  number
>(`${name}/DeleteUSerNotification`, async (id) => {
  return (await api.delete(`${EBaseUrl.API}/admin/notifications/${id}/user-notifications`))
    .data;
});


const userNotificationsSlice = createSlice({
  initialState,
  name,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetUserNotifications.fulfilled, (state, { payload }) => {
      state.list = payload;
    });
  },
});

export const selectUserNotifications = (state: IState) => state.usersNotifications.list;

export default userNotificationsSlice.reducer;
