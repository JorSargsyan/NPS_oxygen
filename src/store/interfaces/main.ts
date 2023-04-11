import { IAuthState } from "./auth";
import { ICampaignState } from "./campaigns";
import { ICommonState } from "./common";
import { ICustomersState } from "./customers";
import { IErrorsState } from "./errors";
import { IRolesState } from "./roles";
import { ITranslationsState } from "./translations";
import { IUsersState } from "./users";
import { IFeedbacksState } from "./feedback";
import { ICampaignDetailsState } from "./campaignDetails";
import { IDirectoratesState } from "./directorates";
import { ISurveyPreviewState } from "./surveyPreview";
import { IDashboardState } from "./dashboard";
export interface IPaginated<T> {
  totalDisplayRecords: number;
  totalRecords: number;
  allIds: number[];
  displayData: T[];
}

export interface IGridRequest {
  start: number;
  length: number;
  sortColumn: string;
  sortDirection: string;
  conditionMatch: number;
  search: string;
  isArchived: boolean;
  filters: any[];
  scoreFilter: any[];
}

export interface IState {
  errors: IErrorsState;
  common: ICommonState;
  auth: IAuthState;
  users: IUsersState;
  roles: IRolesState;
  campaigns: ICampaignState;
  campaignDetails: ICampaignDetailsState;
  translations: ITranslationsState;
  customers: ICustomersState;
  feedbacks: IFeedbacksState;
  surveyPreview: ISurveyPreviewState;
  directorates: IDirectoratesState;
  dashboard: IDashboardState;
}

export interface IFilterOption {
  additionalInfo: string | null;
  id: number;
  label: string;
  value: IFilterOption | string | null;
  type: IFilterOption | string | null;
}
