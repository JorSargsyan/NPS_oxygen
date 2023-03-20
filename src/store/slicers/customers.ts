import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { defaultTableData, EBaseUrl } from "store/config/constants";
import { IPaginated, IState } from "store/interfaces/main";
import { api } from "store/services/apiService";
import {
  ICustomer,
  ICustomersState,
  ICustomerExport,
} from "../interfaces/customers";

const name = "CUSTOMERS";

const initialState: ICustomersState = {
  listData: defaultTableData,
};

export const GetCustomers = createAsyncThunk<IPaginated<ICustomer>, string>(
  `${name}/GetCustomers`,
  async (params) => {
    return (await api.get(`${EBaseUrl.API}/admin/customers?${params}`)).data;
  }
);

export const ExportCustomers = createAsyncThunk<ICustomerExport[], string>(
  `${name}/ExportCustomers`,
  async (params) => {
    return (await api.get(`${EBaseUrl.API}/admin/customers/export/data?${params}`))
      .data;
  }
);

export const CustomersExport = createAsyncThunk<ICustomer[], string>(
  `${name}/CustomersExport`,
  async (params) => {
    return (await api.get(`${EBaseUrl.API}/admin/customers/export?${params}`))
      .data;
  }
);

export const BlockCustomer = createAsyncThunk<unknown, number>(
  `${name}/BlockCustomer`,
  async (id) => {
    return (await api.put(`${EBaseUrl.API}/admin/customers/${id}/block`)).data;
  }
);

export const UnblockCustomer = createAsyncThunk<unknown, number>(
  `${name}/UnblockCustomer`,
  async (id) => {
    return (await api.put(`${EBaseUrl.API}/admin/customers/${id}/unblock`))
      .data;
  }
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
