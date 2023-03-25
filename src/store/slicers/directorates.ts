import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { defaultTableData, EBaseUrl } from "../config/constants";
import { api } from "../services/apiService";
import { IGridRequest, IPaginated, IState } from "store/interfaces/main";
import {
  IAddDirectorate,
  IAttachedEmployee,
  IDirectorate,
  IDirectorateById,
  IDirectoratesState,
  IUpdateDirectorate,
} from "store/interfaces/directorates";

const name = "AUTH";

const initialState: IDirectoratesState = {
  listData: defaultTableData,
  directorateByID: [],
  filterList: [],
};

export const GetDirectorates = createAsyncThunk<
  IPaginated<IDirectorate>,
  IGridRequest
>(`${name}/GetDirectorates`, async (formData: IGridRequest) => {
  return (await api.post(`${EBaseUrl.API}/Directorate/Grid`, formData)).data;
});

export const GetDirectorateById = createAsyncThunk<IDirectorateById[], number>(
  `${name}/GetDirectorateById`,
  async (id: number) => {
    return (await api.get(`${EBaseUrl.API}/Directorate/${id}`)).data;
  }
);

export const AddDirectorate = createAsyncThunk<unknown, IAddDirectorate>(
  `${name}/AddDirectorate`,
  async (formData: IAddDirectorate) => {
    return (await api.post(`${EBaseUrl.API}/Directorate`, formData)).data;
  }
);

export const UpdateDirectorate = createAsyncThunk<
  unknown[],
  IUpdateDirectorate
>(`${name}/UpdateDirectorate`, async (formData: IUpdateDirectorate) => {
  return (await api.put(`${EBaseUrl.API}/Directorate/${formData.id}`, formData))
    .data;
});

export const GetAttachedEmployeeFilterList = createAsyncThunk<
  IAttachedEmployee[],
  string
>(`${name}/GetAttachedEmployeeFilterList`, async (query: string) => {
  return (await api.post(`${EBaseUrl.API}/Directorate/Filter?${query}`)).data;
});

const authSlicer = createSlice({
  initialState,
  name,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetDirectorates.fulfilled, (state, { payload }) => {
      state.listData = payload;
    });
    builder.addCase(GetDirectorateById.fulfilled, (state, { payload }) => {
      state.directorateByID = payload;
    });
    builder.addCase(
      GetAttachedEmployeeFilterList.fulfilled,
      (state, { payload }) => {
        state.filterList = payload;
      }
    );
  },
});

export const selectDirectorates = (state: IState) =>
  state.directorates.listData;

export const selectDirectorateByID = (state: IState) =>
  state.directorates.directorateByID;

export const selectAttachedEmployeeFilteredList = (state: IState) =>
  state.directorates.filterList;

export default authSlicer.reducer;
