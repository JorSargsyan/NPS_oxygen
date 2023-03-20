import { IPaginated } from "./../interfaces/main";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EBaseUrl, defaultTableData } from "store/config/constants";
import { IState } from "store/interfaces/main";
import {
  IAddEditShopCategoryRequest,
  IShopCategories,
  IShopCategoriesState,
} from "store/interfaces/shopCategories";
import { api } from "store/services/apiService";

const name = "SHOP_CATEGORIES";

const initialState: IShopCategoriesState = {
  list:defaultTableData,
};



export const GetShopsCategories = createAsyncThunk<
  IPaginated<IShopCategories>,
  string
>(`${name}/GetShopsCategories`, async (params) => {
  return (await api.get(`${EBaseUrl.API}/admin/categories?${params}`)).data;
});


export const CreateShopCategory= createAsyncThunk<IShopCategories, IAddEditShopCategoryRequest>(
  `${name}/CreateShopCategory`,
  async (formData) => {
    return (await api.post(`${EBaseUrl.API}/admin/categories`, formData)).data;
  }
);

export const EditShopCategory = createAsyncThunk<
IShopCategories,
  { formData: IAddEditShopCategoryRequest; id: number }
>(`${name}/EditShopCategory`, async ({ formData, id }) => {
  return (await api.put(`${EBaseUrl.API}/admin/categories/${id}`, formData))
    .data;
});


export const DeleteShopCategory = createAsyncThunk<IShopCategories, number>(
  `${name}/DeleteShopCategory`,
  async (id) => {
    return (await api.delete(`${EBaseUrl.API}/admin/categories/${id}`)).data;
  }
);


const shopCategoriesSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetShopsCategories.fulfilled, (state, { payload }) => {
      state.list = payload;
    });
  },
});
export const selectShopCategories = (state: IState) =>
  state.shopCategories.list;

export default shopCategoriesSlice.reducer;
