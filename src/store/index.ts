import { Action, configureStore } from "@reduxjs/toolkit";
import { IState } from "./interfaces/main";
import combinedReducers from "./slicers";

const rootReducer = (state: IState | undefined, action: Action) => {
  if (action.type === "AUTH/signOut") {
    state = undefined;
  }
  return combinedReducers(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export { store };
