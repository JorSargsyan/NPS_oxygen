import { Box } from "@mui/system";
import { Fragment, useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import TextInput from "shared/ui/TextInput";
import { selectSurveyInfo } from "store/slicers/campaignDetail";
import { ECampaignSurveyType } from "../LeftSidebar/constants";
import { Switch, Typography } from "@mui/material";
import BasicSelect from "shared/ui/Select";
import { CommentCharacterLimit, MultipleChoiceLimitOptions } from "./constants";

interface IFormData {
  isRequired: boolean;
  buttonText: string;
  multipleConfig?: {
    multipleType: number;
    multipleMin: string;
    multipleMax: string;
    multipleExact: number;
  };
  commentConfig?: {
    commentType: number;
    commentMin: number;
    commentMax: number;
  };
  metricConfig?: {
    customStartLength: number;
    customEndLength: number;
  };
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
      multipleConfig: {
        multipleType: surveyInfo.details?.multipleConfig?.multipleType,
        multipleExact: surveyInfo.details?.multipleConfig?.multipleExact,
        multipleMin:
          surveyInfo.details?.multipleConfig?.multipleMin?.toString() || "",
        multipleMax:
          surveyInfo.details?.multipleConfig?.multipleMax?.toString() || "",
      },
      commentConfig: {
        commentType: surveyInfo.details?.commentConfig?.commentType,
        commentMin: surveyInfo.details?.commentConfig?.commentMin,
        commentMax: surveyInfo.details?.commentConfig?.commentMax,
      },
      metricConfig: {
        customStartLength: surveyInfo.details?.metricConfig?.customStartLength,
        customEndLength: surveyInfo.details?.metricConfig?.customEndLength,
      },
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
                  name="multipleConfig.multipleType"
                  label={"Choice Limit"}
                  labelProp="name"
                  valueProp="value"
                  defaultValue={1}
                  options={MultipleChoiceLimitOptions}
                />
                {methods.watch("multipleConfig.multipleType") === 2 && (
                  <Box mt={2}>
                    <TextInput
                      name="multipleConfig.multipleExact"
                      label="Limit"
                    />
                  </Box>
                )}
                {methods.watch("multipleConfig.multipleType") === 3 && (
                  <Fragment>
                    <Box mt={2}>
                      <TextInput
                        name="multipleConfig.multipleMin"
                        label="Min limit"
                      />
                    </Box>
                    <Box mt={2}>
                      <TextInput
                        name="multipleConfig.multipleMax"
                        label="Max limit"
                      />
                    </Box>
                  </Fragment>
                )}
              </Fragment>
            )}
            {surveyInfo.details?.type ===
              Number(ECampaignSurveyType.Comment) && (
              <Fragment>
                <BasicSelect
                  size="small"
                  name="commentConfig.commentType"
                  label={"Character Limit"}
                  labelProp="name"
                  valueProp="value"
                  defaultValue={1}
                  options={CommentCharacterLimit}
                />
                {methods.watch("commentConfig.commentType") === 2 && (
                  <Fragment>
                    <Box mt={2}>
                      <TextInput
                        name="commentConfig.commentMin"
                        label="Min limit"
                      />
                    </Box>
                    <Box mt={2}>
                      <TextInput
                        name="commentConfig.commentMax"
                        label="Max limit"
                      />
                    </Box>
                  </Fragment>
                )}
              </Fragment>
            )}
            {surveyInfo.details?.type ===
              Number(ECampaignSurveyType.Rating) && (
              <Fragment>
                <Box mt={2}>
                  <TextInput
                    name="metricConfig.customStartLength"
                    label="Range Start"
                  />
                </Box>
                <Box mt={2}>
                  <TextInput
                    name="metricConfig.customEndLength"
                    label="Range End"
                  />
                </Box>
              </Fragment>
            )}
          </Fragment>
        )}
      </FormProvider>
    </Box>
  );
};

export default QuestionTab;
