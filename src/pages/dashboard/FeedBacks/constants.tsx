import { Box } from "@mui/system";
import { Dayjs } from "dayjs";
import {
  EFeedbackStatus,
  EMood,
  EScoreTypes,
} from "store/enums/feedbacks.enum";
import { IAttachedEmployee } from "store/interfaces/directorates";
import { IFeedback, IScore } from "store/interfaces/feedback";

export const scoreColors = {
  good: {
    bgColor: "#AFF9DA",
    color: "#146D48",
  },
  neutral: {
    bgColor: "#FBFCBF",
    color: "#99733B",
  },
  bad: {
    bgColor: "#F9AFAF",
    color: "#6D1414",
  },
};

export const feedbackColumns = [
  { label: "ID", field: "id" },
  { label: "Campaign", field: "campaignName" },
  { label: "Customer", field: "customerName" },
  {
    label: "Score",
    layout: (row: IFeedback) => {
      const textColor = (score: IScore) => {
        const val = Number(score.value);
        if (val >= 0 && val <= 6) {
          return scoreColors.bad.color;
        } else if (val >= 7 && val <= 8) {
          return scoreColors.neutral.color;
        } else {
          return scoreColors.good.color;
        }
      };

      const bgColor = (score: IScore) => {
        const val = Number(score.value);
        if (val >= 0 && val <= 6) {
          return scoreColors.bad.bgColor;
        } else if (val >= 7 && val <= 8) {
          return scoreColors.neutral.bgColor;
        } else {
          return scoreColors.good.bgColor;
        }
      };

      return (
        <Box sx={{ display: "flex", gap: "12px" }}>
          {row.score.map((score: IScore, index) => {
            return (
              <Box
                bgcolor={bgColor(score)}
                color={textColor(score)}
                key={index}
                textAlign="center"
                padding="4px"
                width="45px"
                borderRadius="8px"
                fontSize="12px"
              >
                <Box>{EScoreTypes[score.type]}</Box>
                <Box>{score.value}</Box>
              </Box>
            );
          })}
        </Box>
      );
    },
  },
  { label: "Submission Date", field: "creationDate" },
  { label: "NPS agent", field: "assignedTo" },
];

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
}

export const defaultQuickFilterValues: IDefaultQuickFilterValues = {
  range: [null, null],
  campaign: null,
  status: [],
};

export const feedbackFilterTypesLabels = {
  NPS: "NPS",
  SERVICE_QUALITY_SCORE: "Service quality score",
  NPS_AGENT: "NPS agent",
  TASK_STATUS: "Task status",
  EMPLOYEE: "Employee",
  SERVICE_CATEGORY: "Service category",
  REDIRECTED: "Redirected",
  COMMENTED: "Commented",
  ALL: "All responses",
};

export const feedbackFilterTypesKeys = {
  NPS: "nps",
  SERVICE_QUALITY_SCORE: "friendliness",
  NPS_AGENT: "assignedto",
  TASK_STATUS: "taskStatus",
  EMPLOYEE: "employee",
  SERVICE_CATEGORY: "servicecategory",
  CAMPAIGN_NAME: "campaignname",
  DATE: "date",
  REDIRECTED: "redirected",
  COMMENTED: "commented",
};

export enum EFeedbackFilterTypes {
  NPS = 4,
  SERVICE_QUALITY_SCORE = 4,
  NPS_AGENT = 6,
  TASK_STATUS = 9,
  EMPLOYEE = 8,
  SERVICE_CATEGORY = 1,
}

export enum EFeedbackFilterTypesValues {
  NPS = "1",
  SERVICE_QUALITY_SCORE = "2",
  NPS_AGENT = "3",
  TASK_STATUS = "4",
  EMPLOYEE = "5",
  SERVICE_CATEGORY = "6",
}

export const feedbackFilterTypes = [
  {
    label: feedbackFilterTypesLabels.NPS,
    value: EFeedbackFilterTypesValues.NPS,
    type: EFeedbackFilterTypes.NPS,
    key: feedbackFilterTypesKeys.NPS,
  },
  {
    label: feedbackFilterTypesLabels.SERVICE_QUALITY_SCORE,
    value: EFeedbackFilterTypesValues.SERVICE_QUALITY_SCORE,
    type: EFeedbackFilterTypes.SERVICE_QUALITY_SCORE,
    key: feedbackFilterTypesKeys.SERVICE_QUALITY_SCORE,
  },
  {
    label: feedbackFilterTypesLabels.NPS_AGENT,
    value: EFeedbackFilterTypesValues.NPS_AGENT,
    type: EFeedbackFilterTypes.NPS_AGENT,
    key: feedbackFilterTypesKeys.NPS_AGENT,
  },
  {
    label: feedbackFilterTypesLabels.TASK_STATUS,
    value: EFeedbackFilterTypesValues.TASK_STATUS,
    type: EFeedbackFilterTypes.TASK_STATUS,
    key: feedbackFilterTypesKeys.TASK_STATUS,
  },
  {
    label: feedbackFilterTypesLabels.EMPLOYEE,
    value: EFeedbackFilterTypesValues.EMPLOYEE,
    type: EFeedbackFilterTypes.EMPLOYEE,
    key: feedbackFilterTypesKeys.EMPLOYEE,
  },
  {
    label: feedbackFilterTypesLabels.SERVICE_CATEGORY,
    value: EFeedbackFilterTypesValues.SERVICE_CATEGORY,
    type: EFeedbackFilterTypes.SERVICE_CATEGORY,
    key: feedbackFilterTypesKeys.SERVICE_CATEGORY,
  },
];

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
  GENERAL = 2,
  PERSONAL = 3,
}

export enum EFeedbackUserTypeId {
  GENERAL = "feedbackUserTypeId2",
  PERSONAL = "feedbackUserTypeId3",
}
