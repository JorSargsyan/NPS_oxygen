import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useCallback } from "react";
import { useSelector } from "react-redux";
import { EBaseUrl } from "store/config/constants";
import { selectSurveyInfo } from "store/slicers/campaignDetail";
import { CampaignSurveyForms } from "./constants";

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
          <SurveyFormComp />
        </Box>
      ) : null}
    </Fragment>
  );
};

export default MainContent;
