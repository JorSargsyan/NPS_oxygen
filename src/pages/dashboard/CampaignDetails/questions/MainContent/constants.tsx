import { ECampaignSurveyType } from "../LeftSidebar/constants";
import SimpleForm from "./components/SimpleForm";
import ChoiceForm from "./components/ChoiceForm";
import MetricForm from "./components/MetricForm";
import ContactForm from "./components/ContactForm";

export const CampaignSurveyForms = {
  [ECampaignSurveyType.Welcome]: SimpleForm,
  [ECampaignSurveyType.SingleChoice]: ChoiceForm,
  [ECampaignSurveyType.MultipleChoice]: ChoiceForm,
  [ECampaignSurveyType.Comment]: SimpleForm,
  [ECampaignSurveyType.Rating]: MetricForm,
  [ECampaignSurveyType.Nps]: MetricForm,
  [ECampaignSurveyType.ServiceQualityScore]: MetricForm,
  [ECampaignSurveyType.CustomerEffortScore]: MetricForm,
  [ECampaignSurveyType.CustomerSatisfactionScore]: MetricForm,
  [ECampaignSurveyType.CustomStar]: MetricForm,
  [ECampaignSurveyType.ContactInformation]: ContactForm,
  [ECampaignSurveyType.Final]: SimpleForm,
};
