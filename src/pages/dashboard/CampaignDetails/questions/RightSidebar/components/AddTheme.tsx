import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ColorPicker from "shared/components/ColorPicker";
import { requiredRules } from "shared/helpers/validators";
import TextInput from "shared/ui/TextInput";

const AddTheme = ({ onSuccess }: { onSuccess }) => {
  const methods = useForm({
    defaultValues: {},
  });

  const [colors, setColors] = useState({
    button: "#DDDCDC",
    buttonText: "#DDDCDC",
    question: "#DDDCDC",
    answer: "#DDDCDC",
  });

  const handleChange = (name: string, { hex }) => {
    setColors((state) => {
      return {
        ...state,
        [name]: hex,
      };
    });
  };

  const onSubmit = (formData) => {
    console.log(formData, colors);
  };

  return (
    <Box>
      <FormProvider {...methods}>
        <Box mb={2}>
          <TextInput name="name" label={"Name"} rules={requiredRules} />
        </Box>
      </FormProvider>
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography fontSize={16}>Question Color</Typography>
        <ColorPicker
          name="question"
          color={colors.question}
          onChange={handleChange}
        />
      </Box>
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography fontSize={16}>Answer Color</Typography>
        <ColorPicker
          name="answer"
          color={colors.answer}
          onChange={handleChange}
        />
      </Box>
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography fontSize={16}>Button Color</Typography>
        <ColorPicker
          name="button"
          color={colors.button}
          onChange={handleChange}
        />
      </Box>
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography fontSize={16}>Button text Color</Typography>
        <ColorPicker
          name="buttonText"
          color={colors.buttonText}
          onChange={handleChange}
        />
      </Box>
      <Box display="flex" justifyContent={"flex-end"} mt={2}>
        <Button variant="contained" onClick={methods.handleSubmit(onSubmit)}>
          <Typography>Save</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default AddTheme;
