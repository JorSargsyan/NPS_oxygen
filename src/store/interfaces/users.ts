import { IPaginated } from "./main";

export interface IUsersState {
  data: IPaginated<IUser>;
  userInfo: IUser | null;
}

export interface IUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  status: string;
  roleId: number;
  roleName: string;
  createdAt: string;
  updatedAt: string;
}

export interface IChangePasswordRequest {
  oldPassword: string;
  password: string;
  passwordConfirmation: string;
}

export interface IAddEditUserRequest {
  email: string;
  name: string;
  surname: string;
  phone: string;
}
