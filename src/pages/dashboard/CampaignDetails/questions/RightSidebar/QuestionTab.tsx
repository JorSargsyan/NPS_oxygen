import { Box } from "@mui/system";
import { Fragment, useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import TextInput from "shared/ui/TextInput";
import { selectSurveyInfo } from "store/slicers/campaignDetail";
import { ECampaignSurveyType } from "../LeftSidebar/constants";
import { Switch, Typography } from "@mui/material";
import BasicSelect from "shared/ui/Select";
import { MultipleChoiceLimitOptions } from "./constants";

interface IFormData {
  isRequired: boolean;
  buttonText: string;
  multipleType: number;
  multipleMin: string;
  multipleMax: string;
  multipleExact: number;
}

const QuestionTab = () => {
  const methods = useForm<IFormData>({
    defaultValues: {
      isRequired: false,
    },
  });
  const surveyInfo = useSelector(selectSurveyInfo);

  useEffect(() => {
    if (!surveyInfo.details) {
      return;
    }
    methods.reset({
      buttonText: surveyInfo.details.buttonText,
      isRequired: surveyInfo.details?.isRequired,
      multipleType: surveyInfo.details?.multipleConfig?.multipleType,
      multipleExact: surveyInfo.details?.multipleConfig?.multipleExact,
      multipleMin:
        surveyInfo.details?.multipleConfig?.multipleMin?.toString() || "",
      multipleMax:
        surveyInfo.details?.multipleConfig?.multipleMax?.toString() || "",
    });
  }, [methods, surveyInfo?.details, surveyInfo?.details?.buttonText]);

  return (
    <Box p={2}>
      <FormProvider {...methods}>
        {surveyInfo.details?.type !== Number(ECampaignSurveyType.Final) && (
          <Fragment>
            <TextInput name="buttonText" label="Button Text" />
            <Box display="flex" my={2} ml={0.5} alignItems={"center"}>
              <Typography>Mandatory</Typography>
              <Controller
                name="isRequired"
                control={methods.control}
                render={({ field }) => (
                  <Switch {...field} checked={field.value} />
                )}
              />
            </Box>
            {surveyInfo.details?.type ===
              Number(ECampaignSurveyType.MultipleChoice) && (
              <Fragment>
                <BasicSelect
                  size="small"
                  name="multipleType"
                  label={"Choice Limit"}
                  labelProp="name"
                  valueProp="value"
                  defaultValue={1}
                  options={MultipleChoiceLimitOptions}
                />
                {methods.watch("multipleType") === 2 && (
                  <Box mt={2}>
                    <TextInput name="multipleExact" label="Limit" />
                  </Box>
                )}
                {methods.watch("multipleType") === 3 && (
                  <Fragment>
                    <Box mt={2}>
                      <TextInput name="multipleMin" label="Min limit" />
                    </Box>
                    <Box mt={2}>
                      <TextInput name="multipleMax" label="Max limit" />
                    </Box>
                  </Fragment>
                )}
              </Fragment>
            )}
          </Fragment>
        )}
      </FormProvider>
    </Box>
  );
};

export default QuestionTab;
