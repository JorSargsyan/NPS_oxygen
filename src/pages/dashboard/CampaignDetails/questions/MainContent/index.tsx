import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { EBaseUrl } from "store/config/constants";
import { selectSurveyInfo } from "store/slicers/campaignDetail";

const MainContent = () => {
  const surveyInfo = useSelector(selectSurveyInfo);
  const methods = useForm({});

  const handleNextClick = () => {};

  console.log(surveyInfo);
  return (
    <Fragment>
      {surveyInfo?.details && (
        <Box
          sx={{ backgroundColor: "primary.lightest", borderRadius: "10px" }}
          p={2}
        >
          <Box display={"flex"} justifyContent={"center"}>
            <Box
              height="60%"
              width="70%"
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
        </Box>
      )}
    </Fragment>
  );
};

export default MainContent;
