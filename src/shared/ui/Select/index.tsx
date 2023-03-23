import { Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import DeleteIcon from "@heroicons/react/24/solid/XMarkIcon";

export interface ISelectProps<T> {
  label: string;
  options: T[];
  onChangeCB?: (value: number) => void;
  clearable?: boolean;
  disabled?: boolean;
  getValue?: (val: T) => string;
  getLabel?: (val: T) => string;
  valueProp?: keyof T;
  labelProp?: keyof T;
  onFormatValue?: (value: string) => unknown;
  size?: "small" | "medium";
  name: string;
  rules?: Omit<
    RegisterOptions<T>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  defaultValue?: number | string;
}

const BasicSelect = <T extends unknown>({
  label,
  options,
  name,
  disabled,
  labelProp,
  valueProp,
  getValue,
  getLabel,
  clearable = false,
  onChangeCB,
  onFormatValue,
  size = "medium",
  rules,
  defaultValue,
}: ISelectProps<T>) => {
  const { control } = useFormContext();

  const handleChange = (e, onChange) => {
    const value = e.target.value;
    if (onFormatValue) {
      const result = onFormatValue(value);
      onChange(result);
    } else {
      onChange(value);
    }
    onChangeCB?.(value);
  };

  const handleReset = (field) => {
    field.onChange("");
    onChangeCB?.(field.value);
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field }) => {
        return (
          <FormControl fullWidth variant="filled">
            <InputLabel>{label}</InputLabel>
            <Select
              endAdornment={
                field?.value &&
                clearable && (
                  <Box sx={{ cursor: "pointer" }} mr={3} mt={0.5}>
                    <DeleteIcon
                      height={20}
                      onClick={() => handleReset(field)}
                    />
                  </Box>
                )
              }
              size={size}
              {...field}
              value={
                typeof valueProp === "string"
                  ? (field.value as string)
                  : getValue?.(field.value)
              }
              onChange={(e) => {
                handleChange(e, field.onChange);
              }}
              label={label}
              disabled={disabled}
            >
              {options?.map((option: T, index: number) => {
                return (
                  <MenuItem
                    key={index}
                    value={
                      typeof valueProp === "string"
                        ? option[valueProp as string]
                        : getValue?.(option)
                    }
                  >
                    {typeof labelProp === "string"
                      ? option[labelProp as string]
                      : getLabel?.(option)}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        );
      }}
    />
  );
};

export default BasicSelect;
