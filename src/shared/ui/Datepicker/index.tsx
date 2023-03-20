import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Controller, useFormContext } from "react-hook-form";

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
          // inputFormat={DATE_FORMAT}
          {...field}
          slots={{ textField: (params) => <TextField fullWidth {...params} /> }}
        />
      )}
    />
  );
};

export default BasicDatePicker;
