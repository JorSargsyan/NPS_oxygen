import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { requiredRules } from "shared/helpers/validators";
import TextInput from "shared/ui/TextInput";

const MetricForm = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextInput
            name="title"
            placeholder={"Type your welcome text here"}
            rules={requiredRules}
            label="Title"
          />
        </Grid>
        <Grid item xs={6}>
          <TextInput
            name="metricConfig.metricLeftText"
            placeholder={"Type left text here"}
            label="Not Likely"
            rules={requiredRules}
          />
        </Grid>
        <Grid item xs={6}>
          <TextInput
            name="metricConfig.metricRightText"
            placeholder={"Type right text here"}
            label="Likely"
            rules={requiredRules}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default MetricForm;
