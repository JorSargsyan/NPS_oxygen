import { IPaginated } from "./main";

export interface IFeedbacksState {
  listData: IPaginated<IFeedback>;
  causeAndMoodList: ICauseCategory[];
  feedbackDetails: null | IFeedbackDetails;
  feedbackNotes: IFeedbackNotes[];
}

export interface IFeedbackNotes {
  creationDate: string;
  id: number;
  isDeleted: boolean;
  isUpdated: boolean;
  note: string;
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
