export interface IRolesState {
  roles: IRole[];
  userRole: IRole | null;
  permissions: {
    [x: string]: string[];
  };
}

export interface IRole {
  id: number;
  name: string;
  createdBy: string;
  updatedBy: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
  admin: number;
  role: number;
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
  permissions: string[];
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
