import { Box } from "@mui/system";
import { ECampaignSurveyType } from "pages/dashboard/CampaignDetails/questions/LeftSidebar/constants";
import { useMemo } from "react";
import { requiredRules } from "shared/helpers/validators";
import BasicTextArea from "shared/ui/TextArea";
import { ECommentConfigType } from "store/enums/campaignDetails";

const CommentQuestion = ({ questionData }: any) => {
  const { details } = questionData;

  const commentRules = useMemo(() => {
    if (details?.commentConfig?.commentType === ECommentConfigType.RANGE) {
      return {
        maxLength: {
          value: details.commentConfig.commentMax,
          message: `Max length is ${details.commentConfig.commentMax}`,
        },
        minLength: {
          value: details.commentConfig.commentMin,
          message: `Max length is ${details.commentConfig.commentMin}`,
        },
      };
    }
  }, [
    details?.commentConfig?.commentMax,
    details?.commentConfig?.commentMin,
    details?.commentConfig?.commentType,
  ]);

  const commentRequiredRules = useMemo(() => {
    if (details?.type === Number(ECampaignSurveyType.Comment)) {
      return {
        required: {
          value: details?.isRequired,
          message: "Required",
        },
      };
    }
  }, [
    details?.commentConfig?.commentMax,
    details?.commentConfig?.commentMin,
    details?.commentConfig?.commentType,
  ]);

  return (
    <Box pt={4}>
      <BasicTextArea
        rules={{ ...commentRequiredRules, ...commentRules }}
        name="comment"
        placeholder={"Type here ..."}
      />
    </Box>
  );
};

export default CommentQuestion;
