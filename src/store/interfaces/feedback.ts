import { IPaginated } from "./main";

export interface IFeedbacksState {
  listData: IPaginated<IFeedback>;
  causeAndMoodList: ICauseCategory[];
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
