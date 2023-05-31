import { IColumn } from "shared/ui/Table/constants";

export const columns: IColumn[] = [
  {
    label: "survey",
    field: "name",
  },
  {
    label: "created",
    field: "creationDate",
  },
  {
    label: "overview_sent",
    field: "sent",
  },
  {
    label: "overview_delivered",
    field: "delivered",
  },
  {
    label: "overview_opened",
    field: "opened",
  },
  {
    label: "overview_responded",
    field: "responded",
  },
  {
    label: "overview_bounced",
    field: "bounced",
  },
];

export const historyColumns: IColumn[] = [
  {
    field: "creationDate",
    label: "created",
  },
  {
    field: "state",
    label: "state",
  },
];

export const deleteCampaignWarningConfig = {
  title: "warning",
  description: "delete_survey",
};
