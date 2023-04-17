import { Typography } from "@mui/material";
import { IColumn } from "shared/ui/Table/constants";
import { ICustomer } from "store/interfaces/customers";
export const customerColumns: IColumn[] = [
  {
    label: "Id",
    field: "id",
  },
  {
    label: "Name",
    field: "fullName",
  },
  {
    label: "Email",
    field: "customerEmail",
  },
  {
    label: "Phone",
    field: "",
    layout: (row: ICustomer) => {
      return <Typography></Typography>;
    },
  },
  {
    label: "Creation Date",
    field: "creationDate",
  },
];

export const CustomerStatusList = [
  {
    value: "1",
    name: "Active",
  },
  {
    value: "2",
    name: "Blocked",
  },
  {
    value: "3",
    name: "Quarantined",
  },
];
