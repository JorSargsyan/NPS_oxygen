import CircleIcon from "@heroicons/react/24/outline/StopCircleIcon";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import ChatIcon from "@heroicons/react/24/outline/ChatBubbleBottomCenterTextIcon";
import ChartIcon from "@heroicons/react/24/outline/ChartBarIcon";
import SmileIcon from "@heroicons/react/24/outline/FaceSmileIcon";
import HandIcon from "@heroicons/react/24/outline/HandRaisedIcon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import RatingIcon from "@heroicons/react/24/outline/PresentationChartLineIcon";
import PieChartIcon from "@heroicons/react/24/outline/ChartPieIcon";
import SatisfactionIcon from "@heroicons/react/24/outline/ChartBarIcon";
import StarIcon from "@heroicons/react/24/outline/StarIcon";

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
  ContactInformation = "9",
  CustomStar = "10",
  CustomerEffortScore = "11",
  CustomerSatisfactionScore = "12",
}

export const CampaignSurveyTypeList = {
  [ECampaignSurveyType.Welcome]: "Welcome",
  [ECampaignSurveyType.SingleChoice]: "Select One",
  [ECampaignSurveyType.MultipleChoice]: "Select Multiple",
  [ECampaignSurveyType.Comment]: "Comment",
  [ECampaignSurveyType.Nps]: "NPS",
  [ECampaignSurveyType.ServiceQualityScore]: "eNPS",
  [ECampaignSurveyType.Rating]: "Custom Rating",
  [ECampaignSurveyType.ContactInformation]: "Contact Information",
  [ECampaignSurveyType.CustomStar]: "Star Rating",
  [ECampaignSurveyType.CustomerEffortScore]: "CES (Customer effort)",
  [ECampaignSurveyType.CustomerSatisfactionScore]:
    "CSAT (Customer satisfaction)",
  [ECampaignSurveyType.Final]: "Thank you",
};

export const CampaignSurveyIcons = {
  [ECampaignSurveyType.Welcome]: HandIcon,
  [ECampaignSurveyType.SingleChoice]: CircleIcon,
  [ECampaignSurveyType.MultipleChoice]: CheckIcon,
  [ECampaignSurveyType.Comment]: ChatIcon,
  [ECampaignSurveyType.Nps]: ChartIcon,
  [ECampaignSurveyType.ServiceQualityScore]: SmileIcon,
  [ECampaignSurveyType.Rating]: RatingIcon,
  [ECampaignSurveyType.ContactInformation]: UserIcon,
  [ECampaignSurveyType.CustomStar]: StarIcon,
  [ECampaignSurveyType.CustomerEffortScore]: PieChartIcon,
  [ECampaignSurveyType.CustomerSatisfactionScore]: SatisfactionIcon,
  [ECampaignSurveyType.Final]: HandIcon,
};

export const CampaignSurveyColors = {
  [ECampaignSurveyType.Welcome]: "#1B7FFC", //Blue 600
  [ECampaignSurveyType.SingleChoice]: "#3EB84F", //Green 600
  [ECampaignSurveyType.MultipleChoice]: "#B7CA39", //Olive 600
  [ECampaignSurveyType.Comment]: "#F7B937", //Yellow 600
  [ECampaignSurveyType.ContactInformation]: "#FCA16A", //Orange 600
  [ECampaignSurveyType.Nps]: "#5AB4FD", //Blue 400
  [ECampaignSurveyType.ServiceQualityScore]: "#CD8BDF", //Purple 400
  [ECampaignSurveyType.Rating]: "#82D389", //Green 400
  [ECampaignSurveyType.CustomStar]: "#DEE581", //Olive 400
  [ECampaignSurveyType.CustomerEffortScore]: "#AA8FDF", //Violet 400,
  [ECampaignSurveyType.CustomerSatisfactionScore]: "#71CFC1", //Teal 400,
  [ECampaignSurveyType.Final]: "#EF7576", //Red 400
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
  [ECampaignSurveyType.CustomStar]: {
    metricConfig: {
      metricLeftText: null,
      metricRightText: null,
      customStartLength: 0,
      customEndLength: 10,
    },
  },
  [ECampaignSurveyType.CustomerSatisfactionScore]: {
    metricConfig: {
      metricLeftText: null,
      metricRightText: null,
      customStartLength: 0,
      customEndLength: 10,
    },
  },
  [ECampaignSurveyType.CustomerEffortScore]: {
    metricConfig: {
      metricLeftText: null,
      metricRightText: null,
      customStartLength: 0,
      customEndLength: 10,
    },
  },
};
