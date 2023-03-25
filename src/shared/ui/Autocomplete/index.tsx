import {
  Autocomplete,
  Checkbox,
  CircularProgress,
  TextField,
  createFilterOptions,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Controller, useFormContext } from "react-hook-form";
import { Fragment, useCallback } from "react";
import { debounce } from "shared/helpers";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const select_all = 0;

const selectAllOption = {
  id: select_all,
  name: "Select All",
};

interface IAutocompleteProps<OptionType> {
  optionLabel?: keyof OptionType;
  inputLabel: string;
  async?: boolean;
  disabled?: boolean;
  loading?: boolean;
  size?: "small" | "medium";
  prefix?: string;
  onChangeCB?: (val: OptionType | OptionType[] | null) => void;
  fetchFn?: (search: string) => void;
  options: OptionType[];
  name: string;
  defaultValue: [] | "";
  multiple: boolean;
  rules?: any;
  getOptionDisabled?: (option: OptionType) => boolean;
  groupBy?: (option: OptionType) => string;
  hasSelectAllOption?: boolean;
}

const BasicAutocomplete = <T extends { id?: number | string }>({
  optionLabel,
  disabled,
  async = false,
  fetchFn,
  loading = false,
  onChangeCB,
  getOptionDisabled,
  inputLabel,
  options,
  size,
  name,
  prefix,
  rules,
  multiple = false,
  defaultValue,
  groupBy = undefined,
  hasSelectAllOption = false,
}: IAutocompleteProps<T>) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const allSelected = options?.length === watch(name)?.length;
  const filter = createFilterOptions();

  const handleSelectAll = (isSelected) => {
    if (!isSelected) {
      setValue(name, options);
    } else {
      setValue(name, []);
    }
  };

  const getOptionLabel = (option: T) => {
    if (typeof option === "string") {
      return option;
    } else if (!optionLabel) {
      return "";
    }
    return option[optionLabel as string];
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
    if (multiple) {
      const isSelectAll = (values as T[]).find((i) => i.id === select_all);
      if (isSelectAll) {
        handleSelectAll(allSelected);
      } else {
        setValue(name, values);
        onChangeCB?.(values);
      }
    } else {
      setValue(name, values);
      onChangeCB?.(values);
    }
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
            size={size}
            multiple={multiple}
            onChange={handleChange}
            groupBy={groupBy}
            limitTags={multiple ? 1 : undefined}
            options={options}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              return multiple && hasSelectAllOption
                ? [selectAllOption, ...filtered]
                : filtered;
            }}
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
            renderOption={(props, option, { selected }) => {
              const selectAllProps =
                option.id === select_all ? { checked: allSelected } : {};
              return (
                <li {...props}>
                  {multiple ? (
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      checked={selected}
                      {...selectAllProps}
                    />
                  ) : null}
                  {getOptionLabel(option)}
                </li>
              );
            }}
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
