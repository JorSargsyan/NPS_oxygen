import { combineReducers } from "redux";
import common from "./common";
import errors from "./errors";
import auth from "./auth";
import users from "./users";
import roles from "./roles";
import translations from "./translations";
import customers from "./customers";
import notifications from "./notifications";
import usersNotifications from "./usersNotifications";
import shops from "./shops";
import shopCategories from "./shopCategories";
import subscriptionPlans from "./subscriptionPlans";

const reducers = {
  errors,
  common,
  auth,
  users,
  roles,
  translations,
  customers,
  notifications,
  usersNotifications,
  shops,
  shopCategories,
  subscriptionPlans,
};

const combinedReducers = combineReducers(reducers);
export default combinedReducers;
