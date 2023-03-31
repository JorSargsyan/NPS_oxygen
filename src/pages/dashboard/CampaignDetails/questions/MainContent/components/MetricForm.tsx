import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import TextInput from "shared/ui/TextInput";
import { selectSurveyInfo, setSurveyForm } from "store/slicers/campaignDetail";

const MetricForm = () => {
  const { details } = useSelector(selectSurveyInfo);
  const dispatch = useAsyncDispatch();
  const methods = useForm();

  const onSubmitForm = (formData) => {
    dispatch(setSurveyForm(formData));
  };

  useEffect(() => {
    methods.reset({
      title: details.title,
      metricConfig: {
        metricLeftText: details.metricConfig?.metricLeftText,
        metricRightText: details.metricConfig?.metricRightText,
      },
    });
  }, [
    details.metricConfig?.metricLeftText,
    details.metricConfig?.metricRightText,
    details.title,
    methods,
  ]);

  return (
    <Box>
      <FormProvider {...methods}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextInput
              name="title"
              placeholder={"Type your welcome text here"}
              label="Title"
              onBlur={methods.handleSubmit(onSubmitForm)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              name="metricConfig.metricLeftText"
              placeholder={"Type left text here"}
              label="Not Likely"
              onBlur={methods.handleSubmit(onSubmitForm)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              name="metricConfig.metricRightText"
              placeholder={"Type right text here"}
              label="Likely"
              onBlur={methods.handleSubmit(onSubmitForm)}
            />
          </Grid>
        </Grid>
      </FormProvider>
    </Box>
  );
};
export default MetricForm;
