import { Dayjs } from "dayjs";
import { EFeedbackStatus, EMood } from "store/enums/feedbacks.enum";
import { IAttachedEmployee } from "store/interfaces/directorates";

export const scoreColors = {
  good: {
    bgColor: "#AFF9DA",
    color: "#146D48",
    chartColor: "#73a110",
  },
  neutral: {
    bgColor: "#FBFCBF",
    color: "#99733B",
    chartColor: "#FFE159",
  },
  bad: {
    bgColor: "#F9AFAF",
    color: "#6D1414",
    chartColor: "#FF7361",
  },
  veryBad: {
    chartColor: "#B3191",
  },
};

export const scoreRanges = {
  good: [9, 10],
  neutral: [7, 8],
  bad: [0, 6],
};

export const viewCommentsDialogConfig = {
  title: "Quick view comments",
};

export interface IFeedbackStatusList {
  value: EFeedbackStatus;
  name: string;
}

export const feedbackStatusList: IFeedbackStatusList[] = [
  {
    value: EFeedbackStatus.New,
    name: "New",
  },
  {
    value: EFeedbackStatus.Follow_Up,
    name: "Follow Up",
  },
  {
    value: EFeedbackStatus.Postponed,
    name: "Postponed",
  },
  {
    value: EFeedbackStatus.No_response,
    name: "No Response",
  },
  {
    value: EFeedbackStatus.Resolved,
    name: "Resolved",
  },
  {
    value: EFeedbackStatus.Not_Resolved,
    name: "Not Resolved",
  },
  {
    value: EFeedbackStatus.Misrated,
    name: "Misrated",
  },
  {
    value: EFeedbackStatus.Archived,
    name: "Archived",
  },
];

export enum ESurveyType {
  StartPage = 1,
  SingleSelect,
  MultipleSelect,
  Comment,
  NPS,
  Friendliness,
  Custom,
  EndPage,
  ContactInformation,
  CustomStar,
  CustomerEffortScore,
  CustomerSatisfactionScore,
}

export const feedbackStatusValues = {
  [EFeedbackStatus.New]: "New",
  [EFeedbackStatus.Follow_Up]: "Follow up",
  [EFeedbackStatus.Postponed]: "Postponed",
  [EFeedbackStatus.No_response]: "No response",
  [EFeedbackStatus.Resolved]: "Resolved",
  [EFeedbackStatus.Not_Resolved]: "Not resolved",
  [EFeedbackStatus.Misrated]: "Misrated",
  [EFeedbackStatus.Archived]: "Archived",
};

export const customerMoodValues = {
  [EMood.Good]: "Good",
  [EFeedbackStatus.Follow_Up]: "Indifferent",
  [EFeedbackStatus.Postponed]: "Bad",
};

export interface IFeedbackDefaultFilterOptionForm {
  type: {
    key: string;
    label: string;
    range: number[];
    type: EFeedbackFilterTypes;
    value: EFeedbackFilterTypesValues;
  };
  queryCondition: string;
  value: IAttachedEmployee | string;
  range?: number[];
}

export const defaultFilterRowValue: IFeedbackDefaultFilterOptionForm = {
  type: null,
  queryCondition: "",
  value: "",
};

export interface IDefaultQuickFilterValues {
  range: null[] | Dayjs[];
  campaign: null | IAttachedEmployee;
  status: IFeedbackStatusList[];
  feedbackType: string;
  userVisibility: string;
}

export const feedbackFilterTypesLabels = {
  NPS: "NPS",
  SERVICE_QUALITY_SCORE: "Service quality score",
  NPS_AGENT: "CX agent",
  TASK_STATUS: "Task status",
  EMPLOYEE: "Employee",
  SERVICE_CATEGORY: "Service category",
  REDIRECTED: "Redirected",
  COMMENTED: "Commented",
  ALL: "All responses",
  DIRECTORATE: "Directorate",
};

export const feedbackFilterTypesKeys = {
  NPS: "nps",
  SERVICE_QUALITY_SCORE: "friendliness",
  NPS_AGENT: "assignedto",
  TASK_STATUS: "taskStatus",
  GRID_TASK_STATUS: "status",
  EMPLOYEE: "employee",
  SERVICE_CATEGORY: "servicecategory",
  CAMPAIGN_NAME: "campaignname",
  DATE: "date",
  REDIRECTED: "redirected",
  COMMENTED: "commented",
  DIRECTORATE: "directorate",
};

export enum EFeedbackFilterTypes {
  NPS = 4,
  SERVICE_QUALITY_SCORE = 4,
  NPS_AGENT = 6,
  TASK_STATUS = 9,
  EMPLOYEE = 8,
  SERVICE_CATEGORY = 1,
  DIRECTORATE = 1,
}

export enum EFeedbackFilterTypesValues {
  NPS = "1",
  SERVICE_QUALITY_SCORE = "2",
  NPS_AGENT = "3",
  TASK_STATUS = "4",
  EMPLOYEE = "5",
  SERVICE_CATEGORY = "6",
  DIRECTORATE = "7",
}

export const quickFilterFeedbackTypes = [
  {
    label: feedbackFilterTypesLabels.ALL,
    value: "",
    key: "",
  },
  {
    label: feedbackFilterTypesLabels.NPS_AGENT,
    value: feedbackFilterTypesKeys.NPS_AGENT,
    key: feedbackFilterTypesKeys.NPS_AGENT,
  },
  {
    label: feedbackFilterTypesLabels.REDIRECTED,
    value: feedbackFilterTypesKeys.REDIRECTED,
    key: feedbackFilterTypesKeys.REDIRECTED,
  },
  {
    label: feedbackFilterTypesLabels.COMMENTED,
    value: feedbackFilterTypesKeys.COMMENTED,
    key: feedbackFilterTypesKeys.COMMENTED,
  },
];

export const quickFilterUserVisibilityTypes = [
  {
    label: "General",
    value: 2,
  },
  {
    label: "Personal",
    value: 3,
  },
];

export enum EQuickFilterTypes {
  Feedback = "feedbackType",
  User_Visibility = "userVisibility",
}

export enum EQuickFilterUserVisibilityValues {
  GENERAL = "2",
  PERSONAL = "3",
}

export const defaultQuickFilterValues: IDefaultQuickFilterValues = {
  range: [null, null],
  campaign: null,
  status: [],
  feedbackType: "",
  userVisibility: EQuickFilterUserVisibilityValues.GENERAL,
};

export enum EFeedbackUserTypeId {
  GENERAL = "feedbackUserTypeId2",
  PERSONAL = "feedbackUserTypeId3",
}
