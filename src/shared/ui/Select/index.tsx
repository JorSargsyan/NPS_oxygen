import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

export interface ISelectProps<T> {
  label: string;
  options: T[];
  disabled?: boolean;
  valueProp: keyof T;
  labelProp: keyof T;
  name: string;
  rules?: Omit<
    RegisterOptions<T>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
}

const BasicSelect = <T extends unknown>({
  label,
  options,
  name,
  labelProp,
  disabled,
  valueProp,
  rules,
}: ISelectProps<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormControl fullWidth variant="filled">
          <InputLabel>{label}</InputLabel>
          <Select {...field} label={label} disabled={disabled}>
            {options?.map((option: T, index: number) => {
              return (
                <MenuItem key={index} value={option[valueProp as string]}>
                  {option[labelProp as string]}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
    />
  );
};

export default BasicSelect;
