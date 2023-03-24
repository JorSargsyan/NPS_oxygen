import { FormProvider, useForm } from "react-hook-form";
import TextInput from "shared/ui/TextInput";
import { requiredRules } from "shared/helpers/validators";
import ButtonLoader from "shared/ui/ButtonLoader";
import { Box, Tooltip, Typography } from "@mui/material";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { TestCustomersCampaign } from "store/slicers/campaigns";
import { useSelector } from "react-redux";
import { selectCampaignInfo } from "store/slicers/campaignDetail";
import { ERequestStatus } from "store/enums/index.enum";
import toast from "react-hot-toast";

const TestSMSForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const campaignInfo = useSelector(selectCampaignInfo);
  const dispatch = useAsyncDispatch();
  const methods = useForm({
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = async (formData) => {
    console.log(formData);
    const { meta } = await dispatch(
      TestCustomersCampaign({
        phoneNumbers: formData.phone.split(",").map((item) => item.trim()),
        campaignID: campaignInfo.id,
      })
    );
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }

    toast.success("Test SMS sended");
    onSuccess?.();
  };

  return (
    <FormProvider {...methods}>
      <Box mb={2}>
        <Tooltip
          title={
            "Phone number must be filled in with its country code. This field can contain multiple numbers separated with comma."
          }
        >
          <Typography>Phone numbers</Typography>
        </Tooltip>
      </Box>
      <TextInput
        name="phone"
        label="Recipient phone number"
        placeholder="37400000000, 37499999999"
        rules={requiredRules}
      />
      <Box display="flex" flexDirection={"row-reverse"} mt={2}>
        <ButtonLoader
          isLoading={false}
          onClick={methods.handleSubmit(onSubmit)}
        >
          <Typography>Test</Typography>
        </ButtonLoader>
      </Box>
    </FormProvider>
  );
};

export default TestSMSForm;
