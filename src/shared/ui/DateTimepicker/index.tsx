import { TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Controller, useFormContext } from "react-hook-form";
// import { DATE_FORMAT, HOUR_FORMAT } from "store/config/constants";

export interface IDateTimePickerProps {
  name: string;
  label: string;
  defaultValue: Date;
  rules?: any;
  disablePast: boolean;
}

const BasicDateTimePicker = ({
  name,
  label,
  defaultValue,
  rules,
  disablePast = true,
}: IDateTimePickerProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field }) => {
        return (
          <DateTimePicker
            {...field}
            label={label}
            ampm={false}
            disablePast={disablePast}
            // inputFormat={`${DATE_FORMAT} ${HOUR_FORMAT}`}
            slots={{
              textField: (params) => {
                return (
                  <TextField
                    fullWidth
                    {...params}
                    error={!!errors?.[name]?.type || params.error}
                    helperText={(errors?.[name]?.message as string) || ""}
                  />
                );
              },
            }}
          />
        );
      }}
    />
  );
};

export default BasicDateTimePicker;
