import { combineReducers } from "redux";
import common from "./common";
import errors from "./errors";
import auth from "./auth";
import users from "./users";
import roles from "./roles";
import translations from "./translations";
import customers from "./customers";
import campaigns from "./campaigns";

const reducers = {
  errors,
  common,
  auth,
  campaigns,
  users,
  roles,
  translations,
  customers,
};

const combinedReducers = combineReducers(reducers);
export default combinedReducers;
