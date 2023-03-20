import { IShopsState } from './shops';
import { INotificationState } from "./notifications";
import { IAuthState } from "./auth";
import { ICommonState } from "./common";
import { ICustomersState } from "./customers";
import { IErrorsState } from "./errors";
import { IRolesState } from "./roles";
import { ITranslationsState } from "./translations";
import { IUsersState } from "./users";
import {  IUserNotificationState } from "./userNotifications";
import { ISubscriptionPlansState } from './subscriptionPlans';
import { IShopCategoriesState } from './shopCategories';

export interface IPaginatedMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}
export interface IPaginated<T> {
  meta: IPaginatedMeta;
  items: T[];
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
  shops:IShopsState;
  shopCategories:IShopCategoriesState;
  subscriptionPlans:ISubscriptionPlansState
}
