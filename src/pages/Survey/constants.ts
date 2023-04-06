import { ECampaignSurveyType } from "pages/dashboard/CampaignDetails/questions/LeftSidebar/constants";
import SingleChoiceQuestion from "./components/questions/SingleChoice";
import MultipleChoiceQuestion from "./components/questions/MultipleChoice";
import RatingQuestion from "./components/questions/Rating";
import CommentQuestion from "./components/questions/Comment";

export enum ESurveyPreviewTypes {
  GENERAL = "p",
  PERSONAL = "s",
}

export const ESurveyPreviewComps = {
  [ECampaignSurveyType.SingleChoice]: SingleChoiceQuestion,
  [ECampaignSurveyType.MultipleChoice]: MultipleChoiceQuestion,
  [ECampaignSurveyType.Comment]: CommentQuestion,
  [ECampaignSurveyType.Rating]: RatingQuestion,
  [ECampaignSurveyType.Nps]: RatingQuestion,
  [ECampaignSurveyType.ServiceQualityScore]: RatingQuestion,
};
