import {
  Autocomplete,
  Checkbox,
  CircularProgress,
  TextField,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Controller, useFormContext } from "react-hook-form";
import { Fragment, useCallback } from "react";
import { debounce } from "shared/helpers";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface IAutocompleteProps<OptionType> {
  optionLabel?: keyof OptionType;
  inputLabel: string;
  async?: boolean;
  disabled?: boolean;
  loading?: boolean;
  prefix?: string;
  onChangeCB?: (val: OptionType | OptionType[] | null) => void;
  fetchFn?: (search: string) => void;
  options: OptionType[];
  name: string;
  defaultValue: [] | "";
  multiple: boolean;
  rules?: any;
  getOptionDisabled?:(option: OptionType) => boolean;
}

const BasicAutocomplete = <T extends unknown>({
  optionLabel,
  disabled,
  async = false,
  fetchFn,
  loading = false,
  onChangeCB,
  getOptionDisabled,
  inputLabel,
  options,
  name,
  prefix,
  rules,
  multiple = false,
  defaultValue,
}: IAutocompleteProps<T>) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const getOptionLabel = (option: T) => {
    if (typeof option === "string") {
      return option;
    } else if (!optionLabel) {
      return "";
    }
    return option[optionLabel] as string;
  };

  const errorInfo = useCallback(() => {
    let errorData = errors as { [x: string]: any };
    if (prefix) {
      const nestedName = name.split(".")[1];
      return errorData?.[prefix]?.[nestedName];
    } else {
      return errorData?.[name];
    }
  }, [errors, name, prefix]);

  const handleChange = (
    e: React.SyntheticEvent<Element, Event>,
    values: T | T[] | null
  ) => {
    setValue(name, values);
    onChangeCB?.(values);
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field }) => {
        return (
          <Autocomplete
            {...field}
            disabled={disabled}
            multiple={multiple}
            onChange={handleChange}
            options={options}
            disableCloseOnSelect={multiple}
            isOptionEqualToValue={(option, value) =>
              JSON.stringify(option) === JSON.stringify(value)
            }
            {...(async
              ? {
                  onInputChange: debounce((_, value) => fetchFn?.(value)),
                }
              : null)}
            getOptionLabel={getOptionLabel}
            getOptionDisabled={getOptionDisabled}
            loading={true}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                {!!multiple ? (
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    checked={selected}
                  />
                ) : null}
                {getOptionLabel(option)}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label={inputLabel}
                error={!!errorInfo?.() && !disabled}
                helperText={
                  !disabled && !!errorInfo()
                    ? errorInfo()?.message?.toString()
                    : null
                }
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </Fragment>
                  ),
                }}
              />
            )}
          />
        );
      }}
    />
  );
};

export default BasicAutocomplete;
