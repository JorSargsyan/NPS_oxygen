import Distribution from "./distribution";
import Questions from "./questions";
import Templates from "./questions/RightSidebar/components/Templates";

export enum ECampaignTabs {
  QUESTIONS = 0,
  TEMPLATES,
  DISTRIBUTION,
}

export const campaignDetailsTabList = [
  {
    index: ECampaignTabs.QUESTIONS,
    label: "Questions",
    children: <Questions />,
  },
  {
    index: ECampaignTabs.TEMPLATES,
    label: "Templates",
    children: <Templates />,
  },
  {
    index: ECampaignTabs.DISTRIBUTION,
    label: "Share",
    children: <Distribution />,
  },
];

export const unsavedDialogWarning = {
  title: "Unsaved changes",
  description: "Do you want to leave ? Changes you made may not be saved.",
};
