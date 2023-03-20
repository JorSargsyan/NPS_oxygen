import { Box } from "@mui/system";
import { format } from "date-fns";
import { IColumn } from "shared/ui/Table/constants";
import { DATE_FORMAT, HOUR_FORMAT } from "store/config/constants";
import { ICustomer } from "store/interfaces/customers";

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
    label: "Title",
    field: "title",
  },
];
