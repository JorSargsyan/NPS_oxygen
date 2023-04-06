import { combineReducers } from "redux";
import common from "./common";
import errors from "./errors";
import auth from "./auth";
import users from "./users";
import roles from "./roles";
import translations from "./translations";
import customers from "./customers";
import feedbacks from "./feedback";
import surveyPreview from "./surveyPreview";
import campaigns from "./campaigns";
import campaignDetails from "./campaignDetail";
import directorates from "./directorates";

const reducers = {
  errors,
  common,
  auth,
  campaigns,
  users,
  campaignDetails,
  roles,
  translations,
  customers,
  surveyPreview,
  feedbacks,
  directorates,
};

const combinedReducers = combineReducers(reducers);
export default combinedReducers;
