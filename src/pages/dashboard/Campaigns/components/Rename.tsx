import { Box, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
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
        Please enter new name for the campaign
      </Typography>
      <TextInput name="name" rules={requiredRules} label={"Name"} />
      <Box mt={2} display="flex" justifyContent={"flex-end"}>
        <ButtonLoader
          variant="outlined"
          onClick={methods.handleSubmit(onSubmit)}
          isLoading={false}
        >
          <Typography>Submit</Typography>
        </ButtonLoader>
      </Box>
    </FormProvider>
  );
};

export default Rename;
