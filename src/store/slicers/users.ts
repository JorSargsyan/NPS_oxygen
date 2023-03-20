import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { defaultTableData, EBaseUrl } from "store/config/constants";
import { IPaginated, IState } from "store/interfaces/main";
import { api } from "store/services/apiService";
import {
  IUser,
  IUsersState,
  IChangePasswordRequest,
  IAddEditUserRequest,
} from "../interfaces/users";

const name = "USERS";

const initialState: IUsersState = {
  data: defaultTableData,
  userInfo: null,
};

export const GetUsers = createAsyncThunk<IPaginated<IUser>, string>(
  `${name}/GetUsers`,
  async (params) => {
    return (await api.get(`${EBaseUrl.API}/admin/users?${params}`)).data;
  }
);

export const CreateUser = createAsyncThunk<IUser, IAddEditUserRequest>(
  `${name}/CreateUser`,
  async (formData) => {
    return (await api.post(`${EBaseUrl.API}/admin/users`, formData)).data;
  }
);

export const EditUser = createAsyncThunk<
  IUser,
  { formData: IAddEditUserRequest; id: number }
>(`${name}/EditUser`, async ({ formData, id }) => {
  return (await api.put(`${EBaseUrl.API}/admin/users/${id}`, formData)).data;
});

export const GetCurrentUser = createAsyncThunk<IUser>(
  `${name}/GetCurrentUser`,
  async () => {
    return (await api.get(`${EBaseUrl.API}/admin/users/user`)).data;
  }
);

export const BlockUser = createAsyncThunk<unknown, number>(
  `${name}/BlockUser`,
  async (id) => {
    return (await api.put(`${EBaseUrl.API}/admin/users/${id}/block`)).data;
  }
);

export const UnblockUser = createAsyncThunk<unknown, number>(
  `${name}/UnblockUser`,
  async (id) => {
    return (await api.put(`${EBaseUrl.API}/admin/users/${id}/unblock`)).data;
  }
);

export const ChangePassword = createAsyncThunk<unknown, IChangePasswordRequest>(
  `${name}/ChangePassword`,
  async (formData) => {
    return (
      await api.post(`${EBaseUrl.API}/admin/auth/change-password`, formData)
    ).data;
  }
);

const usersSlice = createSlice({
  initialState,
  name,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetUsers.fulfilled, (state, { payload }) => {
      state.data = payload;
    });
    builder.addCase(GetCurrentUser.fulfilled, (state, { payload }) => {
      state.userInfo = payload;
    });
  },
});

export const selectUsers = (state: IState) => state.users.data;
export const selectUserInfo = (state: IState) => state.users.userInfo;
export default usersSlice.reducer;
