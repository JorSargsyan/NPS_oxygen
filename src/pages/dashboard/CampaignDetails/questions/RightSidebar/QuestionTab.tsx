import { Box } from "@mui/system";
import { Fragment } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import TextInput from "shared/ui/TextInput";
import { selectSurveyInfo } from "store/slicers/campaignDetail";
import { ECampaignSurveyType } from "../LeftSidebar/constants";
import { Switch, Typography } from "@mui/material";
import BasicSelect from "shared/ui/Select";
import { CommentCharacterLimit, MultipleChoiceLimitOptions } from "./constants";
import { requiredRules } from "shared/helpers/validators";

const QuestionTab = () => {
  const { watch, control, trigger } = useFormContext();
  const surveyInfo = useSelector(selectSurveyInfo);

  const multipleRule = {
    max: {
      message: `The value must be less than or equal to 
  ${watch("answers").length}`,
      value: watch("answers").length,
    },
    min: {
      message: "The value must be more than 1",
      value: 1,
    },
    validate: () => {
      return (
        Number(watch("multipleConfig.multipleMin")) <
          Number(watch("multipleConfig.multipleMax")) ||
        "Min limit must be less than Max limit"
      );
    },
  };

  const commentRules = {
    validate: () => {
      return (
        Number(watch("commentConfig.commentMin")) <
          Number(watch("commentConfig.commentMax")) ||
        "Comment min limit must be less than max limit"
      );
    },
  };

  const metricRules = {
    max: {
      value: 10,
      message: "Value must be less than or equal to 10",
    },
    validate: () => {
      if (
        Number(watch("metricConfig.customEndLength")) <
        Number(watch("metricConfig.customStartLength"))
      ) {
        return "Range start must be less than range end";
      }

      if (
        Number(watch("metricConfig.customEndLength")) -
          Number(watch("metricConfig.customStartLength")) <
        2
      ) {
        return "The range must include at least 3 values";
      }
      return true;
    },
  };

  const handleBlurTrigger = () => {
    trigger();
  };

  return (
    <Box p={2}>
      {surveyInfo.details?.type !== Number(ECampaignSurveyType.Final) && (
        <Fragment>
          <TextInput
            name="buttonText"
            label="Button Text"
            rules={{
              ...requiredRules,
              maxLength: {
                value: 14,
                message: "Max length is 14 symbols",
              },
              minLength: {
                value: 2,
                message: "Min length is 2 symbols",
              },
            }}
          />
          {surveyInfo.details?.type !== Number(ECampaignSurveyType.Final) &&
            surveyInfo.details?.type !==
              Number(ECampaignSurveyType.Welcome) && (
              <Box display="flex" my={2} ml={0.5} alignItems={"center"}>
                <Typography>Mandatory</Typography>
                <Controller
                  name="isRequired"
                  control={control}
                  render={({ field }) => (
                    <Switch {...field} checked={field.value || false} />
                  )}
                />
              </Box>
            )}

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
              {watch("multipleConfig.multipleType") === 2 && (
                <Box mt={2}>
                  <TextInput
                    type="number"
                    name="multipleConfig.multipleExact"
                    label="Limit"
                    rules={{
                      ...requiredRules,
                      ...multipleRule,
                    }}
                  />
                </Box>
              )}
              {watch("multipleConfig.multipleType") === 3 && (
                <Fragment>
                  <Box mt={2}>
                    <TextInput
                      type="number"
                      name="multipleConfig.multipleMin"
                      label="Min limit"
                      onBlur={handleBlurTrigger}
                      rules={{ ...requiredRules, ...multipleRule }}
                    />
                  </Box>
                  <Box mt={2}>
                    <TextInput
                      type="number"
                      name="multipleConfig.multipleMax"
                      label="Max limit"
                      onBlur={handleBlurTrigger}
                      rules={{ ...requiredRules, ...multipleRule }}
                    />
                  </Box>
                </Fragment>
              )}
            </Fragment>
          )}
          {surveyInfo.details?.type === Number(ECampaignSurveyType.Comment) && (
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
              {watch("commentConfig.commentType") === 2 && (
                <Fragment>
                  <Box mt={2}>
                    <TextInput
                      name="commentConfig.commentMin"
                      label="Min limit"
                      onBlur={handleBlurTrigger}
                      rules={{ ...requiredRules, ...commentRules }}
                    />
                  </Box>
                  <Box mt={2}>
                    <TextInput
                      name="commentConfig.commentMax"
                      label="Max limit"
                      onBlur={handleBlurTrigger}
                      rules={{ ...requiredRules, ...commentRules }}
                    />
                  </Box>
                </Fragment>
              )}
            </Fragment>
          )}
          {surveyInfo.details?.type === Number(ECampaignSurveyType.Rating) && (
            <Fragment>
              <Box mt={2}>
                <TextInput
                  name="metricConfig.customStartLength"
                  label="Range Start"
                  rules={{ ...requiredRules, ...metricRules }}
                />
              </Box>
              <Box mt={2}>
                <TextInput
                  name="metricConfig.customEndLength"
                  label="Range End"
                  rules={{ ...requiredRules, ...metricRules }}
                />
              </Box>
            </Fragment>
          )}
        </Fragment>
      )}
    </Box>
  );
};

export default QuestionTab;
