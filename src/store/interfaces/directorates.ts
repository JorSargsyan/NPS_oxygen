import { IPaginated } from "./main";

export interface IDirectoratesState {
  listData: IPaginated<IDirectorate>;
  directorateByID: IDirectorateById[];
  filterList: IAttachedEmployee[];
  feedbackEmployeeList: IWithAttachedEmployee[];
}

export interface IDirectorate {
  attachedEmployeeCount: number;
  id: number;
  name: string;
}

export interface IDirectorateById {
  name: string;
  attachedEmployeeAdditionalInfo: IAttachedEmployeeAdditionalInfo[];
}

export interface IAttachedEmployee {
  id: string;
  label: string;
  value: string;
  additionalInfo: IAdditionalInfo | null;
}

export interface IAttachedEmployeeAdditionalInfo extends IAttachedEmployee {
  canRemove: boolean;
}

export interface IAdditionalInfo {
  name: string;
  personalNumber: string;
  position: string;
  department: string;
  email: string;
}

export interface IAddDirectorate {
  attachedEmployeesIDs: Array<string>;
  name: string;
}

export interface IUpdateDirectorate extends IAddDirectorate {
  id: number;
}

export interface IWithAttachedEmployee {
  id: number;
  isDisabled: boolean;
  name: string;
  attachedEmployeeAdditionalInfo: IAttachedEmployee[];
}
