import { IAdditionalInfo } from "store/interfaces/directorates";

export enum EFeedbackDetailsBottomRightTabsOptions {
  Notes = 0,
  Redirection,
  Root_cause,
  History,
}

export const deleteNoteDialogOptions = {
  title: "Warning",
  description: "Are you sure you want to delete this note?",
};

export enum EFeedbackLogTypes {
  Assign = 1,
  Unassign,
  Status,
  Cause,
  Root,
  Mood,
  Note,
  Cancel,
}

export interface IRedirectTabGroupedEmployeeList {
  id: number;
  employeeID: number;
  group: string;
  label: string;
  value: string;
  additionalInfo: IAdditionalInfo;
}

export interface IRedirectTabStatuses {
  value: number;
  name: string;
}

export enum ERedirectTabStatuses {
  In_process = 1,
  Completed,
  // Overdue,
}

export const ERedirectTabStatusesValues = {
  [ERedirectTabStatuses.In_process]: "In process",
  [ERedirectTabStatuses.Completed]: "Completed",
  // [ERedirectTabStatuses.Overdue]: "Overdue",
};

export const redirectTabStatuses = [
  {
    value: ERedirectTabStatuses.In_process,
    name: ERedirectTabStatusesValues[ERedirectTabStatuses.In_process],
  },
  {
    value: ERedirectTabStatuses.Completed,
    name: ERedirectTabStatusesValues[ERedirectTabStatuses.Completed],
  },
  // {
  //   value: ERedirectTabStatuses.Overdue,
  //   name: ERedirectTabStatusesValues[ERedirectTabStatuses.Overdue],
  // },
];

export const deleteFeedbackTaskWarningConfig = {
  title: "Delete Feedback Task",
  description: "Are you sure you want to delete this task?",
};
