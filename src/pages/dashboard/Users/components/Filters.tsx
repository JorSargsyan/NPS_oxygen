import { Box, Button, Grid, Typography } from "@mui/material";
import BasicSelect from "shared/ui/Select";
import { FormProvider, useWatch } from "react-hook-form";
import {
  StatusList,
  defaultFilterRowValue,
  userFilterTypes,
} from "../constants";
import { ConditionList, FilterConditionMatchList } from "resources/constants";
import ButtonLoader from "shared/ui/ButtonLoader";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import DeleteIcon from "@heroicons/react/24/solid/TrashIcon";
import React, { Fragment, useMemo, useState } from "react";
import ResetIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import BasicAutocomplete from "shared/ui/Autocomplete";
import { getQueryParams } from "shared/helpers/getQueryParams";
import { GetFilterValues } from "store/slicers/users";
import { ERequestStatus } from "store/enums/index.enum";
import { IFilterOption } from "store/interfaces/main";
import { useSelector } from "react-redux";
import { selectButtonLoadingState } from "store/slicers/common";
import useTranslation from "shared/helpers/hooks/useTranslation";

const Filters = ({ methods, onChange, fieldsConfig, onSubmit }) => {
  const dispatch = useAsyncDispatch();
  const isLoading = useSelector(selectButtonLoadingState);
  const t = useTranslation();

  const [filterValues, setFilterValues] = useState<IFilterOption[][]>([]);
  const { fields, append, remove } = fieldsConfig;

  const handleAppendRow = () => {
    append(defaultFilterRowValue);
  };

  const handleRemoveRow = (index: number) => {
    remove(index);
  };
  const filtersWatch = useWatch({
    control: methods.control,
    name: "config.filters",
  });

  const getApplyStatus = useMemo(() => {
    const isValid = filtersWatch.every((item) => {
      return item.type && item.queryCondition && item.value;
    });
    return !isValid;
  }, [filtersWatch]);

  const handleReset = () => {
    methods.setValue("config.filters", [defaultFilterRowValue]);
    onChange?.();
  };

  const handleResetRow = (val, index) => {
    const actual = userFilterTypes.find((i) => {
      return Number(i.value) === Number(val);
    });
    const newValue = {
      ...defaultFilterRowValue,
      type: actual,
    };
    if (filtersWatch?.[index]?.queryCondition) {
      const arr = [...filtersWatch];
      arr.splice(index, 1, newValue);
      methods.setValue("config.filters", arr);
    }
  };

  const handleFetchValues = async (index: number) => {
    let row = methods.watch(`config.filters[${index}]`);
    console.log(row);
    if (row.type.label !== "status") {
      const formData = {
        filter: row.type.label,
        term: "",
        count: 40,
      };

      const { meta, payload } = await dispatch(
        GetFilterValues(getQueryParams(formData))
      );

      if (meta.requestStatus !== ERequestStatus.FULFILLED) {
        return;
      }

      setFilterValues((state) => {
        const result = [...state];
        result.splice(index, 0, payload);
        return result;
      });
    } else {
      setFilterValues((state) => {
        const result = [...state];
        result.splice(index, 0, StatusList);
        return result;
      });
    }
  };

  return (
    <Box p={1}>
      <FormProvider {...methods}>
        <Box display="flex" alignItems={"center"} mb={4}>
          <Box flex={1}>
            <BasicSelect
              size="small"
              label="condition"
              valueProp="value"
              labelProp="name"
              options={FilterConditionMatchList}
              name={`config.conditionMatch`}
            />
          </Box>
          <Box flex={3}>
            <Typography ml={2}>{t("users_match_condition")}</Typography>
          </Box>
          <Box flex={1} justifyContent={"flex-end"} display="flex">
            <Button
              onClick={handleReset}
              startIcon={<ResetIcon height={24} width={24} />}
              variant="outlined"
            >
              <Typography>{t("reset")}</Typography>
            </Button>
          </Box>
        </Box>
        <Grid container spacing={1}>
          {fields.map((field, index) => {
            return (
              <Fragment key={field.id}>
                <Grid item xs={3}>
                  <BasicSelect
                    size="small"
                    label="type"
                    getValue={(val) => val?.value || ""}
                    defaultValue={""}
                    labelProp="label"
                    clearable
                    onFormatValue={(val) => {
                      const actual = userFilterTypes.find(
                        (i) => i.value === val
                      );
                      return actual;
                    }}
                    onChangeCB={(val: number) => handleResetRow(val, index)}
                    options={userFilterTypes}
                    name={`config.filters[${index}].type`}
                  />
                </Grid>
                <Grid item xs={3}>
                  <BasicSelect
                    size="small"
                    label="condition"
                    valueProp="value"
                    labelProp="name"
                    clearable
                    options={ConditionList}
                    onChangeCB={() => handleFetchValues(index)}
                    name={`config.filters[${index}].queryCondition`}
                  />
                </Grid>
                <Grid item xs={3}>
                  <BasicAutocomplete
                    size="small"
                    inputLabel="value"
                    options={filterValues[index] || []}
                    name={`config.filters[${index}].value`}
                    defaultValue={""}
                    optionLabel="label"
                    onChangeCB={() => handleFetchValues(index)}
                    multiple={false}
                    sx={{
                      "& .MuiInputBase-root": {
                        height: 51,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  {index === 0 ? (
                    <Box
                      display="flex"
                      mt={0.5}
                      flexDirection={"row-reverse"}
                      justifyContent={"space-between"}
                    >
                      <ButtonLoader
                        variant="outlined"
                        onClick={handleAppendRow}
                        isLoading={false}
                      >
                        <PlusIcon height={20} />
                      </ButtonLoader>
                    </Box>
                  ) : (
                    <Box
                      display="flex"
                      mt={0.5}
                      flexDirection={"row-reverse"}
                      justifyContent={"space-between"}
                    >
                      <ButtonLoader
                        onClick={() => handleRemoveRow(index)}
                        isLoading={false}
                        variant="outlined"
                      >
                        <DeleteIcon height={20} />
                      </ButtonLoader>
                    </Box>
                  )}
                </Grid>
              </Fragment>
            );
          })}
        </Grid>
        <Box
          mt={2}
          sx={{ position: "fixed", bottom: 20, right: 20 }}
          display="flex"
          justifyContent={"flex-end"}
        >
          <ButtonLoader
            disabled={getApplyStatus}
            onClick={onSubmit}
            isLoading={isLoading}
          >
            <Typography>{t("apply")}</Typography>
          </ButtonLoader>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default React.memo(Filters);
