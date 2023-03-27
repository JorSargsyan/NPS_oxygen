import { Fragment, useCallback, useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Controller, useFormContext } from "react-hook-form";
import {
  Autocomplete,
  Checkbox,
  CircularProgress,
  TextField,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { debounce } from "shared/helpers";
import { AppDispatch } from "store/index";
import { getQueryParams } from "shared/helpers/getQueryParams";

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
  fetchAction: any;
  name: string;
  defaultValue: [] | "";
  multiple: boolean;
  rules?: any;
  getOptionDisabled?: (option: OptionType) => boolean;
}

const loadMoreOption = {
  id: -1,
};

const defaultLimit = 10;
const startPage = 1;

const LazyAutocomplete = <T extends { id: string | number }>({
  optionLabel,
  disabled,
  async = false,
  fetchAction,
  loading = false,
  onChangeCB,
  getOptionDisabled,
  inputLabel,
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

  const dispatch = useDispatch<AppDispatch>();
  const [options, setOptions] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(startPage);
  const [canLoadMore, setCanLoadMore] = useState<boolean>(true);

  const getOptionLabel = (option: any) => {
    if (typeof option === "string") {
      return option;
    } else if (!optionLabel) {
      return "";
    }
    return option[optionLabel] as string;
  };

  const handleOptionsLoad = async () => {
    if (!isLoading) {
      setIsLoading(true);
      setPage(page + 1);
      const searchStr = getQueryParams({
        search,
        page: page + 1,
        limit: defaultLimit,
      });
      const { payload }: any = await dispatch(fetchAction(searchStr));
      setOptions([...payload.items, ...options]);
      !payload.items.length && setCanLoadMore(false);
      setIsLoading(false);
    }
  };

  const handleSearch = async (_: any, value: string) => {
    setPage(startPage);
    setSearch(value);
    const search = getQueryParams({
      search: value,
      page: startPage,
      limit: defaultLimit,
    });

    const { payload } = await dispatch(fetchAction(search));
    setOptions(payload.items);
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

  const isLoadMoreOption = (option: T) => {
    return option.id === loadMoreOption.id;
  };

  const moreOptionStyles = useMemo(() => {
    return {
      width: "100%",
      "text-align": "center",
      color: "#3d84d9",
    };
  }, []);
  const optionsDisabledHandler = (option: any) => {
    if (isLoadMoreOption(option)) {
      return !canLoadMore;
    }
    return getOptionDisabled?.(option) || false;
  };

  const handleChange = (
    e: React.SyntheticEvent<Element, Event>,
    values: any
  ) => {
    if (isLoadMoreOption(values) || isLoadMoreOption(values[0])) {
      !isLoading && handleOptionsLoad();
      return;
    }
    setValue(name, values);
    onChangeCB?.(values);
  };

  useEffect(() => {
    handleSearch(null, "");
  }, []);

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
            componentsProps={{
              popper: {
                disablePortal: true,
              },
            }}
            options={[
              ...options,
              { ...loadMoreOption, [optionLabel as any]: "load more..." },
            ]}
            disableCloseOnSelect={multiple}
            isOptionEqualToValue={(option, value) =>
              JSON.stringify(option) === JSON.stringify(value)
            }
            {...(async
              ? {
                  onInputChange: debounce(handleSearch),
                }
              : null)}
            getOptionLabel={getOptionLabel}
            getOptionDisabled={optionsDisabledHandler}
            renderOption={(props, option: any, { selected }) => (
              <li {...props}>
                {!!multiple && !isLoadMoreOption(option) ? (
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    checked={selected}
                  />
                ) : null}
                {isLoadMoreOption(option) ? (
                  <p style={moreOptionStyles}>{getOptionLabel(option)}</p>
                ) : (
                  getOptionLabel(option)
                )}
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

export default LazyAutocomplete;
