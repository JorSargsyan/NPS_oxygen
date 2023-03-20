import { createSlice } from "@reduxjs/toolkit";
import { IErrorsState } from "../interfaces/errors";

const name = "ERRORS";

const initialState: IErrorsState = {
  error: null,
};

const errorsSlice = createSlice({
  initialState,
  name,
  reducers: {
    setError(state, { payload }) {
      state.error = payload;
    },
  },
});

export const { setError } = errorsSlice.actions;
export default errorsSlice.reducer;
