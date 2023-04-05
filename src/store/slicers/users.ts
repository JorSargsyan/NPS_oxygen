import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { defaultTableData, EBaseUrl } from "store/config/constants";
import thunkOptions from "store/config/thunkOptions";
import {
  IPaginated,
  IState,
  IGridRequest,
  IFilterOption,
} from "store/interfaces/main";
import { api } from "store/services/apiService";
import {
  IUser,
  IUsersState,
  IChangePasswordRequest,
  IAddEditUserRequest,
  IUserCompact,
  IUserGroup,
  IViewUserRoleItem,
} from "../interfaces/users";

const name = "USERS";

const initialState: IUsersState = {
  data: defaultTableData,
  userGroups: null,
  userInfo: null,
  userRoles: [],
};

export const GetUsers = createAsyncThunk<
  IPaginated<IUserCompact>,
  IGridRequest
>(
  `${name}/GetUsers`,
  async (data) => {
    return (await api.post(`${EBaseUrl.API}/User/Grid`, data)).data;
  },
  thunkOptions
);

export const GetUserById = createAsyncThunk<IUser, number>(
  `${name}/GetUserById`,
  async (userId: number) => {
    return (await api.get(`${EBaseUrl.API}/User/${userId}`)).data;
  },
  thunkOptions
);

export const GetUserGroups = createAsyncThunk<IUserGroup[]>(
  `${name}/GetUserGroups`,
  async () => {
    return (await api.get(`${EBaseUrl.API}/User/Groups`)).data;
  },
  thunkOptions
);

export const ExportUsers = createAsyncThunk<string, { userIds: number[] }>(
  `${name}/ExportUsers`,
  async (formData) => {
    return (await api.post(`${EBaseUrl.API}/User/Export`, formData)).data;
  },
  thunkOptions
);

export const GetFilterValues = createAsyncThunk<IFilterOption[], string>(
  `${name}/GetFilterValues`,
  async (params: string) => {
    return (await api.post(`${EBaseUrl.API}/User/Filter?${params}`, {})).data;
  },
  thunkOptions
);

export const CreateUser = createAsyncThunk<IUser, IAddEditUserRequest>(
  `${name}/CreateUser`,
  async (formData) => {
    return (await api.post(`${EBaseUrl.API}/admin/users`, formData)).data;
  },
  thunkOptions
);

export const EditUser = createAsyncThunk<
  IUser,
  { formData: IAddEditUserRequest; id: number }
>(
  `${name}/EditUser`,
  async ({ formData, id }) => {
    return (await api.put(`${EBaseUrl.API}/admin/users/${id}`, formData)).data;
  },
  thunkOptions
);

export const GetCurrentUser = createAsyncThunk<IUser>(
  `${name}/GetCurrentUser`,
  async () => {
    return (await api.get(`${EBaseUrl.API}/Profile`)).data;
  },
  thunkOptions
);

export const BlockUser = createAsyncThunk<unknown, number>(
  `${name}/BlockUser`,
  async (id) => {
    return (await api.put(`${EBaseUrl.API}/admin/users/${id}/block`)).data;
  },
  thunkOptions
);

export const UnblockUser = createAsyncThunk<unknown, number>(
  `${name}/UnblockUser`,
  async (id) => {
    return (await api.put(`${EBaseUrl.API}/admin/users/${id}/unblock`)).data;
  },
  thunkOptions
);

export const ChangePassword = createAsyncThunk<unknown, IChangePasswordRequest>(
  `${name}/ChangePassword`,
  async (formData) => {
    return (
      await api.post(`${EBaseUrl.API}/admin/auth/change-password`, formData)
    ).data;
  },
  thunkOptions
);

export const GetUserRoles = createAsyncThunk<IViewUserRoleItem[]>(
  `${name}/GetUserRoles`,
  async () => {
    return (await api.get(`${EBaseUrl.API}/Roles`)).data;
  },
  thunkOptions
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
    builder.addCase(GetUserGroups.fulfilled, (state, { payload }) => {
      state.userGroups = payload;
    });
    builder.addCase(GetUserRoles.fulfilled, (state, { payload }) => {
      state.userRoles = payload;
    });
  },
});

export const selectUsers = (state: IState) => state.users.data;
export const selectUserInfo = (state: IState) => state.users.userInfo;
export const selectUserGroups = (state: IState) => state.users.userGroups;
export const selectUserViewRolesList = (state: IState) => state.users.userRoles;
export default usersSlice.reducer;
