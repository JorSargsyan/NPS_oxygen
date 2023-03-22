import { Typography } from "@mui/material";
import { IColumn } from "shared/ui/Table/constants";
import { ICampaignLog } from "store/interfaces/campaigns";

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

export const historyColumns: IColumn[] = [
  {
    field: "creationDate",
    label: "Created",
  },
  {
    field: "state",
    label: "State",
  },
];

export const deleteCampaignWarningConfig = {
  title: "Warning",
  description: "Are you sure you want to delete this role?",
};
