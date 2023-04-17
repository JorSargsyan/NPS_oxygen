import { Rating, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ECampaignSurveyType } from "pages/dashboard/CampaignDetails/questions/LeftSidebar/constants";
import { Controller, useFormContext } from "react-hook-form";
import { ISurveyTemplateQuestionData } from "shared/components/SurveyTemplate";

const CustomRatingQuestion = ({
  questionData,
  hasMode,
}: {
  questionData: ISurveyTemplateQuestionData;
  hasMode: boolean;
}) => {
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
        sx={{ gap: { xs: "2px", sm: 1 } }}
        flexWrap={"wrap"}
        justifyContent={"center"}
      >
        {details.type === Number(ECampaignSurveyType.CustomStar) ? (
          <Controller
            name={"answerIDs[0]"}
            defaultValue={""}
            render={({ field }) => {
              return (
                <Rating
                  size="large"
                  sx={{
                    "& svg": {
                      width: { xs: "1em", md: "40px" },
                      height: { xs: "1em", md: "40px" },
                    },
                  }}
                  max={details?.answers?.length}
                  {...field}
                  value={
                    details?.answers.map((i) => i.id).indexOf(field.value) + 1
                  }
                  onChange={(event: any) => {
                    const val = Number(event.currentTarget.value);

                    const answerID = details?.answers[val - 1].id;
                    field.onChange(answerID);
                  }}
                />
              );
            }}
          />
        ) : (
          details?.answers?.map((answer) => {
            return (
              <Box
                key={answer.id}
                onClick={() => handleSelect(answer.id)}
                sx={{
                  color: "primary.black",
                  cursor: "pointer",
                  backgroundColor: "primary.ratingBackground",
                  "&.active": {
                    backgroundColor: "primary.main",
                    color: "white",
                    border: "none",
                  },
                  width: hasMode ? "8%" : { xs: "8%", sm: "7.5%", lg: "8%" },
                  padding: hasMode ? "8px" : { xs: "8px", sm: "14px" },
                }}
                className={
                  answer.id === methods.watch("answerIDs[0]") && "active"
                }
                display="flex"
                justifyContent={"center"}
                alignItems={"center"}
                borderRadius={"8px"}
              >
                <Typography fontSize="16px">{answer.value}</Typography>
              </Box>
            );
          })
        )}
      </Box>
      <Box mt={1} display={"flex"} justifyContent={"space-between"}>
        <Typography
          sx={{
            fontSize: hasMode ? 12 : { xs: 12, sm: 14 },
            color: "primary.lightText",
          }}
        >
          {details?.metricConfig?.metricLeftText}
        </Typography>
        <Typography
          sx={{
            fontSize: hasMode ? 12 : { xs: 12, sm: 14 },
            color: "primary.lightText",
          }}
        >
          {details?.metricConfig?.metricRightText}
        </Typography>
      </Box>
    </Box>
  );
};

export default CustomRatingQuestion;
