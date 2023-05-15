import { ECampaignSurveyType } from "../LeftSidebar/constants";
import DesignTab from "./DesignTab";
import LogicTab from "./LogicTab";
import QuestionTab from "./QuestionTab";

export enum ERightSibebarTabs {
  Questions = 0,
  Design,
  Logic,
}

export const rightSidebarTabsData = [
  {
    index: ERightSibebarTabs.Questions,
    label: "Settings",
    children: <QuestionTab />,
  },
  {
    index: ERightSibebarTabs.Design,
    label: "Design",
    children: <DesignTab />,
  },
  {
    index: ERightSibebarTabs.Logic,
    label: "Logic",
    children: <LogicTab />,
  },
];

export const MultipleChoiceLimitOptions = [
  {
    name: "Unlimited",
    value: 1,
  },
  {
    name: "Exact number",
    value: 2,
  },
  {
    name: "Range",
    value: 3,
  },
];

export const CommentCharacterLimit = [
  {
    name: "Unlimited",
    value: 1,
  },
  {
    name: "Range",
    value: 2,
  },
];

export const NO_LOGIC_TYPES: string[] = [
  ECampaignSurveyType.Comment,
  ECampaignSurveyType.Final,
  ECampaignSurveyType.Welcome,
];

export enum ETemplate {
  IDBANK = 0,
  FAST = 1,
  ARDSHIN = 2,
  SANTANDER = 3,
  ACBA = 4,
  WINE_DAYS = 5,
  WIGMORE = 6,
  ALFA_PHARM = 7,
  MUNICIPALITY = 8,
  UCOM = 9,
  EVOCA = 10,
  FLY_ARNA = 11,
  CONVERSE = 12,
  MTS = 13,
}
