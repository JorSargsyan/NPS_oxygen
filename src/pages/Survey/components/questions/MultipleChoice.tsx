import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useMemo } from "react";
import BasicCheck from "shared/ui/Checkbox";
import { EMultipleConfigType } from "store/enums/campaignDetails";

const MultipleChoiceQuestion = ({ questionData }) => {
  const multipleHint = useMemo(() => {
    if (!questionData.details.multipleConfig) {
      return "";
    }

    if (
      questionData.details.multipleConfig.multipleType ===
      EMultipleConfigType.EXACT
    ) {
      return `Please choose exactly ${questionData.details.multipleConfig.multipleExact} options`;
    } else if (
      questionData.details.multipleConfig.multipleType ===
      EMultipleConfigType.RANGE
    ) {
      return `Please choose from ${questionData.details.multipleConfig.multipleMin}
       to ${questionData.details.multipleConfig.multipleMax} options`;
    }
  }, [questionData.details.multipleConfig]);

  return (
    <Box>
      {questionData.details.multipleConfig?.multipleType !==
      EMultipleConfigType.UNLIMITED ? (
        <Typography
          fontSize={"12px"}
          fontStyle={"italic"}
          fontWeight={"500"}
          color="info.main"
        >
          {multipleHint}
        </Typography>
      ) : null}
      <Box>
        {questionData?.details.answers.map((answer, index) => (
          <Box key={answer.id}>
            <BasicCheck label={answer.value} name={`answerIDs[${index}]`} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MultipleChoiceQuestion;
