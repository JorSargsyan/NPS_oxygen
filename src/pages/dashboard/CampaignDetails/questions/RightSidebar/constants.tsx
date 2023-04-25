import { ECampaignSurveyType } from "../LeftSidebar/constants";
import DesignTab from "./DesignTab";
import LogicTab from "./LogicTab";
import QuestionTab from "./QuestionTab";
import IDLogo from "assets/icons/ID_bank.svg";
import ArdshinLogo from "assets/images/ardshin.png";
import FastLogo from "assets/icons/fast.svg";
import SantanderLogo from "assets/images/santander.png";
import WineDaysLogo from "assets/images/wine_days.jpeg";
import AcbaLogo from "assets/images/acba.jpeg";
import WigmoreLogo from "assets/images/wigmore.jpeg";
import AlfaPharmLogo from "assets/images/alfa.jpeg";

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
}

export const TemplateList = [
  {
    id: ETemplate.IDBANK,
    logo: IDLogo,
    color: "#F2802B",
    name: "IDbank",
  },
  {
    id: ETemplate.FAST,
    logo: FastLogo,
    color: "#d70f82",
    name: "FastBank",
  },
  {
    id: ETemplate.ARDSHIN,
    logo: ArdshinLogo,
    color: "#183794",
    name: "ArdshinBank",
  },
  {
    id: ETemplate.SANTANDER,
    logo: SantanderLogo,
    color: "#EC0000",
    name: "Santander Bank",
  },
  {
    id: ETemplate.ACBA,
    logo: AcbaLogo,
    color: "#00A789",
    name: "Acba bank",
  },
  {
    id: ETemplate.WINE_DAYS,
    logo: WineDaysLogo,
    color: "#3b1d82",
    name: "Yerevan wine days",
  },
  {
    id: ETemplate.WIGMORE,
    logo: WigmoreLogo,
    color: "#325F48",
    name: "Wigmore",
  },
  {
    id: ETemplate.ALFA_PHARM,
    logo: AlfaPharmLogo,
    color: "#49b748",
    name: "Alfa pharm",
  },
];
