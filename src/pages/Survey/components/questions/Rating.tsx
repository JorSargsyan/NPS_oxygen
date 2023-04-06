import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectQuestion } from "store/slicers/surveyPreview";

const CustomRatingQuestion = () => {
  const methods = useFormContext();
  const questionData = useSelector(selectQuestion);
  const { details } = questionData;

  const handleSelect = (id: number) => {
    methods.setValue("answerIDs[0]", id);
  };

  return (
    <Box>
      <Box
        pt={4}
        display={"flex"}
        gap={1}
        flexWrap={"wrap"}
        justifyContent={"center"}
      >
        {details.answers?.map((answer) => {
          return (
            <Box
              key={answer.id}
              onClick={() => handleSelect(answer.id)}
              sx={{
                border: "2px solid",
                borderColor: "primary.main",
                cursor: "pointer",
                "&.active": {
                  backgroundColor: "primary.main",
                  color: "white",
                },
              }}
              className={
                answer.id === methods.watch("answerIDs[0]") && "active"
              }
              width="8%"
              display="flex"
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={"10px"}
              p={2}
            >
              <Typography fontSize="20px" fontWeight="bold">
                {answer.value}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Box mt={1} display={"flex"} justifyContent={"space-between"}>
        <Typography fontWeight={"bold"} fontSize={"14px"} fontStyle="italic">
          {details?.metricConfig?.metricLeftText}
        </Typography>
        <Typography fontWeight={"bold"} fontSize={"14px"} fontStyle="italic">
          {details?.metricConfig?.metricRightText}
        </Typography>
      </Box>
    </Box>
  );
};

export default CustomRatingQuestion;
