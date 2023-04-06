import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ESurveyPreviewComps, ESurveyPreviewTypes } from "./constants";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import {
  CreateCustomer,
  GetQuestionConfiguration,
  GetQuestionDetails,
  SetQuestionFinished,
  SkipQuestion,
  SubmitAnswer,
  selectQuestion,
} from "store/slicers/surveyPreview";
import { ERequestStatus } from "store/enums/index.enum";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Button, Card, CardContent, Slide, Typography } from "@mui/material";
import { EBaseUrl } from "store/config/constants";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { ECampaignSurveyType } from "pages/dashboard/CampaignDetails/questions/LeftSidebar/constants";
import { EMultipleConfigType } from "store/enums/campaignDetails";

const SurveyPreview = () => {
  const [status, setStatus] = useState("");
  const [isLoading, setLoading] = useState(true);
  const location = useLocation();

  const methods = useForm({
    defaultValues: {
      answerIDs: [],
      comment: "",
      singleChoice: "",
    },
  });
  const questionData = useSelector(selectQuestion);
  const { details, config } = questionData;
  const navigate = useNavigate();
  const dispatch = useAsyncDispatch();
  const { hash, type } = useParams();

  const generateCustomer = useCallback(async () => {
    const { meta, payload } = await dispatch(
      CreateCustomer({
        hash,
      })
    );

    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }

    navigate(`/${ESurveyPreviewTypes.PERSONAL}/${payload.hash}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, hash]);

  const getQuestionData = useCallback(
    async (formData) => {
      await dispatch(GetQuestionDetails(formData));
      setLoading(false);
    },
    [dispatch]
  );

  const surveyStatus = useMemo(() => {
    if (config?.isExpired) {
      setStatus("Survey is expired");
      return false;
    } else if (config?.isFinished) {
      setStatus("Survey is finished");
      return false;
    } else if (!details) {
      setStatus("Survey isn't available");
      return false;
    }

    return true;
  }, [config?.isExpired, config?.isFinished, details]);

  const PreviewComp = useCallback(() => {
    const Comp = ESurveyPreviewComps[details.type];
    return <Comp />;
  }, [details?.type]);

  const answerIDs = useWatch({
    control: methods.control,
    name: "answerIDs",
  });

  const singleChoiceVal = useWatch({
    control: methods.control,
    name: "singleChoice",
  });

  const checkDisabled = useMemo(() => {
    if (
      details?.type === Number(ECampaignSurveyType.Rating) ||
      details?.type === Number(ECampaignSurveyType.Nps) ||
      details?.type === Number(ECampaignSurveyType.ServiceQualityScore)
    ) {
      return !answerIDs.length;
    }
    if (details?.type === Number(ECampaignSurveyType.SingleChoice)) {
      return !singleChoiceVal;
    }
    if (details?.type === Number(ECampaignSurveyType.MultipleChoice)) {
      const checkedAnswersCount = answerIDs.filter((i) => i).length;
      if (details?.multipleConfig.multipleType === EMultipleConfigType.EXACT) {
        return checkedAnswersCount !== details?.multipleConfig.multipleExact;
      } else if (
        details?.multipleConfig.multipleType === EMultipleConfigType.RANGE
      ) {
        return !(
          checkedAnswersCount >= details?.multipleConfig.multipleMin &&
          checkedAnswersCount <= details?.multipleConfig.multipleMax
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
      console.log("fetching data!");
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
    if (!(type || hash)) {
      return;
    }
    if (type === ESurveyPreviewTypes.GENERAL) {
      generateCustomer();
    } else {
      getQuestionConfig(hash);
    }
  }, [getQuestionConfig, generateCustomer, hash, type]);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (details?.isLast && !config.isFinished) {
      finishSurvey();
    }
  }, [config?.isFinished, details?.isLast, finishSurvey]);

  return (
    <Box
      display="flex"
      justifyContent={"center"}
      sx={{
        backgroundImage: `url(${require("assets/images/bg.jpg")})`,
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      {surveyStatus ? (
        <Box
          p={2}
          sx={{ display: { xs: "flex" }, alignItems: { xs: "center" } }}
        >
          <Card
            sx={{
              height: { xs: "95vh", sm: "80vh" },
              backgroundColor: "rgb(255 255 255 / 97%)",
            }}
          >
            <CardContent>
              <Slide in={!isLoading} direction={isLoading ? "down" : "up"}>
                <Box sx={{ width: { xs: "85vw", sm: "80vw", md: "60vw" } }}>
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
                        src={`${EBaseUrl.MediaTemplateURL}/${details?.template?.logoImage}`}
                        alt={details?.title}
                      />
                    </Box>
                    <Box mt={2}>
                      <FormProvider {...methods}>
                        <Box display="flex" justifyContent={"center"}>
                          <Typography variant="h5">{details.title} </Typography>
                          {details.isRequired ? (
                            <Typography ml={2} fontSize={20} color="error">
                              *
                            </Typography>
                          ) : null}
                        </Box>
                        <Box minHeight="280px">
                          {ESurveyPreviewComps?.[details.type] && (
                            <PreviewComp />
                          )}
                        </Box>
                        {details?.type !==
                          Number(ECampaignSurveyType.Final) && (
                          <Box
                            display="flex"
                            justifyContent={"flex-end"}
                            gap={2}
                            pt={2}
                          >
                            {!details?.isRequired &&
                              details.type !==
                                Number(ECampaignSurveyType.Welcome) && (
                                <Button
                                  onClick={handleSkip}
                                  variant="contained"
                                >
                                  <Typography>{"Skip"}</Typography>
                                </Button>
                              )}
                            <Button
                              disabled={checkDisabled}
                              onClick={methods.handleSubmit(handleNext)}
                              variant="contained"
                            >
                              <Typography>{details?.buttonText}</Typography>
                            </Button>
                          </Box>
                        )}
                      </FormProvider>
                    </Box>
                  </Box>
                </Box>
              </Slide>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Box>{status}</Box>
      )}
    </Box>
  );
};

export default SurveyPreview;
