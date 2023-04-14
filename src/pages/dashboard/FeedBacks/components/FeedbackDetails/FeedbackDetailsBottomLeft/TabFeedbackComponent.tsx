import { Box, Typography } from "@mui/material";
import { ESurveyType, scoreColors } from "pages/dashboard/FeedBacks/constants";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectFeedbackDetails } from "store/slicers/feedback";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import NoData from "../../NoData";
import {
  CES_COLORS,
  CSAT_COLORS,
  NPS_COLORS,
} from "pages/dashboard/Home/constants";
import { IFeedbacksItemDetails, IScore } from "store/interfaces/feedback";

const TabFeedbackComponent = () => {
  const feedbackDetails = useSelector(selectFeedbackDetails);

  const bgColor = (feedback: IFeedbacksItemDetails) => {
    const val = Number(feedback?.answers?.[0]?.value);
    if (
      feedback?.type === ESurveyType.NPS ||
      feedback?.type === ESurveyType.Friendliness
    ) {
      return NPS_COLORS[val];
    } else if (feedback?.type === ESurveyType.CustomerEffortScore) {
      return CES_COLORS[val - 1];
    } else if (feedback?.type === ESurveyType.CustomerSatisfactionScore) {
      return CSAT_COLORS[val - 1];
    }
  };

  const getScoreTitles = (type: number) => {
    switch (type) {
      case ESurveyType.NPS:
        return "NPS";
      case ESurveyType.Friendliness:
        return "eNPS";
      case ESurveyType.CustomStar:
        return "Star Rating";
      case ESurveyType.CustomerEffortScore:
        return "CAS";
      case ESurveyType.CustomerSatisfactionScore:
        return "CSAT";
    }
  };

  return (
    <Box sx={{ overflow: "scroll", p: "18px 12px" }}>
      {!feedbackDetails?.feedbacks?.length ? (
        <NoData description="There is no feedback" />
      ) : (
        feedbackDetails?.feedbacks?.map((feedback) => {
          return (
            <Box
              key={feedback.id}
              sx={{
                border: "2px solid",
                borderRadius: 1,
                padding: "12px",
                borderColor: "primary.main",
                marginBottom: 2,
              }}
            >
              <Typography sx={{ color: "text.secondary" }} fontSize={12} pb={2}>
                {feedback.title}
              </Typography>
              {feedback.isSkipped ? (
                <Box display="flex">
                  <Typography sx={{ color: "info.main" }}>
                    The answer is skipped
                  </Typography>
                </Box>
              ) : (
                feedback?.answers?.map((answer) => {
                  return (
                    <Fragment key={answer.id}>
                      {feedback.type === ESurveyType.SingleSelect && (
                        <Box display="flex" alignItems="center">
                          <RadioButtonCheckedIcon color="primary" />
                          <Typography
                            fontSize={14}
                            ml={1}
                            sx={{ color: "text.primary" }}
                          >
                            {answer.value}
                          </Typography>
                        </Box>
                      )}
                      {feedback.type === ESurveyType.MultipleSelect && (
                        <Box display="flex" alignItems="center">
                          <CheckBoxIcon color="primary" />
                          <Typography
                            fontSize={14}
                            ml={1}
                            sx={{ color: "text.primary" }}
                          >
                            {answer.value}
                          </Typography>
                        </Box>
                      )}
                      {(feedback.type === ESurveyType.Comment ||
                        feedback.type === ESurveyType.ContactInformation) && (
                        <Typography
                          fontSize={14}
                          sx={{ color: "text.primary" }}
                        >
                          {answer.value}
                        </Typography>
                      )}
                      {(feedback.type === ESurveyType.NPS ||
                        feedback.type === ESurveyType.Friendliness ||
                        feedback.type === ESurveyType.CustomerEffortScore ||
                        feedback.type ===
                          ESurveyType.CustomerSatisfactionScore) && (
                        <Box>
                          <Typography
                            fontSize={14}
                            bgcolor={bgColor(feedback)}
                            color={"white"}
                            padding="12px 18px"
                            borderRadius="8px"
                            display="inline"
                          >
                            {getScoreTitles(feedback.type)}{" "}
                            <span>{answer.value}.00</span>
                          </Typography>
                        </Box>
                      )}
                      {(feedback.type === ESurveyType.Custom ||
                        feedback.type === ESurveyType.CustomStar) && (
                        <Typography>
                          {"Score"} <span>{answer.value}.00</span>
                        </Typography>
                      )}
                    </Fragment>
                  );
                })
              )}
            </Box>
          );
        })
      )}
    </Box>
  );
};

export default TabFeedbackComponent;
