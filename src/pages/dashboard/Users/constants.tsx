import { Chip } from "@mui/material";
import { IColumn } from "shared/ui/Table/constants";
import { IDefaultFilterOptionForm, IUserCompact } from "store/interfaces/users";

export const userColumns: IColumn[] = [
  {
    label: "id",
    field: "id",
  },
  {
    label: "name",
    field: "fullName",
  },
  {
    label: "number",
    field: "personalNumber",
  },
  {
    label: "email",
    field: "email",
  },
  {
    label: "position",
    field: "title",
  },
  {
    label: "role",
    field: "role",
  },
  {
    label: "status",
    layout: (row: IUserCompact) => {
      return row.status ? (
        <Chip label="Active" color="success" />
      ) : (
        <Chip label="Inactive" color="error" />
      );
    },
  },
];

export const userFilterTypes = [
  {
    label: "role",
    value: "1",
    type: 1,
  },
  {
    label: "position",
    value: "2",
    type: 1,
  },
  {
    label: "department",
    value: "3",
    type: 1,
  },
  {
    label: "status",
    value: "4",
    type: 3,
  },
];

export const defaultFilterRowValue: IDefaultFilterOptionForm = {
  type: null,
  queryCondition: "",
  value: null,
};

export const StatusList = [
  {
    id: 1,
    label: "Active",
    value: "Active",
    type: null,
    additionalInfo: null,
  },
];
