import { Box, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import TextInput from "shared/ui/TextInput";
import { CreateCampaign } from "store/slicers/campaigns";
import { ERequestStatus } from "store/enums/index.enum";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import ButtonLoader from "shared/ui/ButtonLoader";
import { requiredRules } from "shared/helpers/validators";

interface IFormData {
  name: string;
}

const defaultValues = {
  name: "",
};

const AddCampaign = ({ onSuccess }: { onSuccess: (id: number) => void }) => {
  const methods = useForm<IFormData>({
    defaultValues,
  });
  const dispatch = useAsyncDispatch();

  const onSubmit = async (formData) => {
    const { meta, payload } = await dispatch(
      CreateCampaign({
        surveyMetric: "1",
        touchpoint: "1",
        type: "1",
        name: formData.name,
      })
    );
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }

    onSuccess?.(payload);
  };

  return (
    <FormProvider {...methods}>
      <Box display="flex" justifyContent="space-between">
        <Box flex={1}>
          <TextInput name={"name"} label={"Name"} rules={requiredRules} />
        </Box>
      </Box>
      <Box
        mt={2}
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        display="flex"
        justifyContent={"flex-end"}
      >
        <Box>
          <ButtonLoader
            onClick={methods.handleSubmit(onSubmit)}
            isLoading={false}
            type="submit"
          >
            <Typography>Save</Typography>
          </ButtonLoader>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default AddCampaign;
