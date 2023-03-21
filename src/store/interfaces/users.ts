import { IPaginated } from "./main";

export interface IUsersState {
  data: IPaginated<IUser>;
  userInfo: IUser | null;
}

export interface IUser {
  ManagerUser: string | null;
  creationDate: string;
  department: string;
  directorate: string | null;
  email: string;
  id: number;
  imagePath: string;
  isActive: boolean;
  name: string;
  noImage: boolean;
  personalNumber: string;
  phone: string | null;
  position: string;
  role: { id: number; label: string };
  surname: string;
  userGroup: number;
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
