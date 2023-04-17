import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ECampaignSurveyType } from "pages/dashboard/CampaignDetails/questions/LeftSidebar/constants";
import { ESurveyPreviewComps } from "pages/Survey/constants";
import { memo, useCallback, useMemo } from "react";
import { FormProvider } from "react-hook-form";
import { EBaseUrl } from "store/config/constants";
import defaultImg from "assets/images/survey_bg.png";
import { ITemplate } from "store/interfaces/campaignDetails";
import {
  IQuestionConfig,
  IQuestionDetails,
} from "store/interfaces/surveyPreview";
import { EQuestionPreviewType } from "pages/dashboard/CampaignDetails/components/QuestionPreview";
import Logo from "assets/icons/satisfai_logo.svg";
import IDLogo from "assets/icons/ID_bank.svg";

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

  const getImage = useMemo(() => {
    if (type !== ESurveyTypes.Preview) {
      return questionData?.details?.template?.logoImage
        ? `${EBaseUrl.MediaTemplateURL}/${questionData?.details?.template?.logoImage}`
        : defaultImg;
    } else {
      return questionData?.template?.logoImage
        ? `${EBaseUrl.MediaTemplateURL}/${questionData?.template?.logoImage}`
        : defaultImg;
    }
  }, [
    questionData?.details?.template?.logoImage,
    questionData?.template?.logoImage,
    type,
  ]);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img src={IDLogo} alt="logo" />
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
        <img src={getImage} alt={questionData?.details?.title} />
      </Box>
      <Box mt={2}>
        <FormProvider {...methods}>
          <Box display="flex" justifyContent={"center"}>
            <Typography
              variant="h5"
              sx={{ fontSize: { xs: 16 }, fontWeight: "400" }}
            >
              {questionData?.details?.title}
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
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            pt={2}
          >
            <Typography mr={1}>Powered by</Typography>
            <img src={Logo} alt="logo" />
          </Box>
          {questionData?.details?.type !==
            Number(ECampaignSurveyType.Final) && (
            <Box display="flex" justifyContent={"flex-end"} gap={2} pt={2}>
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
                  sx={{ borderRadius: "40px", width: "100%" }}
                >
                  <Typography>{questionData?.details?.buttonText}</Typography>
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
