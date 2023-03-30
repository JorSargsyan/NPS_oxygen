import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ButtonLoader from "shared/ui/ButtonLoader";
import TextInput from "shared/ui/TextInput";
import { selectSurveyInfo } from "store/slicers/campaignDetail";

const NpsForm = ({ onSubmit }: { onSubmit: (data: any) => {} }) => {
  const { details } = useSelector(selectSurveyInfo);
  const methods = useForm();

  const onSubmitForm = (formData) => {
    onSubmit(formData);
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
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              name="metricConfig.metricLeftText"
              placeholder={"Type left text here"}
              label="Not Likely"
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              name="metricConfig.metricRightText"
              placeholder={"Type right text here"}
              label="Likely"
            />
          </Grid>
        </Grid>
      </FormProvider>
      <Box
        mt={2}
        width="10%"
        p={2}
        sx={{
          zIndex: 1100,
          position: "fixed",
          bottom: 0,
          right: 0,
        }}
        display="flex"
        justifyContent={"flex-end"}
      >
        <Box>
          <ButtonLoader
            fullWidth
            onClick={methods.handleSubmit(onSubmitForm)}
            isLoading={false}
            type="submit"
          >
            <Typography>{"Save"}</Typography>
          </ButtonLoader>
        </Box>
      </Box>
    </Box>
  );
};
export default NpsForm;
