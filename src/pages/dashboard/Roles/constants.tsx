import { IColumn } from "shared/ui/Table/constants";

export const roleColumns: IColumn[] = [
  {
    label: "id",
    field: "id",
  },
  {
    label: "role_name",
    field: "name",
  },
  {
    label: "role_display_name",
    field: "displayName",
  },
  {
    label: "data_visibility",
    field: "dataVisibility",
  },
  {
    label: "users_section_title",
    field: "userCount",
  },
  {
    label: "creation_date",
    field: "creationDate",
  },
];

export interface ITranslationModuleOptions {
  value: number;
  name: String;
}

export const deleteRoleWarningConfig = {
  title: "warning",
  description: "delete_role",
};
