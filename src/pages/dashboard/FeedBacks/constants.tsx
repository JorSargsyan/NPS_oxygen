import { Box } from "@mui/system";
import { EScoreTypes } from "store/enums/feedbacks.enum";
import { IFeedback, IScore } from "store/interfaces/feedback";

export const feedbackColumns = [
  { label: "ID", field: "id" },
  { label: "Campaign", field: "campaignName" },
  { label: "Customer", field: "customerName" },
  {
    label: "Score",
    layout: (row: IFeedback) => {
      return (
        <Box sx={{ display: "flex", gap: "12px" }}>
          {row.score.map((score: IScore, index) => {
            return (
              <Box
                bgcolor="#AFF9DA"
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
