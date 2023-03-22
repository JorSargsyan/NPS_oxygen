import { Box } from "@mui/system";
import { EScoreTypes } from "store/enums/feedbacks.enum";
import { IFeedback, IScore } from "store/interfaces/feedback";

const scoreColors = {
  good: {
    bgColor: "#AFF9DA",
    color: "#146D48",
  },
  neutral: {
    bgColor: "#FBFCBF",
    color: "#99733B",
  },
  bad: {
    bgColor: "#F9AFAF",
    color: "#6D1414",
  },
};

export const feedbackColumns = [
  { label: "ID", field: "id" },
  { label: "Campaign", field: "campaignName" },
  { label: "Customer", field: "customerName" },
  {
    label: "Score",
    layout: (row: IFeedback) => {
      const textColor = (score: IScore) => {
        const val = Number(score.value);
        if (val >= 0 && val <= 6) {
          return scoreColors.bad.color;
        } else if (val >= 7 && val <= 8) {
          return scoreColors.neutral.color;
        } else {
          return scoreColors.good.color;
        }
      };

      const bgColor = (score: IScore) => {
        const val = Number(score.value);
        if (val >= 0 && val <= 6) {
          return scoreColors.bad.bgColor;
        } else if (val >= 7 && val <= 8) {
          return scoreColors.neutral.bgColor;
        } else {
          return scoreColors.good.bgColor;
        }
      };

      return (
        <Box sx={{ display: "flex", gap: "12px" }}>
          {row.score.map((score: IScore, index) => {
            return (
              <Box
                bgcolor={bgColor(score)}
                color={textColor(score)}
                key={index}
                textAlign="center"
                padding="4px"
                width="45px"
                borderRadius="8px"
                fontSize="12px"
              >
                <Box>{EScoreTypes[score.type]}</Box>
                <Box>{score.value}</Box>
              </Box>
            );
          })}
        </Box>
      );
    },
  },
  { label: "Submission Date", field: "creationDate" },
];

export const viewCommentsDialogConfig = {
  title: "Quick view comments",
};
