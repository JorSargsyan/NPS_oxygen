import { IColumn } from "shared/ui/Table/constants";

export const columns: IColumn[] = [
  {
    label: "Campaign",
    field: "name",
  },
  {
    label: "Created",
    field: "creationDate",
  },
  {
    label: "Sent",
    field: "sent",
  },
  {
    label: "Delivered",
    field: "delivered",
  },
  {
    label: "Opened",
    field: "opened",
  },
  {
    label: "Responded",
    field: "responded",
  },
  {
    label: "Bounced",
    field: "bounced",
  },
];
