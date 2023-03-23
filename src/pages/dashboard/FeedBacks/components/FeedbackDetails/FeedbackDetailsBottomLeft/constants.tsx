import TabFeedbackComponent from "./TabFeedbackComponent";
import TabServiceComponent from "./TabServiceComponent";
import TabSurveyComponent from "./TabSurveyComponent";

export enum EFeedbackDetailsBottomLeftTabsOptions {
  Feedback = 0,
  Survey,
  Service,
}

export const feedbackDetailsBottomLeftTabsOptions = [
  {
    index: EFeedbackDetailsBottomLeftTabsOptions.Feedback,
    label: "Feedback",
    children: <TabFeedbackComponent />,
  },
  {
    index: EFeedbackDetailsBottomLeftTabsOptions.Survey,
    label: "Survey",
    children: <TabSurveyComponent />,
  },
  {
    index: EFeedbackDetailsBottomLeftTabsOptions.Service,
    label: "Service",
    children: <TabServiceComponent />,
  },
];
