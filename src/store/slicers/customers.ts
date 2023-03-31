import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { defaultTableData, EBaseUrl } from "store/config/constants";
import thunkOptions from "store/config/thunkOptions";
import { IGridRequest, IPaginated, IState } from "store/interfaces/main";
import { api } from "store/services/apiService";
import {
  ICustomer,
  ICustomersState,
  IChangeCustomerStatus,
} from "../interfaces/customers";

const name = "CUSTOMERS";

const initialState: ICustomersState = {
  listData: defaultTableData,
};

export const GetCustomers = createAsyncThunk<
  IPaginated<ICustomer>,
  IGridRequest
>(
  `${name}/GetCustomers`,
  async (formData: IGridRequest) => {
    return (await api.post(`${EBaseUrl.API}/Customer/Grid`, formData)).data;
  },
  thunkOptions
);

export const ChangeCustomerStatus = createAsyncThunk<
  unknown,
  IChangeCustomerStatus
>(
  `${name}/ChangeCustomerStatus`,
  async (data: IChangeCustomerStatus) => {
    return (
      await api.put(`${EBaseUrl.API}/Customer/Status/${data.id}`, data.formData)
    ).data;
  },
  thunkOptions
);

export const ExportCustomers = createAsyncThunk<
  string,
  { customerIDs: number[] }
>(
  `${name}/ExportCustomers`,
  async (formData) => {
    return (await api.post(`${EBaseUrl.API}/Customer/Export`, formData)).data;
  },
  thunkOptions
);

export const CustomersExport = createAsyncThunk<ICustomer[], string>(
  `${name}/CustomersExport`,
  async (params) => {
    return (await api.get(`${EBaseUrl.API}/admin/customers/export?${params}`))
      .data;
  },
  thunkOptions
);

export const BlockCustomer = createAsyncThunk<unknown, number>(
  `${name}/BlockCustomer`,
  async (id) => {
    return (await api.put(`${EBaseUrl.API}/admin/customers/${id}/block`)).data;
  },
  thunkOptions
);

export const UnblockCustomer = createAsyncThunk<unknown, number>(
  `${name}/UnblockCustomer`,
  async (id) => {
    return (await api.put(`${EBaseUrl.API}/admin/customers/${id}/unblock`))
      .data;
  },
  thunkOptions
);

const customersSlice = createSlice({
  initialState,
  name,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetCustomers.fulfilled, (state, { payload }) => {
      state.listData = payload;
    });
  },
});

export const selectCustomers = (state: IState) => state.customers.listData;

export default customersSlice.reducer;
