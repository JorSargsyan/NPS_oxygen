import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useCallback } from "react";
import { useSelector } from "react-redux";
import { EBaseUrl } from "store/config/constants";
import {
  GetSurveys,
  UpdateSurvey,
  selectCampaignInfo,
  selectCampaignSurveys,
  selectSelectedSurvey,
  selectSurveyInfo,
} from "store/slicers/campaignDetail";
import { CampaignSurveyForms } from "./constants";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { ERequestStatus } from "store/enums/index.enum";
import { IUpdateSurveyRequest } from "store/interfaces/campaignDetails";

const MainContent = () => {
  const dispatch = useAsyncDispatch();
  const surveyList = useSelector(selectCampaignSurveys);
  const surveyInfo = useSelector(selectSurveyInfo);
  const campaignInfo = useSelector(selectCampaignInfo);
  const selectedSurvey = useSelector(selectSelectedSurvey);

  const SurveyFormComp = useCallback(
    ({ onSubmit }: { onSubmit: (data: any) => void }) => {
      const Comp = CampaignSurveyForms[surveyInfo.details.type];
      return <Comp onSubmit={onSubmit} />;
    },
    [surveyInfo.details?.type]
  );

  const onSubmit = async (formData) => {
    const position = surveyList.find((i) => i.id === selectedSurvey).position;
    let answers = [];
    let metricConfig = {
      metricLeftText: "",
      metricRightText: "",
      customEndLength: 10,
      customStartLength: 0,
    };
    if (formData.answers?.length) {
      answers = formData?.answers?.map((answer) => {
        return {
          ...answer,
          newAnswer: !answer.id || false,
        };
      });
    }

    if (formData.metricConfig) {
      metricConfig = { ...metricConfig, ...formData.metricConfig };
    }

    const data: IUpdateSurveyRequest = {
      campaignID: campaignInfo.id,
      title: formData.title,
      position,
      isRequired: true,
      buttonText: "Next testing",
      type: surveyInfo.details.type,
      answers,
      metricConfig,
    };

    const { meta } = await dispatch(
      UpdateSurvey({
        data: data,
        id: surveyInfo.details.id,
      })
    );

    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }

    dispatch(GetSurveys(campaignInfo.id));
  };

  return (
    <Fragment>
      {surveyInfo.details ? (
        <Box
          component={Paper}
          elevation={3}
          p={2}
          height="90vh"
          overflow={"scroll"}
        >
          <Box display={"flex"} justifyContent={"center"}>
            <Box
              mb={4}
              height="60%"
              width="50%"
              borderRadius="10px"
              sx={{
                "& img": {
                  maxWidth: "100%",
                  borderRadius: "10px",
                  maxHeight: "100%",
                  objectFit: "contain",
                },
              }}
            >
              <img
                src={`${EBaseUrl.MediaTemplateURL}/${surveyInfo?.template?.logoImage}`}
                alt="sadas"
              />
            </Box>
          </Box>
          <SurveyFormComp onSubmit={onSubmit} />
        </Box>
      ) : null}
    </Fragment>
  );
};

export default MainContent;
