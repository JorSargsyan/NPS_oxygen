import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { EBaseUrl } from "store/config/constants";
import { selectSurveyInfo } from "store/slicers/campaignDetail";
import { CampaignSurveyForms } from "./constants";

const MainContent = () => {
  const surveyInfo = useSelector(selectSurveyInfo);

  const SurveyFormComp = () => {
    const Comp = CampaignSurveyForms[surveyInfo.details.type];
    return <Comp />;
  };

  return (
    <Fragment>
      {surveyInfo?.details && (
        <Box
          mb={10}
          component={Paper}
          elevation={3}
          p={2}
          height="450px"
          overflow={"scroll"}
        >
          <Box display={"flex"} justifyContent={"center"}>
            <Box
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
          <Box display="flex" mt={2} flexDirection={"row-reverse"}>
            <Button variant="outlined">{surveyInfo.details.buttonText}</Button>
          </Box>
        </Box>
      )}
    </Fragment>
  );
};

export default MainContent;
