import { IShopsState } from "./shops";
import { INotificationState } from "./notifications";
import { IAuthState } from "./auth";
import { ICommonState } from "./common";
import { ICustomersState } from "./customers";
import { IErrorsState } from "./errors";
import { IRolesState } from "./roles";
import { ITranslationsState } from "./translations";
import { IUsersState } from "./users";
import { IUserNotificationState } from "./userNotifications";
import { ISubscriptionPlansState } from "./subscriptionPlans";
import { IShopCategoriesState } from "./shopCategories";

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
  notifications: INotificationState;
  usersNotifications: IUserNotificationState;
  errors: IErrorsState;
  common: ICommonState;
  auth: IAuthState;
  users: IUsersState;
  roles: IRolesState;
  translations: ITranslationsState;
  customers: ICustomersState;
  shops: IShopsState;
  shopCategories: IShopCategoriesState;
  subscriptionPlans: ISubscriptionPlansState;
}
