import { IAttachedEmployee } from "./directorates";
import { IPaginated } from "./main";

export interface IFeedbacksState {
  listData: IPaginated<IFeedback>;
  causeAndMoodList: ICauseCategory[];
  feedbackDetails: null | IFeedbackDetails;
  feedbackNotes: IFeedbackNotes[];
  feedbackLogs: IFeedbackLog[];
  feedbackNoteHistory: IFeedbackNoteHistory[];
  feedbackTasks: IFeedbackTask[];
}

export interface IFeedbackNoteHistory {
  creationDate: string;
  id: number;
  note: string;
  user: IFeedbackUser;
}

export interface IFeedbackNotes extends IFeedbackNoteHistory {
  isDeleted: boolean;
  isUpdated: boolean;
  updatedDate: string;
}

export interface ISurvey {
  sentDate: string;
  openedDate: string;
  startedDate: string;
  finishedDate: string;
  surveyMetric: number;
  touchpoint: number;
  channel: number;
  type: number;
}

export interface IService {
  branch: null;
  employeeName: string;
  employeeEmail: string;
  employeeCode: string;
  serviceCategory: string;
  transactionId: string;
  serviceDate: string;
  directionCoordinator: null;
  poNet: null;
  employeePosition: string;
}

export interface IFeedbackAnswer {
  id: number;
  value: string;
}

export interface IFeedbacksItemDetails {
  id: number;
  title: string;
  isSkipped: false;
  type: number;
  answers: IFeedbackAnswer[];
}

export interface IFeedbackDetails {
  id: number;
  submittedDate: string;
  isLink: false;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  assignID: null;
  status: 6;
  campaignName: string;
  survey: ISurvey;
  service: IService;
  feedbacks: IFeedbacksItemDetails[];
}

export interface IComments {
  title: string;
  answer: string;
}

export interface IFeedbackStatus {
  id: number;
  value: string;
}

export interface IScore {
  type: number;
  value: string;
}

export interface IFeedback {
  id: number;
  isTest: boolean;
  comments: IComments[];
  isCanceled: boolean;
  taskStatus: null | string;
  taskStatusDeadline: null | string;
  customerName: string;
  assignedTo: string;
  feedbackStatus: IFeedbackStatus;
  creationDate: string;
  campaignName: string;
  score: IScore[];
}

export interface IChangeFeedbackStatus {
  id: number;
  formData: {
    state: number;
  };
}

export interface IChangeCustomerRootCause {
  id: number;
  formData: {
    rootCauseIDs: number[];
  };
}

export interface IChangeCustomerMood {
  id: number;
  formData: {
    customerMood: number;
  };
}

export interface IFeedbackCauseAndMood {
  customerMood: string;
  id: number;
  rootCauseIDs: number[];
}

export interface ICauseCategory {
  causeCategoryID: number;
  causeCategoryName: string;
  rootCauseID: number;
  rootCauseIsHidden: boolean;
  rootCauseName: string;
}

export interface IUpdateManager {
  assignUserID: number;
  feedbackIDs: string[];
}

export interface IFeedbackUser {
  id: number;
  name: string;
  surname: string;
  imagePath: string;
  noImage: boolean;
}

export interface IFeedbackLog {
  id: number;
  creationDate: string;
  assignUser: string;
  cause: string;
  root: string;
  mood: null;
  status: number;
  logType: number;
  user: IFeedbackUser;
}

export interface IAddNote {
  creationDate: string;
  feedbackID: number;
  id: number;
  isDeleted: boolean;
  isUpdated: boolean;
  note: string;
}

export interface IUpdateNote {
  noteID: number;
  formData: {
    feedbackID: number;
    note: string;
  };
}

export interface ICauseAndMoodRes {
  customerMood: number;
  id: number;
  rootCauseIDs: number[];
}

export interface IFeedbackTask {
  id: number;
  directoratName: string;
  attachedEmployeeAdditionalInfo: IAttachedEmployee;
  status: IFeedbackStatus;
  deadline: string;
  description: string;
  createdBy: IFeedbackUser;
  creationDate: string;
  updatedDate: string;
  isDeleted: boolean;
  isUpdated: boolean;
  canEditStatus: boolean;
}
