import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  ListSubheader,
} from "@mui/material";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import DeleteIcon from "@heroicons/react/24/solid/XMarkIcon";

export interface IWithAttachedEmployeeSelectProps<T, R> {
  label: string;
  options: any;
  onChangeCB?: (value: number) => void;
  clearable?: boolean;
  disabled?: boolean;
  valueProp?: keyof R;
  labelProp?: keyof R;
  size?: "small" | "medium";
  name: string;
  rules?: Omit<
    RegisterOptions<T>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  defaultValue?: number | string;
  groupNameProp?: keyof T;
  groupedListProp?: keyof T;
}

const WithAttachedEmployeeSelect = <T, R extends unknown>({
  label,
  options,
  name,
  disabled,
  labelProp,
  valueProp,
  clearable = false,
  onChangeCB,
  size = "medium",
  rules,
  defaultValue,
  groupNameProp,
  groupedListProp,
}: IWithAttachedEmployeeSelectProps<T, R>) => {
  const { control } = useFormContext();

  const handleChange = (e, onChange) => {
    const value = e.target.value;
    onChange(value);
    onChangeCB?.(value);
  };

  const handleReset = (field) => {
    field.onChange("");
    onChangeCB?.(field.value);
  };

  const renderSelectGroup = (options: T, field: any) => {
    const items = options[groupedListProp as string].map((p: R[]) => {
      return (
        <MenuItem
          key={p[valueProp as string]}
          value={p[valueProp as string]}
          disabled={p[valueProp as string] === field.value}
        >
          {p[labelProp as string]}
        </MenuItem>
      );
    });
    return [
      <ListSubheader sx={{ color: "primary.main" }}>
        Group: {options[groupNameProp as string]}
      </ListSubheader>,
      items,
    ];
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
              onChange={(e) => {
                handleChange(e, field.onChange);
              }}
              label={label}
              disabled={disabled}
            >
              {options?.map((p) => renderSelectGroup(p, field))}
            </Select>
          </FormControl>
        );
      }}
    />
  );
};

export default WithAttachedEmployeeSelect;
