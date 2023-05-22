import { Box, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import useTranslation from "shared/helpers/hooks/useTranslation";
import { requiredRules } from "shared/helpers/validators";
import ButtonLoader from "shared/ui/ButtonLoader";
import TextInput from "shared/ui/TextInput";
import { ERequestStatus } from "store/enums/index.enum";
import { UpdateCampaign } from "store/slicers/campaigns";

interface IFormData {
  name: string;
}

const Rename = ({ data, onSuccess }: { data: any; onSuccess: () => void }) => {
  const dispatch = useAsyncDispatch();
  const methods = useForm<IFormData>();
  const t = useTranslation();

  const resetForm = useCallback(() => {
    methods.reset({
      name: data.name,
    });
  }, [data?.name, methods]);

  const onSubmit = async (formData: IFormData) => {
    const { meta } = await dispatch(UpdateCampaign({ formData, id: data.id }));

    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }
    onSuccess?.();
  };

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <FormProvider {...methods}>
      <Typography mb={2} fontSize={16}>
        {t("enter_new_survey_name")}
      </Typography>
      <TextInput name="name" rules={requiredRules} label={"name"} />
      <Box mt={2} display="flex" justifyContent={"flex-end"}>
        <ButtonLoader
          variant="outlined"
          onClick={methods.handleSubmit(onSubmit)}
          isLoading={false}
        >
          <Typography>{t("submit")}</Typography>
        </ButtonLoader>
      </Box>
    </FormProvider>
  );
};

export default Rename;
