import DesignTab from "./components/DesignTab";
import LogicTab from "./components/LogicTab";
import QuestionTab from "./components/QuestionTab";

export enum ELeftSibebarTabs {
  Questions = 0,
  Design,
  Logic,
}

export const leftSidebarTabsData = [
  {
    index: ELeftSibebarTabs.Questions,
    label: "Questions",
    children: <QuestionTab />,
  },
  {
    index: ELeftSibebarTabs.Design,
    label: "Design",
    children: <DesignTab />,
  },
  {
    index: ELeftSibebarTabs.Logic,
    label: "Logic",
    children: <LogicTab />,
  },
];
