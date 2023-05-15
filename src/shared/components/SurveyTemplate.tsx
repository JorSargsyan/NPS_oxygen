import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Logo from "assets/icons/powered_by.svg";
import defaultImg from "assets/images/survey_bg.png";
import { EQuestionPreviewType } from "pages/dashboard/CampaignDetails/components/QuestionPreview";
import { ECampaignSurveyType } from "pages/dashboard/CampaignDetails/questions/LeftSidebar/constants";
import { ESurveyPreviewComps } from "pages/Survey/constants";
import { memo, useCallback, useMemo } from "react";
import { FormProvider } from "react-hook-form";
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
  methods?: any;
  type?: ESurveyTypes;
  handleSkip?: () => void;
  handleNext?: (data: any) => void;
  checkDisabled?: boolean;
  questionData: ISurveyTemplateQuestionData;
  viewType?: number;
}

const SurveyTemplate = ({
  methods,
  type = ESurveyTypes.Preview,
  handleSkip,
  handleNext,
  checkDisabled,
  questionData,
  viewType,
}: IProps) => {
  const PreviewComp = useCallback(() => {
    const Comp = ESurveyPreviewComps[questionData?.details.type];
    return (
      <Comp
        questionData={questionData}
        hasMode={type === ESurveyTypes.Preview}
      />
    );
  }, [questionData, type]);

  const getQuestionInfo = useMemo(() => {
    if (type !== ESurveyTypes.Preview) {
      return {
        image: questionData?.details?.template?.imageBase64
          ? questionData?.details?.template?.imageBase64
          : defaultImg,
        logoImage: questionData?.details?.template?.logoImageBase64
          ? questionData?.details?.template?.logoImageBase64
          : defaultImg,
        buttonColor: questionData?.details?.template?.buttonColor,
        answerColor: questionData?.details?.template?.answerColor,
        buttonTextColor: questionData?.details?.template?.buttonTextColor,
        questionColor: questionData?.details?.template?.questionColor,
      };
    } else {
      return {
        image: questionData?.template?.imageBase64
          ? questionData?.template?.imageBase64
          : defaultImg,
        logoImage: questionData?.template?.logoImageBase64
          ? questionData?.template?.logoImageBase64
          : defaultImg,
        buttonColor: questionData?.template?.buttonColor,
        answerColor: questionData?.template?.answerColor,
        buttonTextColor: questionData?.template?.buttonTextColor,
        questionColor: questionData?.template?.questionColor,
      };
    }
  }, [
    questionData?.details?.template?.answerColor,
    questionData?.details?.template?.buttonColor,
    questionData?.details?.template?.buttonTextColor,
    questionData?.details?.template?.logoImageBase64,
    questionData?.details?.template?.questionColor,
    questionData?.template?.answerColor,
    questionData?.template?.buttonColor,
    questionData?.template?.buttonTextColor,
    questionData?.template?.logoImageBase64,
    questionData?.template?.questionColor,
    questionData?.details?.template?.imageBase64,
    questionData?.template?.imageBase64,
    type,
  ]);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <img
          style={{ width: "200px" }}
          src={getQuestionInfo?.logoImage}
          alt="logo"
        />
      </Box>
      <Box
        display="flex"
        justifyContent={"center"}
        sx={{
          "& img": {
            borderRadius: "10px",
            maxHeight: "100%",
            width: "100%",
            height:
              type === ESurveyTypes.Preview &&
              viewType === EQuestionPreviewType.MOBILE
                ? 200
                : { xs: 200, sm: 250 },
            objectFit: "contain",
          },
        }}
      >
        <img src={getQuestionInfo?.image} alt={questionData?.details?.title} />
      </Box>
      <Box mt={4}>
        <FormProvider {...methods}>
          <Box display="flex" justifyContent={"center"} mb={1}>
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: 16 },
                fontWeight: "400",
                display: "flex",
                alignItems: "center",
                color: getQuestionInfo?.questionColor,
              }}
            >
              {questionData?.details?.title}
              {questionData?.details?.isRequired ? "*" : ""}
            </Typography>
          </Box>
          <Box minHeight="10vh">
            {ESurveyPreviewComps?.[questionData?.details?.type] && (
              <PreviewComp />
            )}
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            pt={2}
          >
            <img src={Logo} alt="logo" />
          </Box>
          {questionData?.details?.type !==
            Number(ECampaignSurveyType.Final) && (
            <Box
              display="flex"
              justifyContent={"flex-end"}
              sx={{
                position: "sticky",
                bottom: -1,
                background: "white",
                pb: "12px",
                zIndex: 10,
              }}
              gap={2}
              pt={2}
            >
              {!questionData?.details?.isRequired &&
                questionData?.details?.type !==
                  Number(ECampaignSurveyType.Welcome) && (
                  <Box width="49%">
                    <Button
                      onClick={
                        type === ESurveyTypes.Customer ? handleSkip : undefined
                      }
                      variant="outlined"
                      sx={{
                        borderRadius: "40px",
                        width: "100%",
                        padding: "7px 20px",
                      }}
                    >
                      <Typography>{"Skip"}</Typography>
                    </Button>
                  </Box>
                )}
              <Box
                width={
                  !questionData?.details?.isRequired &&
                  questionData?.details?.type !==
                    Number(ECampaignSurveyType.Welcome)
                    ? "49%"
                    : "100%"
                }
              >
                <Button
                  disabled={
                    type === ESurveyTypes.Customer ? checkDisabled : true
                  }
                  onClick={
                    type === ESurveyTypes.Customer
                      ? methods.handleSubmit(handleNext)
                      : undefined
                  }
                  variant="contained"
                  sx={{
                    borderRadius: "40px",
                    width: "100%",
                    backgroundColor: getQuestionInfo?.buttonColor,
                  }}
                >
                  <Typography color={getQuestionInfo?.buttonTextColor}>
                    {questionData?.details?.buttonText}
                  </Typography>
                </Button>
              </Box>
            </Box>
          )}
        </FormProvider>
      </Box>
    </Box>
  );
};

export default memo(SurveyTemplate);
