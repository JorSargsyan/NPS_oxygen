import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useCallback } from "react";
import { useSelector } from "react-redux";
import { EBaseUrl } from "store/config/constants";
import { selectSurveyInfo } from "store/slicers/campaignDetail";
import { CampaignSurveyForms } from "./constants";
import {
  CampaignSurveyIcons,
  CampaignSurveyTypeList,
} from "../LeftSidebar/constants";

const getOptionIcon = (type: number) => {
  const Comp = CampaignSurveyIcons[type];
  return (
    <Box display="flex" p={1} alignItems="center">
      <Comp height={20} width={20} color="white" />
    </Box>
  );
};

const MainContent = () => {
  const surveyInfo = useSelector(selectSurveyInfo);

  const SurveyFormComp = useCallback(() => {
    const Comp = CampaignSurveyForms[surveyInfo.details.type];
    return <Comp />;
  }, [surveyInfo.details?.type]);

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
          <Box mb={2} display={"flex"} alignItems={"center"}>
            <Box
              px={1}
              display="flex"
              justifyContent={"center"}
              alignItems={"center"}
              color="primary.secondary"
              sx={{
                backgroundColor: "primary.main",
                borderRadius: "4px",
              }}
            >
              {getOptionIcon(surveyInfo.details.type)}
            </Box>
            <Typography fontWeight="600" fontSize={16} ml={1}>
              {CampaignSurveyTypeList[surveyInfo.details.type]}
            </Typography>
          </Box>
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
              {surveyInfo?.template?.logoImage && (
                <img
                  src={`${EBaseUrl.MediaTemplateURL}/${surveyInfo?.template?.logoImage}`}
                  alt="sadas"
                />
              )}
            </Box>
          </Box>
          <SurveyFormComp />
        </Box>
      ) : null}
    </Fragment>
  );
};

export default MainContent;
