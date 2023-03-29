import { ECampaignSurveyType } from "../LeftSidebar/constants";
import WelcomeForm from "./components/WelcomeForm";
import SingleChoiceForm from "./components/SingleChoiceForm";
import MultipleChoiceForm from "./components/MultipleChoiceForm";
import CommentForm from "./components/CommentForm";
import RatingForm from "./components/RatingForm";
import NpsForm from "./components/NpsForm";
import ServiceScoreForm from "./components/ServiceScoreForm";
import FinalForm from "./components/FinalForm";

export const CampaignSurveyForms = {
  [ECampaignSurveyType.Welcome]: WelcomeForm,
  [ECampaignSurveyType.SingleChoice]: SingleChoiceForm,
  [ECampaignSurveyType.MultipleChoice]: MultipleChoiceForm,
  [ECampaignSurveyType.Comment]: CommentForm,
  [ECampaignSurveyType.Rating]: RatingForm,
  [ECampaignSurveyType.Nps]: NpsForm,
  [ECampaignSurveyType.ServiceQualityScore]: ServiceScoreForm,
  [ECampaignSurveyType.Final]: FinalForm,
};
