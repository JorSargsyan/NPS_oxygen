import ResetIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import { Box, Button, Grid, ToggleButtonGroup } from "@mui/material";
import React, { MouseEvent } from "react";
import { FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import { getQueryParams } from "shared/helpers/getQueryParams";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import BasicAutocomplete from "shared/ui/Autocomplete";
import BasicRangePicker from "shared/ui/RangePicker";
import StyledToggleButton from "shared/ui/ToggleButton";
import { IAttachedEmployee } from "store/interfaces/directorates";
import {
  GetFeedbackFilterValues,
  selectFeedbackFilterValues,
} from "store/slicers/feedback";
import { defaultFeedbackQuickFilterTypes } from "..";
import {
  defaultQuickFilterValues,
  feedbackStatusList,
  quickFilterFeedbackTypes,
  quickFilterUserVisibilityTypes,
} from "../constants";

const QuickFilters = ({
  methods,
  handleSubmit,
  feedbackTypes,
  setFeedbackTypes,
}) => {
  const dispatch = useAsyncDispatch();
  const filterValues = useSelector(selectFeedbackFilterValues);

  const getCampaignDefaultList = async () => {
    const formData = {
      filter: "campaignname",
      term: "",
      count: 15,
    };
    await dispatch(GetFeedbackFilterValues(getQueryParams(formData)));
  };

  const getCampaignList = async (val: string) => {
    if (val) {
      const formData = {
        filter: "campaignname",
        term: val,
        count: 15,
      };
      await dispatch(GetFeedbackFilterValues(getQueryParams(formData)));
    }
  };

  const changeFeedbackType = (
    event: MouseEvent<HTMLElement>,
    value: string | null
  ) => {
    if (value !== null) {
      setFeedbackTypes((type) => {
        return { ...type, feedbackType: value };
      });
    }
  };

  const changeUserVisibilityType = (
    event: MouseEvent<HTMLElement>,
    value: string | null
  ) => {
    if (value !== null) {
      setFeedbackTypes((type) => {
        return { ...type, userVisibility: value };
      });
    }
  };

  const resetQuickFilters = () => {
    methods.reset({
      config: {
        ...methods.watch("config"),
        quickFilters: defaultQuickFilterValues,
      },
    });
    setFeedbackTypes(defaultFeedbackQuickFilterTypes);
  };

  return (
    <Box px={1} py={3}>
      <FormProvider {...methods}>
        <Grid container spacing={3}>
          <Grid
            item
            xs={3}
            sx={{
              "& .ant-picker": {
                height: "50px",
                width: "100%",
                borderRadius: "8px",
                "&.ant-picker-focused": {
                  borderWidth: 3,
                  borderColor: "primary.main",
                  boxShadow: "none",
                  "&:hover": {
                    borderColor: "primary.main",
                  },
                },
                "&:hover": {
                  borderColor: "neutral.200",
                },
              },
            }}
          >
            <BasicRangePicker name="config.quickFilters.range" />
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              "& .MuiInputBase-root": {
                height: "50px",
              },
            }}
          >
            <BasicAutocomplete<IAttachedEmployee>
              options={filterValues?.campaign || []}
              inputLabel={"Campaign"}
              name={"config.quickFilters.campaign"}
              optionLabel="label"
              defaultValue={""}
              onFocus={getCampaignDefaultList}
              size="small"
              async
              fetchFn={getCampaignList}
            />
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              "& .MuiInputBase-root": {
                height: "50px",
              },
            }}
          >
            <BasicAutocomplete<any>
              options={feedbackStatusList}
              inputLabel={"Status"}
              name={"config.quickFilters.status"}
              optionLabel="name"
              defaultValue={[]}
              multiple
              size="small"
            />
          </Grid>
        </Grid>
        <Box pt={3} display="flex" justifyContent="space-between">
          <Box display="flex">
            <Box mr={2}>
              <ToggleButtonGroup
                value={feedbackTypes?.feedbackType}
                exclusive
                onChange={changeFeedbackType}
                aria-label="text alignment"
              >
                {quickFilterFeedbackTypes?.map((type, index) => {
                  return (
                    <StyledToggleButton
                      size="small"
                      key={index}
                      value={type.value}
                      selected={feedbackTypes?.feedbackType === type.value}
                    >
                      {type.label}
                    </StyledToggleButton>
                  );
                })}
              </ToggleButtonGroup>
            </Box>
            <Box>
              <ToggleButtonGroup
                value={feedbackTypes?.userVisibility}
                exclusive
                onChange={changeUserVisibilityType}
                aria-label="text alignment"
              >
                {quickFilterUserVisibilityTypes?.map((type, index) => {
                  return (
                    <StyledToggleButton
                      size="small"
                      key={index}
                      value={type.value}
                      selected={feedbackTypes?.userVisibility === type.value}
                    >
                      {type.label}
                    </StyledToggleButton>
                  );
                })}
              </ToggleButtonGroup>
            </Box>
          </Box>
          <Box>
            <Box>
              <Button
                startIcon={<ResetIcon height={24} width={24} />}
                size="small"
                type="submit"
                onClick={resetQuickFilters}
                variant="outlined"
              >
                Reset
              </Button>
              <Button
                sx={{ ml: 2 }}
                size="small"
                type="submit"
                onClick={handleSubmit}
                variant="contained"
              >
                Apply filters
              </Button>
            </Box>
          </Box>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default React.memo(QuickFilters);
