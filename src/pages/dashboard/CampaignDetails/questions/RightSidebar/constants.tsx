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
