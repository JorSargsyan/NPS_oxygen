import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EBaseUrl, defaultTableData } from "store/config/constants";
import { IPaginated, IState } from "store/interfaces/main";
import {
  IAddEditSubscriptionPlanRequest,
  ISubscriptionPlans,
  ISubscriptionPlansState,
} from "store/interfaces/subscriptionPlans";
import { api } from "store/services/apiService";

const name = "SUBSCRIPTION_PLANS";

const initialState: ISubscriptionPlansState = {
  list: defaultTableData,
};

export const GetSubscriptionPlans = createAsyncThunk<
  IPaginated<ISubscriptionPlans>,
  string
>(`${name}/GetSubscriptionPlans`, async (params) => {
  return (await api.get(`${EBaseUrl.API}/admin/subscription-plans?${params}`))
    .data;
});

export const CreateSubscriptionPlan = createAsyncThunk<
  ISubscriptionPlans,
  IAddEditSubscriptionPlanRequest
>(`${name}/CreateSubscriptionPlan`, async (formData) => {
  return (await api.post(`${EBaseUrl.API}/admin/subscription-plans`, formData))
    .data;
});

export const EditSubscriptionPlan = createAsyncThunk<
  ISubscriptionPlans,
  { formData: IAddEditSubscriptionPlanRequest; id: number }
>(`${name}/EditSubscriptionPlan`, async ({ formData, id }) => {
  return (
    await api.put(`${EBaseUrl.API}/admin/subscription-plans/${id}`, formData)
  ).data;
});

export const DeleteSubscriptionPlan = createAsyncThunk<
  ISubscriptionPlans,
  number
>(`${name}/DeleteSubscriptionPlan`, async (id) => {
  return (await api.delete(`${EBaseUrl.API}/admin/subscription-plans/${id}`))
    .data;
});


export const DeactivateSubscriptionPlan = createAsyncThunk<ISubscriptionPlans, number>(
  `${name}/DeactivateSubscriptionPlan`,
  async (id) => {
    return (await api.put(`${EBaseUrl.API}/admin/subscription-plans/${id}/deactivate`)).data;
  }
);

export const ActivateSubscriptionPlan= createAsyncThunk<ISubscriptionPlans, number>(
  `${name}/ActivateSubscriptionPlan`,
  async (id) => {
    return (await api.put(`${EBaseUrl.API}/admin/subscription-plans/${id}/activate`)).data;
  }
);


const subscriptionPlansSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetSubscriptionPlans.fulfilled, (state, { payload }) => {
      state.list = payload;
    });
  },
});
export const selectSubscriptionPlan = (state: IState) =>
  state.subscriptionPlans.list;

export default subscriptionPlansSlice.reducer;
