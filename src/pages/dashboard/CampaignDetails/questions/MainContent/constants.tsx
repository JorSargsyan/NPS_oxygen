import { ECampaignSurveyType } from "../LeftSidebar/constants";
import SimpleForm from "./components/SimpleForm";
import ChoiceForm from "./components/ChoiceForm";
import MetricForm from "./components/MetricForm";

export const CampaignSurveyForms = {
  [ECampaignSurveyType.Welcome]: SimpleForm,
  [ECampaignSurveyType.SingleChoice]: ChoiceForm,
  [ECampaignSurveyType.MultipleChoice]: ChoiceForm,
  [ECampaignSurveyType.Comment]: SimpleForm,
  [ECampaignSurveyType.Rating]: MetricForm,
  [ECampaignSurveyType.Nps]: MetricForm,
  [ECampaignSurveyType.ServiceQualityScore]: MetricForm,
  [ECampaignSurveyType.Final]: SimpleForm,
};
