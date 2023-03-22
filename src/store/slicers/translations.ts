import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { defaultTableData, EBaseUrl } from "store/config/constants";
import { IGridRequest, IPaginated, IState } from "store/interfaces/main";
import { api } from "store/services/apiService";
import {
  IAddEditTranslation,
  IDeleteTranslation,
  ITranslation,
  ITranslationDataByLangId,
  ITranslationsState,
} from "../interfaces/translations";

const name = "TRANSLATIONS";

const initialState: ITranslationsState = {
  list: defaultTableData,
  translationDataByLangId: null,
};

export const GetTranslations = createAsyncThunk<
  IPaginated<ITranslation>,
  IGridRequest
>(`${name}/GetTranslations`, async (data) => {
  return (await api.post(`${EBaseUrl.API}/Translation/Grid`, data)).data;
});

export const AddTranslation = createAsyncThunk<
  ITranslation,
  IAddEditTranslation
>(`${name}/AddTranslation`, async (formData) => {
  return (await api.post(`${EBaseUrl.API}/Translation`, formData)).data;
});

export const DeleteTranslation = createAsyncThunk<
  ITranslation,
  IDeleteTranslation
>(`${name}/DeleteTranslation`, async (params) => {
  return (
    await api.delete(
      `${EBaseUrl.API}/admin/translations/${params.key}/${params.module}`
    )
  ).data;
});

export const GetTranslationsByLangId = createAsyncThunk<
  ITranslationDataByLangId,
  number
>(`${name}/GetTranslationsByLangId`, async (id) => {
  return (await api.get(`${EBaseUrl.API}/Translations/${id}`)).data;
});

const translationsSlice = createSlice({
  initialState,
  name,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetTranslations.fulfilled, (state, { payload }) => {
      state.list = payload;
    });
    builder.addCase(GetTranslationsByLangId.fulfilled, (state, { payload }) => {
      state.translationDataByLangId = payload;
    });
  },
});

export const selectTranslations = (state: IState) => state.translations.list;
export const selectTranslationsByLangId = (state: IState) =>
  state.translations.translationDataByLangId;

export default translationsSlice.reducer;
