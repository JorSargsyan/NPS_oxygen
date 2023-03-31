import ResetIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import DeleteIcon from "@heroicons/react/24/solid/TrashIcon";
import { Box, Button, Grid, Typography } from "@mui/material";
import React, { Fragment, useMemo } from "react";
import { FormProvider, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
import { ConditionList, FilterConditionMatchList } from "resources/constants";
import { getQueryParams } from "shared/helpers/getQueryParams";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import BasicAutocomplete from "shared/ui/Autocomplete";
import ButtonLoader from "shared/ui/ButtonLoader";
import BasicSelect from "shared/ui/Select";
import RangeSlider from "shared/ui/Slider";
import { IAttachedEmployee } from "store/interfaces/directorates";
import { selectManagers } from "store/slicers/common";
import {
  GetFeedbackFilterValues,
  selectFeedbackFilterValues,
} from "store/slicers/feedback";
import {
  defaultFilterRowValue,
  EFeedbackFilterTypes,
  feedbackFilterTypes,
} from "../constants";
import { redirectTabStatuses } from "./FeedbackDetails/FeedbackDetailsBottomRight/constants";

const Filters = ({ methods, onChange, fieldsConfig }) => {
  const dispatch = useAsyncDispatch();

  const managersList = useSelector(selectManagers);
  const filterValues = useSelector(selectFeedbackFilterValues);

  const onSubmit = () => {
    onChange();
  };

  // const [filterValues, setFilterValues] = useState<any>();
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
      if (item?.type?.type === EFeedbackFilterTypes.NPS) {
        return !!item.type;
      }
      return item.type && !!item.value;
    });
    return !isValid;
  }, [filtersWatch]);

  const handleReset = () => {
    methods.setValue("config.filters", [defaultFilterRowValue]);
    onChange?.();
  };

  const handleResetRow = (val, index) => {
    const actual = feedbackFilterTypes.find((i) => {
      return Number(i.value) === Number(val);
    });
    const newValue = {
      ...defaultFilterRowValue,
      type: actual,
    };
    const scoreValues = {
      ...newValue,
      type: {
        ...actual,
        range: [0, 10],
      },
    };
    if (filtersWatch?.[index]?.queryCondition) {
      const arr = [...filtersWatch];
      arr.splice(index, 1, newValue);
      methods.setValue("config.filters", arr);
    }
    if (actual.type === EFeedbackFilterTypes.NPS) {
      const arr = [...filtersWatch];
      arr.splice(index, 1, scoreValues);
      methods.setValue("config.filters", arr);
    }
  };

  const handleFetchValues = async (index: number) => {
    let row = methods.watch(`config.filters[${index}]`);
    if (
      row.type.type === EFeedbackFilterTypes.EMPLOYEE ||
      row.type.type === EFeedbackFilterTypes.SERVICE_CATEGORY
    ) {
      const formData = {
        filter: row.type.key,
        term: "",
        count: 15,
      };
      await dispatch(GetFeedbackFilterValues(getQueryParams(formData)));
    }
  };

  const handleFetchInputValues = async (search: string, index: number) => {
    let row = methods.watch(`config.filters[${index}]`);
    if (
      row.type.type === EFeedbackFilterTypes.EMPLOYEE ||
      row.type.type === EFeedbackFilterTypes.SERVICE_CATEGORY
    ) {
      const formData = {
        filter: row.type.key,
        term: search,
        count: 15,
      };
      await dispatch(GetFeedbackFilterValues(getQueryParams(formData)));
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
              of the feedbacks match following filters
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
        <Grid sx={{ alignItems: "center" }} container spacing={1}>
          {fields.map((field, index) => {
            return (
              <Fragment key={field.id}>
                <Grid item xs={3}>
                  <BasicSelect
                    size="small"
                    label="Type"
                    getValue={(val) => val?.value || ""}
                    onFormatValue={(val) => {
                      const actual = feedbackFilterTypes.find(
                        (i) => i.value === val
                      );
                      return actual;
                    }}
                    defaultValue={""}
                    labelProp="label"
                    clearable
                    onChangeCB={(val: number) => handleResetRow(val, index)}
                    options={feedbackFilterTypes}
                    name={`config.filters[${index}].type`}
                  />
                </Grid>
                {filtersWatch?.[index]?.type?.type ===
                EFeedbackFilterTypes.NPS ? (
                  <Fragment>
                    <Grid item xs={3}>
                      <RangeSlider
                        name={`config.filters[${index}].type.range`}
                        sx={{ ml: 2 }}
                      />
                    </Grid>
                    <Grid item xs={3}></Grid>
                  </Fragment>
                ) : filtersWatch?.[index]?.type?.type ===
                  EFeedbackFilterTypes.NPS_AGENT ? (
                  <Fragment>
                    <Grid item xs={3}>
                      <BasicSelect
                        size="small"
                        label="Agent"
                        valueProp="value"
                        labelProp="label"
                        clearable
                        options={managersList?.[0]?.users || []}
                        name={`config.filters[${index}].value`}
                      />
                    </Grid>
                    <Grid item xs={3}></Grid>
                  </Fragment>
                ) : (
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
                )}

                {filtersWatch?.[index]?.type?.type ===
                EFeedbackFilterTypes.NPS ? null : filtersWatch?.[index]?.type
                    ?.type ===
                  EFeedbackFilterTypes.NPS_AGENT ? null : filtersWatch?.[index]
                    ?.type?.type === EFeedbackFilterTypes.TASK_STATUS ? (
                  <Grid item xs={3}>
                    <BasicSelect
                      size="small"
                      label="Value"
                      valueProp="value"
                      labelProp="name"
                      clearable
                      options={redirectTabStatuses}
                      name={`config.filters[${index}].value`}
                    />
                  </Grid>
                ) : (
                  <Grid item xs={3}>
                    <BasicAutocomplete<IAttachedEmployee>
                      size="small"
                      inputLabel="Value"
                      options={
                        filterValues?.[filtersWatch?.[index]?.type?.key] || []
                      }
                      name={`config.filters[${index}].value`}
                      defaultValue={""}
                      optionLabel="label"
                      async
                      fetchFn={(val: string) =>
                        handleFetchInputValues(val, index)
                      }
                      multiple={false}
                    />
                  </Grid>
                )}

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
