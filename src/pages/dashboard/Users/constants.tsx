import { Chip } from "@mui/material";
import { IColumn } from "shared/ui/Table/constants";
import { IDefaultFilterOptionForm, IUserCompact } from "store/interfaces/users";

export const userColumns: IColumn[] = [
  {
    label: "Id",
    field: "id",
  },
  {
    label: "Name",
    field: "fullName",
  },
  {
    label: "Number",
    field: "personalNumber",
  },
  {
    label: "Email",
    field: "email",
  },
  {
    label: "Position",
    field: "title",
  },
  {
    label: "Role",
    field: "role",
  },
  {
    label: "Status",
    layout: (row: IUserCompact) => {
      return row.status ? (
        <Chip label="Active" color="primary" />
      ) : (
        <Chip label="Inactive" color="error" />
      );
    },
  },
];

export const userFilterTypes = [
  {
    label: "Role",
    value: "1",
    type: 1,
  },
  {
    label: "Position",
    value: "2",
    type: 1,
  },
  {
    label: "Department",
    value: "3",
    type: 1,
  },
  {
    label: "Status",
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
