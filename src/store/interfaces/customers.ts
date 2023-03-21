import { IPaginated } from "./main";

export interface ICustomersState {
  listData: IPaginated<ICustomer>;
}

export interface ICustomer {
  creationDate: string;
  customerEmail: string;
  customerPhone: string;
  customerStatus: { id: number; value: string };
  fullName: string;
  id: number;
  quarantineEndDate: string;
}

export interface ICustomerExport {
  id: number;
  phone: number;
  gender: string;
  birthday: string;
  weight: string;
  height: string;
  createdAt: string;
  lastLoginAt: string;
  status: string;
  email: string;
}

export interface IChangeCustomerStatus {
  id: number;
  formData: {
    state: number;
  };
}
