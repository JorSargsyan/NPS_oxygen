import { Box, Grid } from "@mui/material";
import BasicSelect from "shared/ui/Select";
// import { CustomerStatusList } from "../constants";
import { FormProvider } from "react-hook-form";
import BasicRangePicker from "shared/ui/RangePicker";

const onFormatValue = (value: string) => {
  return {
    value: value.toString(),
    key: "CustomerStatus",
    queryCondition: 2,
  };
};

const QuickFilters = ({ methods, onChange }) => {
  return (
    <Box p={1}>
      <FormProvider {...methods}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <BasicRangePicker name="range" />
          </Grid>
        </Grid>
      </FormProvider>
    </Box>
  );
};

export default QuickFilters;
