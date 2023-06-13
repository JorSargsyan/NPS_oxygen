import { Typography } from "@mui/material";
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
import {
  selectButtonLoadingState,
  setButtonLoading,
} from "store/slicers/common";
import ButtonLoader from "shared/ui/ButtonLoader";
import { useSelector } from "react-redux";
import useTranslation from "shared/helpers/hooks/useTranslation";

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
  buttonTextColor: "#F0F0F0",
  questionColor: "#4A4A4A",
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
  const t = useTranslation();
  const btnLoading = useSelector(selectButtonLoadingState);
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
    await dispatch(setButtonLoading(true));
    if (editData) {
      const { meta } = await dispatch(
        UpdateSurveyTemplate({ data: formData, id: editData.id })
      );

      if (meta.requestStatus !== ERequestStatus.FULFILLED) {
        await dispatch(setButtonLoading(false));
        return;
      }
      dispatch(GetTemplates(Number(id)));
      await dispatch(setButtonLoading(false));
      onSuccess?.();
    } else {
      const { meta } = await dispatch(CreateSurveyTemplate(formData));

      if (meta.requestStatus !== ERequestStatus.FULFILLED) {
        await dispatch(setButtonLoading(false));
        return;
      }
      dispatch(GetTemplates(Number(id)));
      await dispatch(setButtonLoading(false));
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
        <Typography fontSize={16}>{t("question_color")}</Typography>
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
        <Typography fontSize={16}>{t("answer_color")}</Typography>
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
        <Typography fontSize={16}>{t("button_color")}</Typography>
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
        <Typography fontSize={16}>{t("button_text_color")}</Typography>
        <ColorPicker
          name="buttonTextColor"
          color={methods.watch("buttonTextColor")}
          onChange={handleChange}
        />
      </Box>
      <Box>
        <UploadImage
          name="logoImageBase64"
          title="logo_image"
          val={methods.watch("logoImageBase64")}
          onChange={handleChangeImage}
        />
      </Box>
      <Box>
        <UploadImage
          name="imageBase64"
          title="main_image"
          val={methods.watch("imageBase64")}
          onChange={handleChangeImage}
        />
      </Box>
      <Box display="flex" justifyContent={"flex-end"} mt={2}>
        <ButtonLoader
          variant="contained"
          onClick={methods.handleSubmit(onSubmit)}
          isLoading={btnLoading}
        >
          <Typography>{t("save")}</Typography>
        </ButtonLoader>
      </Box>
    </Box>
  );
};

export default AddEditTemplate;
