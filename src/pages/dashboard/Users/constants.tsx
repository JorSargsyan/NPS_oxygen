import { Chip } from "@mui/material";
import { IColumn } from "shared/ui/Table/constants";
import { IUserCompact } from "store/interfaces/users";

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
