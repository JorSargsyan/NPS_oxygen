import { Box, Typography } from "@mui/material";
import { ESurveyType, scoreColors } from "pages/dashboard/FeedBacks/constants";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectFeedbackDetails } from "store/slicers/feedback";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import NoData from "../../NoData";

const TabFeedbackComponent = () => {
  const feedbackDetails = useSelector(selectFeedbackDetails);

  const textColor = (score: number) => {
    const val = Number(score);
    if (val >= 0 && val <= 6) {
      return scoreColors.bad.color;
    } else if (val >= 7 && val <= 8) {
      return scoreColors.neutral.color;
    } else {
      return scoreColors.good.color;
    }
  };

  const bgColor = (score: number) => {
    const val = Number(score);
    if (val >= 0 && val <= 6) {
      return scoreColors.bad.bgColor;
    } else if (val >= 7 && val <= 8) {
      return scoreColors.neutral.bgColor;
    } else {
      return scoreColors.good.bgColor;
    }
  };
  return (
    <Box sx={{ overflow: "scroll", height: "500px", p: 3 }}>
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
                      {feedback.type === ESurveyType.Comment && (
                        <Typography
                          fontSize={14}
                          sx={{ color: "text.primary" }}
                        >
                          {answer.value}
                        </Typography>
                      )}
                      {feedback.type === ESurveyType.NPS && (
                        <Box
                          bgcolor={bgColor(Number(answer.value))}
                          color={textColor(Number(answer.value))}
                          textAlign="center"
                          padding="8px 4px"
                          width="100px"
                          borderRadius="8px"
                          fontSize="12px"
                        >
                          <Typography>
                            {"NPS"} <span>{answer.value}.00</span>
                          </Typography>
                        </Box>
                      )}
                      {feedback.type === ESurveyType.Friendliness && (
                        <Box
                          bgcolor={bgColor(Number(answer.value))}
                          color={textColor(Number(answer.value))}
                          textAlign="center"
                          padding="8px 4px"
                          width="100px"
                          borderRadius="8px"
                          fontSize="12px"
                        >
                          <Typography>
                            {"ES"} <span>{answer.value}.00</span>
                          </Typography>
                        </Box>
                      )}
                      {feedback.type === ESurveyType.Custom && (
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
