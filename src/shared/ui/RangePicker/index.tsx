import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Controller, useFormContext } from "react-hook-form";

const shortcutsItems: {
  label: string;
  value: [Dayjs, Dayjs];
}[] = [
  {
    label: "This Week",
    value: [dayjs().startOf("week"), dayjs().endOf("week")],
  },
  {
    label: "Last Week",
    value: [
      dayjs().subtract(7, "day").startOf("week"),
      dayjs().subtract(7, "day").endOf("week"),
    ],
  },
  {
    label: "Last 7 Days",
    value: [dayjs().subtract(7, "day"), dayjs()],
  },
  {
    label: "Current Month",
    value: [dayjs().startOf("month"), dayjs().endOf("month")],
  },
  {
    label: "Next Month",
    value: [
      dayjs().endOf("month").add(1, "day"),
      dayjs().endOf("month").add(1, "day").endOf("month"),
    ],
  },
  { label: "Reset", value: [null, null] },
];
interface IProps {
  name: string;
}

const BasicRangePicker = ({ name }: IProps) => {
  const { control } = useFormContext();

  const onRangeChange = (dates: any, dateStrings: string[], field: any) => {
    if (dates) {
      field.onChange([dates[0], dates[1]]);
    } else {
      field.onChange([null, null]);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <DatePicker.RangePicker
            {...field}
            presets={shortcutsItems}
            onChange={(dates, datesString) =>
              onRangeChange(dates, datesString, field)
            }
          />
        );
      }}
    />
  );
};

export default BasicRangePicker;
