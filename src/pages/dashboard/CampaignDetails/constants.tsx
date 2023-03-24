import Distribution from "./distribution";
import Questions from "./questions";

export enum ECampaignTabs {
  QUESTIONS = 0,
  DISTRIBUTION,
}

export const campaignDetailsTabList = [
  {
    index: ECampaignTabs.QUESTIONS,
    label: "Questions",
    children: <Questions />,
  },
  {
    index: ECampaignTabs.DISTRIBUTION,
    label: "Distribution",
    children: <Distribution />,
  },
];
