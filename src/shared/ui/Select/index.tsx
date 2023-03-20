import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Controller } from "react-hook-form";

export interface ISelectProps<T> {
  label: string;
  options: T[];
  disabled?: boolean;
  valueProp: keyof T;
  labelProp: keyof T;
  name: string;
}

const BasicSelect = <T extends unknown>({
  label,
  options,
  name,
  labelProp,
  disabled,
  valueProp,
}: ISelectProps<T>) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <FormControl fullWidth>
          <InputLabel>{label}</InputLabel>
          <Select {...field} label={label} disabled={disabled}>
            {options?.map((option: T, index: number) => {
              return (
                <MenuItem key={index} value={option[valueProp] as string}>
                  {option[labelProp] as string}
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
