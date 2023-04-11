import ResetIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import { Box, Button, Grid, ToggleButtonGroup } from "@mui/material";
import React, { useMemo } from "react";
import { Controller, FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import { EFeedbackPermissions } from "resources/permissions/permissions.enum";
import { getQueryParams } from "shared/helpers/getQueryParams";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import usePermission from "shared/helpers/hooks/usePermission";
import BasicAutocomplete from "shared/ui/Autocomplete";
import BasicRangePicker from "shared/ui/RangePicker";
import StyledToggleButton from "shared/ui/ToggleButton";
import { IAttachedEmployee } from "store/interfaces/directorates";
import {
  GetFeedbackFilterValues,
  selectFeedbackFilterValues,
} from "store/slicers/feedback";
import {
  defaultQuickFilterValues,
  feedbackStatusList,
  quickFilterFeedbackTypes,
  quickFilterUserVisibilityTypes,
} from "../constants";

const QuickFilters = ({ methods, handleSubmit }) => {
  const dispatch = useAsyncDispatch();
  const filterValues = useSelector(selectFeedbackFilterValues);
  const hasQuickFilterByDatePermission = usePermission(
    EFeedbackPermissions.Quick_filter_by_date
  );
  const hasQuickFilterByCampaignPermission = usePermission(
    EFeedbackPermissions.Quick_filter_by_campaign
  );
  const hasQuickFilterByStatusPermission = usePermission(
    EFeedbackPermissions.Quick_filter_by_status
  );
  const hasQuickFilterByFeedbackTypesPermission = usePermission(
    EFeedbackPermissions.Quick_filter_by_feedback_types
  );
  const hasQuickFilterByUserVisibilityPermission = usePermission(
    EFeedbackPermissions.Quick_filter_by_user_visibility
  );

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

  const resetQuickFilters = () => {
    methods.reset({
      config: {
        ...methods.watch("config"),
        quickFilters: defaultQuickFilterValues,
      },
    });
  };

  const feedbackTypesFilter = useMemo(() => {
    if (hasQuickFilterByFeedbackTypesPermission) {
      return (
        <Controller
          name="config.quickFilters.feedbackType"
          defaultValue={""}
          render={({ field }) => {
            return (
              <Box mr={2}>
                <ToggleButtonGroup
                  {...field}
                  exclusive
                  aria-label="text alignment"
                >
                  {quickFilterFeedbackTypes?.map((type, index) => {
                    return (
                      <StyledToggleButton
                        size="small"
                        key={index}
                        value={type.value}
                        selected={
                          methods.watch("config.quickFilters.feedbackType") ===
                          type.value
                        }
                      >
                        {type.label}
                      </StyledToggleButton>
                    );
                  })}
                </ToggleButtonGroup>
              </Box>
            );
          }}
        />
      );
    }
    return "";
  }, [hasQuickFilterByFeedbackTypesPermission, methods]);

  const userVisibilityFilter = useMemo(() => {
    if (hasQuickFilterByUserVisibilityPermission) {
      return (
        <Controller
          defaultValue="3"
          name="config.quickFilters.userVisibility"
          control={methods.control}
          render={({ field }) => {
            return (
              <Box>
                <ToggleButtonGroup
                  {...field}
                  exclusive
                  aria-label="text alignment"
                >
                  {quickFilterUserVisibilityTypes?.map((type, index) => {
                    return (
                      <StyledToggleButton
                        size="small"
                        key={index}
                        value={type.value}
                        selected={
                          methods.watch(
                            "config.quickFilters.userVisibility"
                          ) === String(type.value)
                        }
                      >
                        {type.label}
                      </StyledToggleButton>
                    );
                  })}
                </ToggleButtonGroup>
              </Box>
            );
          }}
        />
      );
    }
    return "";
  }, [hasQuickFilterByUserVisibilityPermission, methods]);

  return (
    <Box px={1} py={3}>
      <FormProvider {...methods}>
        <Grid container spacing={3}>
          {hasQuickFilterByDatePermission && (
            <Grid item xs={3}>
              <BasicRangePicker name="config.quickFilters.range" />
            </Grid>
          )}
          {hasQuickFilterByCampaignPermission && (
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
          )}
          {hasQuickFilterByStatusPermission && (
            <Grid
              item
              xs={3}
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
          )}
        </Grid>
        <Box pt={3} display="flex" justifyContent="space-between">
          <Box display="flex">
            {feedbackTypesFilter}
            {userVisibilityFilter}
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
