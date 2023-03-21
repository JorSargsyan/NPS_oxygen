import { IColumn } from "shared/ui/Table/constants";

export const roleColumns: IColumn[] = [
  {
    label: "Id",
    field: "id",
  },
  {
    label: "Role Name",
    field: "name",
  },
  {
    label: "Name",
    field: "displayName",
  },
  {
    label: "Data visibility",
    field: "dataVisibility",
  },
  {
    label: "Users",
    field: "userCount",
  },
  {
    label: "Creation date",
    field: "creationDate",
  },
];

export interface ITranslationModuleOptions {
  value: number;
  name: String;
}

export const deleteRoleWarningConfig = {
  title: "Warning",
  description: "Are you sure you want to delete this role?",
};
