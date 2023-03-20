import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { defaultTableData, EBaseUrl } from "store/config/constants";
import { IPaginated, IState } from "store/interfaces/main";
import { api } from "store/services/apiService";
import {
  IAddEditTranslationRequest,
  ITranslation,
  ITranslationsState,
} from "../interfaces/translations";

const name = "TRANSLATIONS";

const initialState: ITranslationsState = {
  list: defaultTableData,
};

export const GetTranslations = createAsyncThunk<
  IPaginated<ITranslation>,
  string
>(`${name}/GetTranslations`, async (params) => {
  return (await api.get(`${EBaseUrl.API}/admin/translations?${params}`)).data;
});

export const AddTranslation = createAsyncThunk<
  ITranslation,
  IAddEditTranslationRequest
>(`${name}/AddTranslation`, async (formData) => {
  return (await api.post(`${EBaseUrl.API}/admin/translations`, formData)).data;
});

export const EditTranslation = createAsyncThunk<
  ITranslation,
  { formData: IAddEditTranslationRequest; id: number }
>(`${name}/EditTranslation`, async ({ formData, id }) => {
  return (await api.put(`${EBaseUrl.API}/admin/translations/${id}`, formData))
    .data;
});

export const DeleteTranslation = createAsyncThunk<ITranslation, number>(
  `${name}/DeleteTranslation`,
  async (id) => {
    return (await api.delete(`${EBaseUrl.API}/admin/translations/${id}`)).data;
  }
);

const translationsSlice = createSlice({
  initialState,
  name,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetTranslations.fulfilled, (state, { payload }) => {
      state.list = payload;
    });
  },
});

export const selectTranslations = (state: IState) => state.translations.list;

export default translationsSlice.reducer;
