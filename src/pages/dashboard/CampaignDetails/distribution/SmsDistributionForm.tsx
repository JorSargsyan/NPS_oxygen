import { Button, Divider, Switch, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import BasicAutocomplete from "shared/ui/Autocomplete";
import TextInput from "shared/ui/TextInput";
import LinkIcon from "@heroicons/react/24/outline/LinkIcon";
import EnvelopeIcon from "@heroicons/react/24/outline/EnvelopeIcon";
import {
  DistributionSchedule,
  GetCampaignById,
  GetCampaignTriggers,
  selectCampaignInfo,
  selectTriggers,
} from "store/slicers/campaignDetail";
import RightDrawer from "shared/ui/Drawer";
import { Fragment, useEffect, useState } from "react";
import TestSMSForm from "./TestSMSForm";
import ButtonLoader from "shared/ui/ButtonLoader";
import { requiredRules } from "shared/helpers/validators";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import toast from "react-hot-toast";
import { ERequestStatus } from "store/enums/index.enum";
import { useParams } from "react-router-dom";

const defaultValues = {
  ignoreQuarantine: false,
  message: "",
  numberOfTransaction: "",
  postpone: false,
  postponeTime: "",
  quarantinePeriod: "",
  surveyQuarantine: false,
  triggerIDs: [],
};

const SmsDistributionForm = () => {
  const { surveyID } = useParams();
  const campaignInfo = useSelector(selectCampaignInfo);
  const dispatch = useAsyncDispatch();
  const [testSmsOpen, setTestSmsOpen] = useState(false);
  const methods = useForm({
    defaultValues,
    mode: "onChange",
  });
  const triggers = useSelector(selectTriggers);

  const handleAddLink = () => {
    methods.setValue("message", methods.watch("message") + " {link}");
  };

  const onSubmit = async (formData) => {
    const { triggerIDs, ...rest } = formData;

    const data = {
      ...rest,
      triggerIDs: triggerIDs.map((item) => {
        return item.id;
      }),
    };

    const { meta } = await dispatch(
      DistributionSchedule({ id: Number(surveyID), data })
    );

    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }

    toast.success("Campaign schedule is set.");
  };

  useEffect(() => {
    if (campaignInfo) {
      methods.reset({
        ignoreQuarantine: campaignInfo.ignoreQuarantine,
        message: campaignInfo.message,
        numberOfTransaction: campaignInfo.numberOfTransaction.toString(),
        postpone: campaignInfo.postpone,
        postponeTime: campaignInfo.postponeTime.toString(),
        quarantinePeriod: campaignInfo.quarantinePeriod.toString(),
        surveyQuarantine: campaignInfo.surveyQuarantine,
        triggerIDs: triggers.filter((i) =>
          campaignInfo.triggerIDs.includes(i.id)
        ),
      });
    }
  }, [campaignInfo, methods, triggers]);

  useEffect(() => {
    Promise.all([
      dispatch(GetCampaignTriggers()),
      dispatch(GetCampaignById(Number(surveyID))),
    ]);
  }, [dispatch, surveyID]);

  return (
    <Box p={4}>
      <FormProvider {...methods}>
        <Box display="flex">
          <Box flex={1}>
            <Typography fontSize={18} fontWeight={600} mb={2}>
              Schedule
            </Typography>
          </Box>
          <Box flex={1}>
            <Typography ml={6} fontSize={18} fontWeight={600} mb={2}>
              Message details
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent={"space-between"}>
          <Box flex={1}>
            <Box
              display="flex"
              justifyContent={"space-between"}
              alignItems={"stretch"}
              mb={2}
            >
              <Box flex={1} display="flex" alignItems="center">
                <Tooltip
                  title={
                    "Here you can select the trigger source from where you want to receive the triggers. "
                  }
                >
                  <Typography fontWeight={500}>Trigger source</Typography>
                </Tooltip>
              </Box>
              <Box flex={1}>
                <BasicAutocomplete
                  options={triggers}
                  inputLabel={"Triggers"}
                  name={"triggerIDs"}
                  onChangeCB={() => methods.trigger("triggerIDs")}
                  rules={requiredRules}
                  optionLabel="label"
                  defaultValue={[]}
                  multiple
                />
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent={"space-between"}
              alignItems={"stretch"}
              mb={2}
            >
              <Box flex={1} display="flex" alignItems="center">
                <Tooltip
                  title={
                    "In case activating this function the survey will be sent to the customer after the predefined minutes.  "
                  }
                >
                  <Typography fontWeight={500}>Postpone survey</Typography>
                </Tooltip>
              </Box>
              <Box flex={1}>
                <Controller
                  name="postpone"
                  control={methods.control}
                  render={({ field }) => (
                    <Switch color="success" {...field} checked={field.value} />
                  )}
                />
              </Box>
            </Box>
            {methods.watch("postpone") && (
              <Box
                display="flex"
                justifyContent={"space-between"}
                alignItems={"stretch"}
                mb={2}
              >
                <Box flex={1} display="flex" alignItems="center">
                  <Typography fontWeight={500}>Postpone survey for</Typography>
                </Box>
                <Box flex={1}>
                  <TextInput
                    rules={requiredRules}
                    label="minutes"
                    name="postponeTime"
                  />
                </Box>
              </Box>
            )}
            <Divider />
          </Box>
          <Box flex={1}>
            <Box ml={6}>
              <TextInput name="message" label="Message text" />
              <Box mt={2}>
                <Box display="flex">
                  <Tooltip title="Click on the button to add the link where you want it to be appeared in the text. ">
                    <Button
                      startIcon={<LinkIcon height={20} />}
                      variant="outlined"
                      disabled={methods.watch("message")?.includes("{link}")}
                      onClick={handleAddLink}
                    >
                      <Typography>Add link</Typography>
                    </Button>
                  </Tooltip>
                  <Box ml={2}>
                    <Button
                      startIcon={<EnvelopeIcon height={20} />}
                      variant="outlined"
                      onClick={() => setTestSmsOpen(true)}
                    >
                      <Typography>Test SMS</Typography>
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Typography mt={2} fontSize={18} fontWeight={600} mb={2}>
          Quarantine
        </Typography>
        <Box display="flex" justifyContent={"space-between"}>
          <Box flex={1}>
            <Box
              display="flex"
              justifyContent={"space-between"}
              alignItems={"stretch"}
              mb={2}
            >
              <Box flex={1} display="flex" alignItems="center">
                <Tooltip
                  title={
                    "In case activating this function the customers will be quarantined after the predefined transactions."
                  }
                >
                  <Typography fontWeight={500}>Customer quarantine</Typography>
                </Tooltip>
              </Box>
              <Box flex={1}>
                <Controller
                  name="surveyQuarantine"
                  control={methods.control}
                  render={({ field }) => (
                    <Switch color="success" {...field} checked={field.value} />
                  )}
                />
              </Box>
            </Box>
            {methods.watch("surveyQuarantine") && (
              <Fragment>
                <Box
                  display="flex"
                  justifyContent={"space-between"}
                  alignItems={"stretch"}
                  mb={2}
                >
                  <Box flex={1} display="flex" alignItems="center">
                    <Typography fontWeight={500}>
                      Quarantine the customer after
                    </Typography>
                  </Box>
                  <Box flex={1}>
                    <TextInput
                      rules={requiredRules}
                      label="transaction"
                      name="numberOfTransaction"
                    />
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent={"space-between"}
                  alignItems={"stretch"}
                  mb={2}
                >
                  <Box flex={1} display="flex" alignItems="center">
                    <Typography fontWeight={500}>
                      Quarantine the customer for
                    </Typography>
                  </Box>
                  <Box flex={1}>
                    <TextInput
                      rules={requiredRules}
                      label="days"
                      name="quarantinePeriod"
                    />
                  </Box>
                </Box>
              </Fragment>
            )}
            <Box
              display="flex"
              justifyContent={"space-between"}
              alignItems={"stretch"}
              mb={2}
            >
              <Box flex={1} mb={6} display="flex" alignItems="center">
                <Tooltip
                  title={
                    "In case activation of this function the survey will be sent the quarantined customers as well after receiving the trigger."
                  }
                >
                  <Typography fontWeight={500}>
                    Include the quarantined customers
                  </Typography>
                </Tooltip>
              </Box>
              <Box flex={1}>
                <Controller
                  name="ignoreQuarantine"
                  control={methods.control}
                  render={({ field }) => (
                    <Switch color="success" {...field} checked={field.value} />
                  )}
                />
              </Box>
            </Box>
          </Box>
          <Box flex={1} />
        </Box>
      </FormProvider>
      <Box
        mt={2}
        width="100%"
        p={2}
        sx={{
          zIndex: 1100,
          position: "fixed",
          bottom: 0,
          right: 0,
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: "white",
        }}
        display="flex"
        justifyContent={"flex-end"}
      >
        <Box>
          <ButtonLoader
            fullWidth
            onClick={methods.handleSubmit(onSubmit)}
            isLoading={false}
            disabled={!Object.keys(methods.formState.touchedFields).length}
            type="submit"
          >
            <Typography>{"Save"}</Typography>
          </ButtonLoader>
        </Box>
      </Box>
      <RightDrawer
        open={testSmsOpen}
        setOpen={() => setTestSmsOpen(false)}
        title={"Test SMS"}
      >
        <TestSMSForm onSuccess={() => setTestSmsOpen(false)} />
      </RightDrawer>
    </Box>
  );
};

export default SmsDistributionForm;
