import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { PickersShortcutsItem } from "@mui/x-date-pickers/PickersShortcuts";
import {
  addDays,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  subDays,
} from "date-fns";
import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from "antd";

const shortcutsItems = [
  {
    label: "This Week",
    getValue: () => {
      const today = new Date();
      return [startOfWeek(today), endOfWeek(today)];
    },
  },
  {
    label: "Last Week",
    getValue: () => {
      const today = new Date();
      const prevWeek = subDays(today, 7);
      return [startOfWeek(prevWeek), endOfWeek(prevWeek)];
    },
  },
  {
    label: "Last 7 Days",
    getValue: () => {
      const today = new Date();
      return [subDays(today, 7), today];
    },
  },
  {
    label: "Current Month",
    getValue: () => {
      const today = new Date();

      return [startOfMonth(today), endOfMonth(today)];
    },
  },
  {
    label: "Next Month",
    getValue: () => {
      const today = new Date();

      const startOfNextMonth = addDays(endOfMonth(today), 1);
      return [startOfNextMonth, endOfMonth(startOfNextMonth)];
    },
  },
  { label: "Reset", getValue: () => [null, null] },
];

interface IProps {
  name: string;
}

const BasicRangePicker = ({ name }: IProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return <DatePicker.RangePicker {...field} style={{ zIndex: 1300 }} />;
      }}
    />
  );
};

export default BasicRangePicker;
