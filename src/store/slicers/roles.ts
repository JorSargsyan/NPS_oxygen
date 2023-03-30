import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EBaseUrl } from "store/config/constants";
import thunkOptions from "store/config/thunkOptions";
import { IGridRequest, IPaginated, IState } from "store/interfaces/main";
import { api } from "store/services/apiService";
import { IRolesState, IRole, IAddEditRoleRequest } from "../interfaces/roles";

const name = "ROLES";

const initialState: IRolesState = {
  userRole: null,
  roles: null,
  permissions: {},
};

export const GetRoles = createAsyncThunk<IPaginated<IRole>, IGridRequest>(
  `${name}/GetRoles`,
  async (formData) => {
    return (await api.post(`${EBaseUrl.API}/Role/Grid`, formData)).data;
  },
  thunkOptions
);

export const GetRoleById = createAsyncThunk<IPaginated<IRole>, number>(
  `${name}/GetRoleById`,
  async (roleId) => {
    return (await api.get(`${EBaseUrl.API}/Role/${roleId}`)).data;
  },
  thunkOptions
);

export const CreateRole = createAsyncThunk<IRole, IAddEditRoleRequest>(
  `${name}/CreateRole`,
  async (formData) => {
    return (await api.post(`${EBaseUrl.API}/Role`, formData)).data;
  },
  thunkOptions
);

export const UpdateRole = createAsyncThunk<
  IRole,
  { formData: IAddEditRoleRequest; id: number }
>(
  `${name}/UpdateRole`,
  async ({ formData, id }) => {
    return (await api.put(`${EBaseUrl.API}/Role/${id}`, formData)).data;
  },
  thunkOptions
);

export const DeleteRole = createAsyncThunk<unknown, number>(
  `${name}/DeleteRole`,
  async (id) => {
    return (await api.delete(`${EBaseUrl.API}/Role/${id}`)).data;
  },
  thunkOptions
);

const rolesSlice = createSlice({
  initialState,
  name,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetRoles.fulfilled, (state, { payload }) => {
      state.roles = payload;
    });
  },
});

export const selectRoles = (state: IState) => state.roles.roles;
export const selectPermissions = (state: IState) => state.roles.permissions;
export const selectUserRole = (state: IState) => state.roles.userRole;

export default rolesSlice.reducer;
