import { Box, Typography } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { campaignTypes } from "resources/constants";
import { selectFeedbackDetails } from "store/slicers/feedback";
import NoData from "../../NoData";

const TabSurveyComponent = () => {
  const feedbackItemDetails = useSelector(selectFeedbackDetails);
  const { survey } = feedbackItemDetails;

  const getMetricLabel = useMemo(() => {
    return campaignTypes.surveyMetric.find((i) => i.id === survey.surveyMetric)
      .label;
  }, [survey.surveyMetric]);

  const getTouchpointLabel = useMemo(() => {
    return campaignTypes.touchpoint.find((i) => i.id === survey.touchpoint)
      .label;
  }, [survey.touchpoint]);

  const getChannelLabel = useMemo(() => {
    return campaignTypes.channel.find((i) => i.id === survey.channel).label;
  }, [survey.channel]);

  const getCampaignTypeLabel = useMemo(() => {
    return campaignTypes.type.find((i) => i.id === survey.type).label;
  }, [survey.type]);

  return (
    <Box
      display="grid"
      sx={{
        gridTemplateRows: "auto 1fr auto",
        gridTemplateColumns: "2fr 2fr",
      }}
      p={3}
    >
      {!survey && <NoData description="There is no data" />}
      {survey?.surveyMetric ? (
        <Box>
          <Typography fontSize={14} fontWeight="bold" mb={1}>
            Campaign metric
          </Typography>
          <Typography mb={2}>{getMetricLabel}</Typography>
        </Box>
      ) : null}
      {survey?.touchpoint ? (
        <Box>
          <Typography fontSize={14} fontWeight="bold" mb={1}>
            Campaign touchpoint
          </Typography>
          <Typography mb={2}>{getTouchpointLabel}</Typography>
        </Box>
      ) : null}
      {survey?.channel ? (
        <Box>
          <Typography fontSize={14} fontWeight="bold" mb={1}>
            Campaign channel
          </Typography>
          <Typography mb={2}>{getChannelLabel}</Typography>
        </Box>
      ) : null}
      {survey?.type ? (
        <Box>
          <Typography fontSize={14} fontWeight="bold" mb={1}>
            Campaign type
          </Typography>
          <Typography mb={2}>{getCampaignTypeLabel}</Typography>
        </Box>
      ) : null}
      {survey?.sentDate ? (
        <Box>
          <Typography fontSize={14} fontWeight="bold" mb={1}>
            Sent
          </Typography>
          <Typography mb={2}>{survey?.sentDate}</Typography>
        </Box>
      ) : null}
      {survey?.openedDate ? (
        <Box>
          <Typography fontSize={14} fontWeight="bold" mb={1}>
            Opened
          </Typography>
          <Typography mb={2}>{survey?.openedDate}</Typography>
        </Box>
      ) : null}
      {survey?.startedDate ? (
        <Box>
          <Typography fontSize={14} fontWeight="bold" mb={1}>
            Started
          </Typography>
          <Typography mb={2}>{survey?.startedDate}</Typography>
        </Box>
      ) : null}
      {survey?.finishedDate ? (
        <Box>
          <Typography fontSize={14} fontWeight="bold" mb={1}>
            Finished
          </Typography>
          <Typography mb={2}>{survey?.finishedDate}</Typography>
        </Box>
      ) : null}
    </Box>
  );
};

export default TabSurveyComponent;
