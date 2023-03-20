import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Controller, useFormContext } from "react-hook-form";
import { DATE_FORMAT } from "store/config/constants";

export interface IDatePickerProps {
  name: string;
  label: string;
  rules?: { [k: string]: { value: boolean; message: string } };
}

const BasicDatePicker = ({ name, label, rules }: IDatePickerProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <DatePicker
          label={label}
          inputFormat={DATE_FORMAT}
          {...field}
          renderInput={(params) => <TextField fullWidth {...params} />}
        />
      )}
    />
  );
};

export default BasicDatePicker;
