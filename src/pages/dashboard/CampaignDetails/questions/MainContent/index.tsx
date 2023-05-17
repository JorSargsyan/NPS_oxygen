import { Card, CardContent, Paper, Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useCallback } from "react";
import { useSelector } from "react-redux";
import { EBaseUrl } from "store/config/constants";
import defaultImg from "assets/images/survey_bg.png";
import { selectSurveyInfo } from "store/slicers/campaignDetail";
import { CampaignSurveyForms } from "./constants";
import {
  CampaignSurveyColors,
  CampaignSurveyIcons,
  CampaignSurveyTypeList,
} from "../LeftSidebar/constants";
import { selectCampaignLoading } from "store/slicers/common";

const getOptionIcon = (type: number) => {
  const Comp = CampaignSurveyIcons[type];
  return (
    <Box display="flex" p={1} alignItems="center">
      <Comp height={20} width={20} color="white" />
    </Box>
  );
};

const skeletonArr = new Array(4).fill("");

const MainContent = () => {
  const loadingState = useSelector(selectCampaignLoading);
  const surveyInfo = useSelector(selectSurveyInfo);

  const SurveyFormComp = useCallback(() => {
    const Comp = CampaignSurveyForms[surveyInfo.details.type];
    return <Comp />;
  }, [surveyInfo.details?.type]);

  return (
    <Fragment>
      {!loadingState && surveyInfo?.details && surveyInfo?.template ? (
        <Box
          component={Paper}
          elevation={3}
          p={2}
          height="90vh"
          sx={{ overflowY: "scroll" }}
        >
          <Box mb={2} display={"flex"} alignItems={"center"}>
            <Box
              px={1}
              display="flex"
              justifyContent={"center"}
              alignItems={"center"}
              color="primary.secondary"
              sx={{
                backgroundColor: String(
                  CampaignSurveyColors[surveyInfo.details.type]
                ),
                borderRadius: "4px",
              }}
            >
              {getOptionIcon(surveyInfo.details.type)}
            </Box>
            <Typography fontSize={16} color="text.secondary" ml={1}>
              {CampaignSurveyTypeList[surveyInfo.details.type]}
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <Box
              mb={4}
              width="100%"
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
              {(surveyInfo?.template?.imageBase64 || defaultImg) && (
                <img
                  style={{ objectFit: "cover" }}
                  height="300px"
                  width="100%"
                  src={
                    surveyInfo?.template?.imageBase64
                      ? surveyInfo?.template?.imageBase64
                      : defaultImg
                  }
                  alt="survey"
                />
              )}
            </Box>
          </Box>
          <SurveyFormComp />
        </Box>
      ) : (
        <Card sx={{ height: "90vh" }}>
          <CardContent>
            <Skeleton variant="rounded" width={"100%"} height="40vh" />
            {skeletonArr.map((i, index) => (
              <Box my={1} key={index}>
                <Skeleton variant="rounded" width={"200px"} height="50px" />
              </Box>
            ))}
          </CardContent>
        </Card>
      )}
    </Fragment>
  );
};

export default MainContent;
