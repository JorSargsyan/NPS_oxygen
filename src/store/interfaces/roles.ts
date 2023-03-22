import { IPaginated } from "./main";

export interface IRolesState {
  roles: IPaginated<IRole> | null;
  userRole: IRole | null;
  permissions: {
    [x: string]: string[];
  };
}

export interface IRole {
  creationDate: string;
  dataVisibility: string;
  displayName: string;
  id: number;
  name: string;
  usersCount: number;
}

export interface IUserRole {
  id: number;
  admin: number;
  role: number;
  createdAt: string;
  updatedAt: string;
}

export interface IAddEditRoleRequest {
  name: string;
  displayName: string;
  dataVisibility: string;
  groupIds: number[];
  permissionIds: number[];
}

export interface IPermission {
  permissions: {
    [key: string]: string[];
  };
}

export interface IAttachDeattachRoleRequest {
  role: number;
  admin: number;
}
