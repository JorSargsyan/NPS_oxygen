import { IPaginated } from "./main";

export interface IUsersState {
  data: IPaginated<IUser>;
  userInfo: IUser | null;
}

export interface IUser {
  id: number;
  email: string;
  status: boolean;
  department: string;
  fullName: string;
  personalNumber: string;
  role: string;
  title: string;
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
