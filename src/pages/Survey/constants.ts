import { ECampaignSurveyType } from "pages/dashboard/CampaignDetails/questions/LeftSidebar/constants";
import SingleChoiceQuestion from "./components/questions/SingleChoice";
import MultipleChoiceQuestion from "./components/questions/MultipleChoice";
import RatingQuestion from "./components/questions/Rating";
import CommentQuestion from "./components/questions/Comment";
import ContactForm from "./components/questions/ContactForm";

export enum ESurveyPreviewTypes {
  GENERAL = "p",
  PERSONAL = "s",
}

export const ESurveyPreviewComps = {
  [ECampaignSurveyType.SingleChoice]: SingleChoiceQuestion,
  [ECampaignSurveyType.MultipleChoice]: MultipleChoiceQuestion,
  [ECampaignSurveyType.Comment]: CommentQuestion,
  [ECampaignSurveyType.ContactInformation]: ContactForm,
  [ECampaignSurveyType.Rating]: RatingQuestion,
  [ECampaignSurveyType.CustomStar]: RatingQuestion,
  [ECampaignSurveyType.CustomerEffortScore]: RatingQuestion,
  [ECampaignSurveyType.CustomerSatisfactionScore]: RatingQuestion,
  [ECampaignSurveyType.Nps]: RatingQuestion,
  [ECampaignSurveyType.ServiceQualityScore]: RatingQuestion,
};
