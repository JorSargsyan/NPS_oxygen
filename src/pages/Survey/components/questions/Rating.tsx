import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useFormContext } from "react-hook-form";

const CustomRatingQuestion = ({ questionData }) => {
  const methods = useFormContext();
  const { details } = questionData;

  const handleSelect = (id: number) => {
    methods.setValue("answerIDs", [id]);
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
        {details?.answers?.map((answer) => {
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
                width: { xs: "40px", sm: "8%" },
                padding: { xs: "9px", sm: 2 },
              }}
              className={
                answer.id === methods.watch("answerIDs[0]") && "active"
              }
              display="flex"
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={"10px"}
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
