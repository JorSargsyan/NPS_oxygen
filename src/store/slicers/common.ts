import { createSlice } from "@reduxjs/toolkit";
import { ETheme } from "../config/constants";
import { ICommonState } from "../interfaces/common";
import { IState } from "../interfaces/main";

const name = "COMMON";

const initialState: ICommonState = {
  loading: false,
  theme: ETheme.Light,
};

const commonSlice = createSlice({
  initialState,
  name,
  reducers: {
    setLoading(state, { payload }) {
      state.loading = payload;
    },

    setTheme(state, { payload }) {
      state.theme = payload;
    },
  },
});

export const { setLoading, setTheme } = commonSlice.actions;
export const selectLoadingState = (state: IState) => state.common.loading;
export const selectTheme = (state: IState) => state.common.theme;
export default commonSlice.reducer;
