import { Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import DeleteIcon from "@heroicons/react/24/solid/XMarkIcon";

export interface ISelectProps<T> {
  label: string;
  options: T[];
  onChangeCB?: () => void;
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
}: ISelectProps<T>) => {
  const { control } = useFormContext();

  const handleChange = (e, onChange) => {
    if (onFormatValue) {
      const result = onFormatValue(e.target.value);
      onChange(result);
    } else {
      onChange(e.target.value);
    }
    onChangeCB();
  };

  const handleReset = (onChange) => {
    onChange("");
    onChangeCB();
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => {
        console.log(field.value);
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
                      onClick={() => handleReset(field.onChange)}
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
