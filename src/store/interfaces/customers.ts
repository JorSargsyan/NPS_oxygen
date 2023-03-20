import { IPaginated } from "./main";

export interface ICustomersState {
  listData: IPaginated<ICustomer>;
}

export interface ICustomer {
  id: number;
  phone: number;
  password: number;
  gender: string;
  birthday: string;
  lastLoginAt: string;
  createdAt: string;
  email: string;
  weight: string;
  height: string;
  status: string;
}

export interface ICustomerExport {
  id: number,
  phone: number,
  gender: string,
  birthday: string,
  weight: string,
  height: string,
  createdAt: string,
  lastLoginAt: string
  status: string,
  email: string,
}
