import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EBaseUrl } from "store/config/constants";
import { IState } from "store/interfaces/main";
import { api } from "store/services/apiService";
import {
  IRolesState,
  IRole,
  IAddEditRoleRequest,
  IUserRole,
  IAttachDeattachRoleRequest,
} from "../interfaces/roles";

const name = "ROLES";

const initialState: IRolesState = {
  userRole: null,
  roles: [],
  permissions: {},
};

export const GetUserRole = createAsyncThunk<IRole>(
  `${name}/GetUserRole`,
  async () => {
    return (await api.get(`${EBaseUrl.API}/admin/user/roles`)).data;
  }
);

export const GetPermissions = createAsyncThunk(
  `${name}/GetPermissions`,
  async () => {
    return (await api.get(`${EBaseUrl.API}/admin/permissions`)).data;
  }
);

export const AttachRole = createAsyncThunk(
  `${name}/AttachRole`,
  async (formData: IAttachDeattachRoleRequest) => {
    return (await api.post(`${EBaseUrl.API}/admin/user/roles`, formData)).data;
  }
);

export const DeattachRole = createAsyncThunk(
  `${name}/DeattachRole`,
  async (formData: IAttachDeattachRoleRequest) => {
    return (await api.put(`${EBaseUrl.API}/admin/user/roles`, formData)).data;
  }
);

export const GetRoles = createAsyncThunk<IRole[]>(
  `${name}/GetRoles`,
  async () => {
    return (await api.get(`${EBaseUrl.API}/admin/roles`)).data;
  }
);

export const GetUserRoles = createAsyncThunk<IUserRole>(
  `${name}/GetUserRoles`,
  async () => {
    return (await api.get(`${EBaseUrl.API}/admin/user/roles`)).data;
  }
);

export const CreateRole = createAsyncThunk<IRole, IAddEditRoleRequest>(
  `${name}/CreateRole`,
  async (formData) => {
    return (await api.post(`${EBaseUrl.API}/admin/roles`, formData)).data;
  }
);

export const UpdateRole = createAsyncThunk<
  IRole,
  { formData: IAddEditRoleRequest; id: number }
>(`${name}/UpdateRole`, async ({ formData, id }) => {
  return (await api.put(`${EBaseUrl.API}/admin/roles/${id}`, formData)).data;
});

export const DeleteRole = createAsyncThunk<IRole, number>(
  `${name}/UpdateRole`,
  async (id) => {
    return (await api.delete(`${EBaseUrl.API}/admin/roles/${id}`)).data;
  }
);

const rolesSlice = createSlice({
  initialState,
  name,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetUserRole.fulfilled, (state, { payload }) => {
      state.userRole = payload;
    });
    builder.addCase(GetRoles.fulfilled, (state, { payload }) => {
      state.roles = payload;
    });
    builder.addCase(GetPermissions.fulfilled, (state, { payload }) => {
      state.permissions = payload.permissions;
    });
  },
});

export const selectRoles = (state: IState) => state.roles.roles;
export const selectPermissions = (state: IState) => state.roles.permissions;
export const selectUserRole = (state: IState) => state.roles.userRole;

export default rolesSlice.reducer;
