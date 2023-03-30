import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ButtonLoader from "shared/ui/ButtonLoader";
import TextInput from "shared/ui/TextInput";
import { selectSurveyInfo } from "store/slicers/campaignDetail";

const WelcomeForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const { details } = useSelector(selectSurveyInfo);
  const methods = useForm();

  const onSubmitForm = (formData) => {
    onSubmit(formData);
  };

  useEffect(() => {
    methods.reset({
      title: details.title,
    });
  }, [details?.title, methods]);

  return (
    <Box>
      <FormProvider {...methods}>
        <TextInput
          name="title"
          placeholder={"Type your welcome text here"}
          label="Title"
        />
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
export default WelcomeForm;
