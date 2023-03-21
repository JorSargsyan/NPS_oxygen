import { combineReducers } from "redux";
import common from "./common";
import errors from "./errors";
import auth from "./auth";
import users from "./users";
import roles from "./roles";
import translations from "./translations";
import customers from "./customers";

const reducers = {
  errors,
  common,
  auth,
  users,
  roles,
  translations,
  customers,
};

const combinedReducers = combineReducers(reducers);
export default combinedReducers;
