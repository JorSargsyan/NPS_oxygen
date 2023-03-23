import { IColumn } from "shared/ui/Table/constants";
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
    field: "customerPhone",
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
