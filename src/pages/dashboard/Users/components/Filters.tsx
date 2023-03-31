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

const Filters = ({ methods, onChange, fieldsConfig }) => {
  const dispatch = useAsyncDispatch();
  const onSubmit = () => {
    onChange();
  };

  const [filterValues, setFilterValues] = useState<IFilterOption[][]>([]);
  const { fields, append, remove } = fieldsConfig;
  console.log(fields);
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

  const handleFetchValues = async (index: number) => {
    let row = methods.watch(`config.filters[${index}]`);

    if (row.type.label !== "Status") {
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
              label="Condition"
              valueProp="value"
              labelProp="name"
              options={FilterConditionMatchList}
              name={`config.conditionMatch`}
            />
          </Box>
          <Box flex={3}>
            <Typography fontWeight={500} ml={2}>
              of the users match following filters
            </Typography>
          </Box>
          <Box flex={1} justifyContent={"flex-end"} display="flex">
            <Button
              onClick={handleReset}
              startIcon={<ResetIcon height={24} width={24} />}
              variant="outlined"
            >
              <Typography>Reset</Typography>
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
                    label="Type"
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
                    options={userFilterTypes}
                    name={`config.filters[${index}].type`}
                  />
                </Grid>
                <Grid item xs={3}>
                  <BasicSelect
                    size="small"
                    label="Condition"
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
                    inputLabel="Value"
                    options={filterValues[index] || []}
                    name={`config.filters[${index}].value`}
                    defaultValue={""}
                    optionLabel="label"
                    onChangeCB={() => handleFetchValues(index)}
                    multiple={false}
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
            isLoading={false}
          >
            <Typography>Apply</Typography>
          </ButtonLoader>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default React.memo(Filters);
