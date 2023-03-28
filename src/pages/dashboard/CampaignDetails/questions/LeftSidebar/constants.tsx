export const deleteCampaignSurveyWarningConfig = {
  title: "Warning",
  description: "Are you sure you want to delete this survey",
};

export enum ECampaignSurveyType {
  Welcome = "1",
  SingleChoice = "2",
  MultipleChoice = "3",
  Comment = "4",
  Nps = "5",
  ServiceQualityScore = "6",
  Rating = "7",
  Final = "8",
}

export const CampaignSurveyTypeList = {
  [ECampaignSurveyType.Welcome]: "Welcome",
  [ECampaignSurveyType.SingleChoice]: "Single choice",
  [ECampaignSurveyType.MultipleChoice]: "Multiple choice",
  [ECampaignSurveyType.Comment]: "Comment",
  [ECampaignSurveyType.Nps]: "NPS",
  [ECampaignSurveyType.ServiceQualityScore]: "Service quality score",
  [ECampaignSurveyType.Rating]: "Rating",
  [ECampaignSurveyType.Final]: "Thank you",
};

export const SurveyTypeConfig = {
  [ECampaignSurveyType.MultipleChoice]: {
    multipleConfig: {
      multipleType: 1,
      multipleExact: null,
      multipleMin: null,
      multipleMax: null,
    },
  },
  [ECampaignSurveyType.Comment]: {
    commentConfig: {
      commentType: 1,
      commentMin: null,
      commentMax: null,
    },
  },
  [ECampaignSurveyType.Rating]: {
    metricConfig: {
      metricLeftText: null,
      metricRightText: null,
      customStartLength: 0,
      customEndLength: 10,
    },
  },
};
