import { ETheme } from "../config/constants";

export interface ICommonState {
  loading: boolean;
  theme: ETheme;
  permissions: IPermission[];
  permissionGroups: IPermissionGroup[];
}

export interface IGetPermissionsResponse {
  permissions: IPermission[];
}

export interface IPermissionGroup {
  group: string;
  permissions: IPermGroupPermission[];
}

export interface IPermGroupPermission {
  id: number;
  name: string;
  group: string;
}
export interface IPermission {
  [key: string]: number;
}

export interface IGetConfigResponse {
  sidebar: string;
  themeColor: ETheme;
}
