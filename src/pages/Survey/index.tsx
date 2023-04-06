import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ESurveyPreviewComps, ESurveyPreviewTypes } from "./constants";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import {
  CreateCustomer,
  GetQuestionConfiguration,
  GetQuestionDetails,
  SkipQuestion,
  SubmitAnswer,
  selectQuestion,
} from "store/slicers/surveyPreview";
import { ERequestStatus } from "store/enums/index.enum";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { EBaseUrl } from "store/config/constants";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { ECampaignSurveyType } from "pages/dashboard/CampaignDetails/questions/LeftSidebar/constants";
import { EMultipleConfigType } from "store/enums/campaignDetails";

const SurveyPreview = () => {
  const [status, setStatus] = useState("");
  const methods = useForm({
    defaultValues: {
      answerIDs: [],
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
  }, [dispatch, hash, navigate]);

  const getQuestionData = useCallback(
    async (formData) => {
      await dispatch(GetQuestionDetails(formData));
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

  const PreviewComp = () => {
    const Comp = ESurveyPreviewComps[details.type];
    return <Comp />;
  };
  const answerIDs = useWatch({
    control: methods.control,
    name: "answerIDs",
  });

  const checkDisabled = useMemo(() => {
    if (details?.type === Number(ECampaignSurveyType.SingleChoice)) {
      return !answerIDs.length;
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
  ]);

  const getQuestionConfig = useCallback(
    async (hash: string) => {
      const { meta } = await dispatch(GetQuestionConfiguration(hash));

      if (meta.requestStatus !== ERequestStatus.FULFILLED) {
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
        answerIDs: formData.answerIDs,
        hash,
        surveyID: details.id,
      };
    }
    if (details?.type === Number(ECampaignSurveyType.MultipleChoice)) {
      debugger;
      const answerIDs = details.answers
        .filter((i, index) => formData.answerIDs[index])
        .map((i) => i.id);

      return {
        answerIDs,
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

  const handleNext = async (formData) => {
    let requestData = {
      answerIDs: [],
    };

    debugger;

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

  useEffect(() => {
    if (type === ESurveyPreviewTypes.GENERAL) {
      generateCustomer();
    } else {
      getQuestionConfig(hash);
    }
  }, [generateCustomer, getQuestionConfig, hash, type]);

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
        <Box p={2} width="60vw" minHeight={"100vh"}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
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
                  <Box display="flex">
                    <Typography variant="h5">{details.title} </Typography>
                    {details.isRequired ? (
                      <Typography ml={2} fontSize={20} color="error">
                        *
                      </Typography>
                    ) : null}
                  </Box>
                  <Box minHeight="280px">
                    <PreviewComp />
                  </Box>
                  <Box display="flex" justifyContent={"flex-end"} gap={2}>
                    {!details?.isRequired &&
                      details.type !== Number(ECampaignSurveyType.Welcome) && (
                        <Button onClick={handleSkip} variant="contained">
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
                </FormProvider>
              </Box>
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
