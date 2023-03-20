import { api } from "store/services/apiService";
import {
  IAddEditShopRequest,
  IShops,
  IShopsState,
} from "./../interfaces/shops";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EBaseUrl, defaultTableData } from "store/config/constants";
import { IPaginated, IState } from "store/interfaces/main";

const name = "SHOPS";

const initialState: IShopsState = {
  list: defaultTableData,
};

export const GetShops = createAsyncThunk<IPaginated<IShops>, string>(
  `${name}/GetShops`,
  async (params) => {
    return (await api.get(`${EBaseUrl.API}/admin/shops?${params}`)).data;
  }
);

export const CreateShop = createAsyncThunk<IShops, IAddEditShopRequest>(
  `${name}/CreateShop`,
  async (formData) => {
    return (await api.post(`${EBaseUrl.API}/admin/shops`, formData)).data;
  }
);

export const EditShop = createAsyncThunk<
IShops,
  { formData: IAddEditShopRequest; id: number }
>(`${name}/EditShop`, async ({ formData, id }) => {
  return (await api.put(`${EBaseUrl.API}/admin/shops/${id}`, formData))
    .data;
});

export const DeleteShop = createAsyncThunk<IShops, number>(
  `${name}/DeleteShop`,
  async (id) => {
    return (await api.delete(`${EBaseUrl.API}/admin/shops/${id}`)).data;
  }
);

export const ActivateShop = createAsyncThunk<IShops, number>(
  `${name}/ActivateShop`,
  async (id) => {
    return (await api.put(`${EBaseUrl.API}/admin/shops/${id}/activate`)).data;
  }
);

export const DeactivateShop = createAsyncThunk<IShops, number>(
  `${name}/DeactivateShop`,
  async (id) => {
    return (await api.put(`${EBaseUrl.API}/admin/shops/${id}/deactivate`)).data;
  }
);
const shopsSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetShops.fulfilled, (state, { payload }) => {
      state.list = payload;
    });
  },
});
export const selectShops = (state: IState) => state.shops.list;

export default shopsSlice.reducer;
