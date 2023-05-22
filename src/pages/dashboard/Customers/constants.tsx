import { IColumn } from "shared/ui/Table/constants";
export const customerColumns: IColumn[] = [
  {
    label: "id",
    field: "id",
  },
  {
    label: "name",
    field: "fullName",
  },
  {
    label: "email",
    field: "customerEmail",
  },
  {
    label: "phone",
    field: "customerPhone",
  },
  {
    label: "creation_date",
    field: "creationDate",
  },
];

export const CustomerStatusList = [
  {
    value: "1",
    name: "active",
  },
  {
    value: "2",
    name: "blocked",
  },
  {
    value: "3",
    name: "quarantined",
  },
];
