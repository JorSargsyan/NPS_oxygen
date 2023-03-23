import { Box, Grid } from "@mui/material";
import React from "react";
import BasicSelect from "shared/ui/Select";
import { translationModuleOptions } from "../constants";
import { FormProvider } from "react-hook-form";

const onFormatValue = (value: string) => {
  return {
    value: value.toString(),
    key: "Module",
    queryCondition: 2,
  };
};

const Filters = ({ methods, onChange }) => {
  return (
    <Box p={1}>
      <FormProvider {...methods}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <BasicSelect
              size="small"
              label="Status"
              options={translationModuleOptions}
              getLabel={(option) => option.name.toString()}
              getValue={(option) => option?.value?.toString() || ""}
              onFormatValue={onFormatValue}
              onChangeCB={onChange}
              name={"filters.filters[0]"}
            />
          </Grid>
        </Grid>
      </FormProvider>
    </Box>
  );
};

export default Filters;
