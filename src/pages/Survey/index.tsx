import {
  Card,
  CardContent,
  CircularProgress,
  Slide,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { ECampaignSurveyType } from "pages/dashboard/CampaignDetails/questions/LeftSidebar/constants";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useForm, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SurveyTemplate, { ESurveyTypes } from "shared/components/SurveyTemplate";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { EMultipleConfigType } from "store/enums/campaignDetails";
import { ERequestStatus } from "store/enums/index.enum";
import {
  CreateCustomer,
  GetQuestionConfiguration,
  GetQuestionDetails,
  selectQuestion,
  SetQuestionFinished,
  SkipQuestion,
  SubmitAnswer,
} from "store/slicers/surveyPreview";
import { ESurveyPreviewTypes } from "./constants";
import { metricConfigable } from "pages/dashboard/CampaignDetails";
import { createSurveyTheme } from "theme/idBankTemplate";
import { ThemeProvider } from "@mui/material/styles";
import Not_available from "assets/icons/not_available.svg";
import Completed from "assets/icons/completed.svg";

const SurveyPreview = () => {
  const [status, setStatus] = useState("");
  const [isLoading, setLoading] = useState(true);
  const location = useLocation();

  const methods = useForm({
    defaultValues: {
      answerIDs: [],
      comment: "",
      singleChoice: "",
      contact: "",
      rate: 0,
      contactConfig: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
      },
    },
  });

  const questionData = useSelector(selectQuestion);
  const { details, config } = questionData;
  const navigate = useNavigate();
  const dispatch = useAsyncDispatch();
  const { hash, type } = useParams();

  const templateColorSet = useMemo(() => {
    return {
      mainColor: questionData?.details?.template?.answerColor,
      buttonColor: questionData?.details?.template?.buttonColor,
    };
  }, [
    questionData?.details?.template?.answerColor,
    questionData?.details?.template?.buttonColor,
  ]);

  const generateCustomer = useCallback(async () => {
    const { meta, payload } = await dispatch(
      CreateCustomer({
        hash,
      })
    );

    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      setStatus("Sorry, the survey is not available");
      return;
    }

    navigate(
      `/${ESurveyPreviewTypes.PERSONAL}/${payload.hash}${location.search}`,
      {
        replace: true,
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, hash]);

  const getQuestionData = useCallback(
    async (formData) => {
      await dispatch(GetQuestionDetails(formData));
      setTimeout(() => {
        setLoading(false);
      }, 300);
    },
    [dispatch]
  );

  const surveyStatus = useMemo(() => {
    if (config?.isExpired) {
      setStatus("Your survey is expired");
      return false;
    } else if (config?.isFinished) {
      setStatus("You have already completed");
      return false;
    } else if (!details && !isLoading) {
      setStatus("Sorry, the survey is not available");
      return false;
    }

    if (details) {
      return true;
    }
  }, [config?.isExpired, config?.isFinished, details, isLoading]);

  const theme = useMemo(() => {
    if (templateColorSet && surveyStatus) {
      return createSurveyTheme(templateColorSet);
    }
  }, [surveyStatus, templateColorSet]);

  const answerIDs = useWatch({
    control: methods.control,
    name: "answerIDs",
  });

  const singleChoiceVal = useWatch({
    control: methods.control,
    name: "singleChoice",
  });

  const checkDisabled = useMemo(() => {
    if (metricConfigable.includes(Number(details?.type))) {
      return !answerIDs.length;
    }
    if (details?.type === Number(ECampaignSurveyType.SingleChoice)) {
      return !singleChoiceVal;
    }
    if (details?.type === Number(ECampaignSurveyType.MultipleChoice)) {
      const checkedAnswersCount = answerIDs.filter((i) => i).length;
      if (details?.multipleConfig.multipleType === EMultipleConfigType.EXACT) {
        return (
          checkedAnswersCount !== Number(details?.multipleConfig.multipleExact)
        );
      } else if (
        details?.multipleConfig.multipleType === EMultipleConfigType.RANGE
      ) {
        return !(
          checkedAnswersCount >= Number(details?.multipleConfig.multipleMin) &&
          checkedAnswersCount <= Number(details?.multipleConfig.multipleMax)
        );
      }
      return !checkedAnswersCount;
    }
  }, [
    details?.type,
    details?.multipleConfig?.multipleType,
    details?.multipleConfig?.multipleExact,
    details?.multipleConfig?.multipleMin,
    details?.multipleConfig?.multipleMax,
    answerIDs,
    singleChoiceVal,
  ]);

  const getQuestionConfig = useCallback(
    async (hash: string) => {
      const { meta, payload } = await dispatch(GetQuestionConfiguration(hash));

      if (
        meta.requestStatus !== ERequestStatus.FULFILLED ||
        payload.isFinished
      ) {
        return;
      }

      getQuestionData({
        hash,
      });
    },
    [dispatch, getQuestionData]
  );

  const getAnswerRequestData = (formData) => {
    if (details?.type === Number(ECampaignSurveyType.SingleChoice)) {
      return {
        answerIDs: [formData.singleChoice],
        hash,
        surveyID: details.id,
      };
    }
    if (details?.type === Number(ECampaignSurveyType.MultipleChoice)) {
      const answerIDs = details.answers
        .filter((i, index) => formData.answerIDs[index])
        .map((i) => i.id);

      return {
        answerIDs,
        hash,
        surveyID: details.id,
      };
    } else if (details?.type === Number(ECampaignSurveyType.Comment)) {
      return {
        comment: formData.comment,
        answerIDs: details?.answers?.map((i) => i.id),
        hash,
        surveyID: details.id,
      };
    } else if (
      details?.type === Number(ECampaignSurveyType.ContactInformation)
    ) {
      const { firstName, lastName, phone, email } = formData.contactConfig;
      return {
        comment: `${firstName} ${lastName} ${phone} ${email}`,
        answerIDs: details?.answers?.map((i) => i.id),
        hash,
        surveyID: details.id,
      };
    } else {
      return {
        answerIDs: formData.answerIDs,
        hash,
        surveyID: details.id,
      };
    }
  };

  const handleSkip = async () => {
    const { meta } = await dispatch(
      SkipQuestion({
        answerIDs: [],
        hash,
        surveyID: String(details.id),
      })
    );

    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }

    getQuestionData({
      answerIDs: [],
      hash,
      surveyID: details.id,
    });

    methods.reset({
      answerIDs: [],
    });
  };

  const finishSurvey = useCallback(async () => {
    const { meta } = await dispatch(SetQuestionFinished({ hash }));

    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }
  }, [dispatch, hash]);

  const handleNext = async (formData) => {
    setLoading(true);
    let requestData: any = {
      answerIDs: [],
    };

    if (details.type !== Number(ECampaignSurveyType.Welcome)) {
      requestData = getAnswerRequestData(formData);
      const { meta } = await dispatch(SubmitAnswer(requestData));

      if (meta.requestStatus !== ERequestStatus.FULFILLED) {
        return;
      }
    }

    getQuestionData({
      answerIDs: requestData?.answerIDs,
      hash,
      surveyID: details.id,
    });

    methods.reset({
      answerIDs: [],
    });
  };

  const init = useCallback(() => {
    if (!type || !hash) {
      return;
    }
    if (type === ESurveyPreviewTypes.GENERAL) {
      generateCustomer();
    } else {
      getQuestionConfig(hash);
    }
  }, [getQuestionConfig, generateCustomer, hash, type]);

  useLayoutEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (
      details?.isLast &&
      !config.isFinished &&
      type !== ESurveyPreviewTypes.GENERAL
    ) {
      finishSurvey();
    }
  }, [config?.isFinished, details?.isLast, finishSurvey, type]);

  useEffect(() => {
    setTimeout(() => {
      window.history.forward();
    }, 0);
    window.onunload = function () {
      return null;
    };
  }, [location.pathname]);

  useEffect(() => {
    if (questionData.details?.publicURL) {
      localStorage.setItem("publicURL", questionData.details.publicURL);
    }
  }, [questionData.details?.publicURL]);

  return (
    <Box
      display="flex"
      fontFamily="Roboto"
      justifyContent={"center"}
      sx={{
        backgroundImage: `url(${require("assets/images/bg.png")})`,
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      {surveyStatus ? (
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              display: { xs: "flex" },
              alignItems: { xs: "center" },
              margin: { xs: "16px 0", sm: 2 },
            }}
          >
            <Card
              sx={{
                height: { xs: "95vh" },
                backgroundColor: "rgb(255 255 255 / 97%)",
                overflowY: "scroll",
              }}
            >
              <CardContent sx={{ padding: { xs: "10px", lg: "16px" } }}>
                <Slide in={!isLoading} direction={isLoading ? "down" : "up"}>
                  <Box
                    sx={{
                      width: {
                        xs: "90vw",
                        sm: "80vw",
                        md: "60vw",
                        lg: "50vw",
                      },
                    }}
                  >
                    <SurveyTemplate
                      checkDisabled={checkDisabled}
                      methods={methods}
                      type={ESurveyTypes.Customer}
                      handleSkip={handleSkip}
                      handleNext={handleNext}
                      questionData={questionData}
                    />
                  </Box>
                </Slide>
              </CardContent>
            </Card>
          </Box>
        </ThemeProvider>
      ) : (
        <Box alignItems={"center"} display={"flex"}>
          <Card
            sx={{
              height: { xs: "95vh", sm: "80vh" },
              backgroundColor: "rgb(255 255 255 / 97%)",
            }}
          >
            <CardContent sx={{ height: "100%", padding: { xs: 1 } }}>
              <Box
                sx={{
                  width: {
                    xs: "85vw",
                    sm: "80vw",
                    md: "60vw",
                  },
                  height: "100%",
                }}
                display="flex"
                justifyContent={"center"}
                alignItems={"center"}
              >
                {status ? (
                  <Box textAlign="center">
                    <img
                      src={config?.isFinished ? Completed : Not_available}
                      alt="status"
                    />
                    <Typography fontSize={20} pt={5}>
                      {status}
                    </Typography>
                  </Box>
                ) : (
                  <CircularProgress />
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default SurveyPreview;
