import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ColorPicker from "shared/components/ColorPicker";
import { requiredRules } from "shared/helpers/validators";
import TextInput from "shared/ui/TextInput";
import { ITemplate } from "store/interfaces/campaignDetails";
import UploadImage from "./UploadImage";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import {
  CreateSurveyTemplate,
  GetTemplates,
  UpdateSurveyTemplate,
} from "store/slicers/campaignDetail";
import { ERequestStatus } from "store/enums/index.enum";
import { useParams } from "react-router-dom";

interface IFormData {
  name: string;
  buttonColor: string;
  buttonTextColor: string;
  questionColor: string;
  answerColor: string;
  imageBase64: string;
  logoImageBase64: string;
}

const defaultValues: IFormData = {
  name: "",
  buttonColor: "#DDDCDC",
  buttonTextColor: "#DDDCDC",
  questionColor: "#DDDCDC",
  answerColor: "#DDDCDC",
  logoImageBase64: "",
  imageBase64: "",
};

const AddEditTemplate = ({
  onSuccess,
  editData,
}: {
  onSuccess;
  editData: ITemplate;
}) => {
  const { id } = useParams();
  const dispatch = useAsyncDispatch();
  const methods = useForm({
    defaultValues,
  });

  const handleChange = (name: keyof IFormData, { hex }) => {
    methods.setValue(name, hex);
  };

  const init = useCallback(() => {
    if (editData) {
      methods.reset({
        name: editData.name,
        buttonColor: editData.buttonColor || defaultValues.buttonColor,
        buttonTextColor:
          editData.buttonTextColor || defaultValues.buttonTextColor,
        questionColor: editData.questionColor || defaultValues.questionColor,
        answerColor: editData.answerColor || defaultValues.answerColor,
        logoImageBase64: editData.logoImageBase64,
        imageBase64: editData.imageBase64,
      });
    }
  }, [editData, methods]);

  const handleChangeImage = (val, name) => {
    methods.setValue(name, val);
  };

  useEffect(() => {
    init();
  }, [init]);

  const onSubmit = async (formData: IFormData) => {
    if (editData) {
      const { meta } = await dispatch(
        UpdateSurveyTemplate({ data: formData, id: editData.id })
      );

      if (meta.requestStatus !== ERequestStatus.FULFILLED) {
        return;
      }
      dispatch(GetTemplates(Number(id)));
      onSuccess?.();
    } else {
      const { meta } = await dispatch(CreateSurveyTemplate(formData));

      if (meta.requestStatus !== ERequestStatus.FULFILLED) {
        return;
      }
      dispatch(GetTemplates(Number(id)));
      onSuccess?.();
    }
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
          name="questionColor"
          color={methods.watch("questionColor")}
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
          name="answerColor"
          color={methods.watch("answerColor")}
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
          name="buttonColor"
          color={methods.watch("buttonColor")}
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
          name="buttonTextColor"
          color={methods.watch("buttonTextColor")}
          onChange={handleChange}
        />
      </Box>
      <Box>
        <UploadImage
          name="logoImageBase64"
          title="Logo image"
          val={methods.watch("logoImageBase64")}
          onChange={handleChangeImage}
        />
      </Box>
      <Box>
        <UploadImage
          name="imageBase64"
          title="Main image"
          val={methods.watch("imageBase64")}
          onChange={handleChangeImage}
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

export default AddEditTemplate;
