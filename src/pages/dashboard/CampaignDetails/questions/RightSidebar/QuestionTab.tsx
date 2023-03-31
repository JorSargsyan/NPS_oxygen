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

const QuestionTab = () => {
  const { watch, control } = useFormContext();
  const surveyInfo = useSelector(selectSurveyInfo);

  return (
    <Box p={2}>
      {surveyInfo.details?.type !== Number(ECampaignSurveyType.Final) && (
        <Fragment>
          <TextInput name="buttonText" label="Button Text" />
          <Box display="flex" my={2} ml={0.5} alignItems={"center"}>
            <Typography>Mandatory</Typography>
            <Controller
              name="isRequired"
              control={control}
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
              {watch("multipleConfig.multipleType") === 2 && (
                <Box mt={2}>
                  <TextInput
                    name="multipleConfig.multipleExact"
                    label="Limit"
                  />
                </Box>
              )}
              {watch("multipleConfig.multipleType") === 3 && (
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
          {surveyInfo.details?.type === Number(ECampaignSurveyType.Rating) && (
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
    </Box>
  );
};

export default QuestionTab;
