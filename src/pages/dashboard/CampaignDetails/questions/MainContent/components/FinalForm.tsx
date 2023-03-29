import { Box } from "@mui/system";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import TextInput from "shared/ui/TextInput";
import { selectSurveyInfo } from "store/slicers/campaignDetail";

const FinalForm = () => {
  const { details } = useSelector(selectSurveyInfo);
  const methods = useForm();

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
          placeholder={"Type your final text here"}
          label="Title"
        />
      </FormProvider>
    </Box>
  );
};
export default FinalForm;
