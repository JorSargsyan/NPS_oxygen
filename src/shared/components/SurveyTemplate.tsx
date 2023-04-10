import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ECampaignSurveyType } from "pages/dashboard/CampaignDetails/questions/LeftSidebar/constants";
import { ESurveyPreviewComps } from "pages/Survey/constants";
import { memo, useCallback } from "react";
import { FormProvider } from "react-hook-form";
import { EBaseUrl } from "store/config/constants";
import { ITemplate } from "store/interfaces/campaignDetails";
import {
  IQuestionConfig,
  IQuestionDetails,
} from "store/interfaces/surveyPreview";

export enum ESurveyTypes {
  Preview = "preview",
  Customer = "customer",
}

export interface ISurveyTemplateQuestionData {
  details: IQuestionDetails;
  config: IQuestionConfig;
  template?: ITemplate;
}
interface IProps {
  methods: any;
  type?: ESurveyTypes;
  handleSkip?: () => void;
  handleNext?: (data: any) => void;
  checkDisabled?: boolean;
  questionData: ISurveyTemplateQuestionData;
}

const SurveyTemplate = ({
  methods,
  type = ESurveyTypes.Preview,
  handleSkip,
  handleNext,
  checkDisabled,
  questionData,
}: IProps) => {
  const PreviewComp = useCallback(() => {
    const Comp = ESurveyPreviewComps[questionData?.details.type];
    return <Comp questionData={questionData} />;
  }, [questionData]);

  return (
    <Box>
      <Box
        display="flex"
        justifyContent={"center"}
        sx={{
          "& img": {
            borderRadius: "10px",
            maxHeight: "100%",
            width: "100%",
            height: 250,
            objectFit: "cover",
          },
        }}
      >
        <img
          src={
            type !== ESurveyTypes.Preview
              ? `${EBaseUrl.MediaTemplateURL}/${questionData?.details?.template?.logoImage}`
              : `${EBaseUrl.MediaTemplateURL}/${questionData?.template?.logoImage}`
          }
          alt={questionData?.details?.title}
        />
      </Box>
      <Box mt={2}>
        <FormProvider {...methods}>
          <Box display="flex" justifyContent={"center"}>
            <Typography variant="h5">
              {questionData?.details?.title}{" "}
            </Typography>
            {questionData?.details?.isRequired ? (
              <Typography ml={2} fontSize={20} color="error">
                *
              </Typography>
            ) : null}
          </Box>
          <Box minHeight="20vh">
            {ESurveyPreviewComps?.[questionData?.details?.type] && (
              <PreviewComp />
            )}
          </Box>
          {questionData?.details?.type !==
            Number(ECampaignSurveyType.Final) && (
            <Box display="flex" justifyContent={"flex-end"} gap={2} pt={2}>
              {!questionData?.details?.isRequired &&
                questionData?.details?.type !==
                  Number(ECampaignSurveyType.Welcome) && (
                  <Button
                    onClick={
                      type === ESurveyTypes.Customer ? handleSkip : undefined
                    }
                    variant="contained"
                  >
                    <Typography>{"Skip"}</Typography>
                  </Button>
                )}
              <Button
                disabled={type === ESurveyTypes.Customer ? checkDisabled : true}
                onClick={
                  type === ESurveyTypes.Customer
                    ? methods.handleSubmit(handleNext)
                    : undefined
                }
                variant="contained"
              >
                <Typography>{questionData?.details?.buttonText}</Typography>
              </Button>
            </Box>
          )}
        </FormProvider>
      </Box>
    </Box>
  );
};

export default memo(SurveyTemplate);
