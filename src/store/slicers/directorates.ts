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
  IWithAttachedEmployee,
} from "store/interfaces/directorates";
import thunkOptions from "store/config/thunkOptions";

const name = "AUTH";

const initialState: IDirectoratesState = {
  listData: defaultTableData,
  directorateByID: [],
  filterList: [],
  feedbackEmployeeList: [],
};

export const GetDirectorates = createAsyncThunk<
  IPaginated<IDirectorate>,
  IGridRequest
>(
  `${name}/GetDirectorates`,
  async (formData: IGridRequest) => {
    return (await api.post(`${EBaseUrl.API}/Directorate/Grid`, formData)).data;
  },
  thunkOptions
);

export const GetDirectorateById = createAsyncThunk<IDirectorateById[], number>(
  `${name}/GetDirectorateById`,
  async (id: number) => {
    return (await api.get(`${EBaseUrl.API}/Directorate/${id}`)).data;
  },
  thunkOptions
);

export const AddDirectorate = createAsyncThunk<unknown, IAddDirectorate>(
  `${name}/AddDirectorate`,
  async (formData: IAddDirectorate) => {
    return (await api.post(`${EBaseUrl.API}/Directorate`, formData)).data;
  },
  thunkOptions
);

export const UpdateDirectorate = createAsyncThunk<
  unknown[],
  IUpdateDirectorate
>(
  `${name}/UpdateDirectorate`,
  async (formData: IUpdateDirectorate) => {
    return (
      await api.put(`${EBaseUrl.API}/Directorate/${formData.id}`, formData)
    ).data;
  },
  thunkOptions
);

export const GetAttachedEmployeeFilterList = createAsyncThunk<
  IAttachedEmployee[],
  string
>(
  `${name}/GetAttachedEmployeeFilterList`,
  async (query: string) => {
    return (await api.post(`${EBaseUrl.API}/Directorate/Filter?${query}`)).data;
  },
  thunkOptions
);

export const GetFeedbackRedirectEmployeeList = createAsyncThunk<
  IWithAttachedEmployee[],
  string
>(
  `${name}/GetFeedbackRedirectEmployeeList`,
  async (id: string) => {
    return (
      await api.get(`${EBaseUrl.API}/Directorate/WithAttachedEmployees/${id}`)
    ).data;
  },
  thunkOptions
);

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
    builder.addCase(
      GetFeedbackRedirectEmployeeList.fulfilled,
      (state, { payload }) => {
        state.feedbackEmployeeList = payload;
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

export const selectFeedbackEmployeeList = (state: IState) =>
  state.directorates.feedbackEmployeeList;

export default authSlicer.reducer;
