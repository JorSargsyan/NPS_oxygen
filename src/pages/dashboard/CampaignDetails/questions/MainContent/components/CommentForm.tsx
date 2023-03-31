import { Box } from "@mui/system";
import { useCallback, memo, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { requiredRules } from "shared/helpers/validators";
import TextInput from "shared/ui/TextInput";
import { selectSurveyInfo, setSurveyForm } from "store/slicers/campaignDetail";

const CommentForm = () => {
  const dispatch = useAsyncDispatch();
  const { details } = useSelector(selectSurveyInfo);
  const methods = useForm({
    mode: "all",
  });

  const onSubmit = async (formData) => {
    dispatch(setSurveyForm(formData));
  };

  const handleReset = useCallback(() => {
    const data = details;
    if (!data) {
      return;
    }
    methods.reset({
      title: data.title,
    });
  }, [details, methods]);

  useEffect(() => {
    handleReset();
  }, [handleReset]);

  return (
    <Box>
      <FormProvider {...methods}>
        <TextInput
          name="title"
          placeholder={"Type your comment here"}
          label="Title"
          onBlur={methods.handleSubmit(onSubmit)}
          rules={requiredRules}
        />
      </FormProvider>
    </Box>
  );
};
export default memo(CommentForm);
