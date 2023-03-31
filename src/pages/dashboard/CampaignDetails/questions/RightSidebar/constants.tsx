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
