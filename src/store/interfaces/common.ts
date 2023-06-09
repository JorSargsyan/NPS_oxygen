import { ETheme } from "../config/constants";

export interface ICommonState {
  loading: boolean;
  campaignLoading: boolean;
  theme: ETheme;
  tableLoading: boolean;
  permissions: { [key: string]: number };
  permissionGroups: IPermissionGroup[];
  managers: IManagers[];
  sidebarVisible: boolean;
  buttonLoading: boolean;
  isTranslationsLoaded: boolean;
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

export interface IManagerUser {
  id: string;
  label: string;
  value: string;
}

export interface IManagers {
  groupName: string;
  users: IManagerUser[];
}
