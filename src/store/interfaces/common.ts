import { ETheme } from "../config/constants";

export interface ICommonState {
  loading: boolean;
  theme: ETheme;
  permissions: IPermission[];
}

export interface IGetPermissionsResponse {
  permissions: IPermission[];
}

export interface IPermission {
  [key: string]: number;
}

export interface IGetConfigResponse {
  sidebar: string;
  themeColor: ETheme;
}
