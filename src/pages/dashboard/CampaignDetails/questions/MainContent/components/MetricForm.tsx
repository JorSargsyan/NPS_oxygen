import { Grid, SvgIcon, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { requiredRules } from "shared/helpers/validators";
import TextInput from "shared/ui/TextInput";
import { selectSurveyInfo } from "store/slicers/campaignDetail";
import { ECampaignSurveyType } from "../../LeftSidebar/constants";
import StarIcon from "@heroicons/react/24/solid/StarIcon";

const MetricForm = () => {
  const surveyInfo = useSelector(selectSurveyInfo);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent={"center"} gap={2}>
            {surveyInfo.details.answers.map((answer) => (
              <Box key={answer.id}>
                {surveyInfo.details.type ===
                Number(ECampaignSurveyType.CustomStar) ? (
                  <Box p={1}>
                    <SvgIcon color="primary">
                      <StarIcon height={24} />
                    </SvgIcon>
                  </Box>
                ) : (
                  <Box
                    p={1}
                    borderRadius={"10px"}
                    minWidth={"40px"}
                    sx={{ backgroundColor: "primary.main" }}
                  >
                    <Typography
                      fontSize={16}
                      fontWeight={"bold"}
                      color="white"
                      textAlign={"center"}
                    >
                      {answer.value}
                    </Typography>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TextInput
            name="title"
            placeholder={"Type your welcome text here"}
            rules={requiredRules}
            label="Title"
          />
        </Grid>
        <Grid item xs={6}>
          <TextInput
            name="metricConfig.metricLeftText"
            placeholder={"Type left text here"}
            label="Not Likely"
          />
        </Grid>
        <Grid item xs={6}>
          <TextInput
            name="metricConfig.metricRightText"
            placeholder={"Type right text here"}
            label="Likely"
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default MetricForm;
