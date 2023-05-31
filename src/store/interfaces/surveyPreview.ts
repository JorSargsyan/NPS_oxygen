import {
  IAnswer,
  ICommentConfig,
  IMetricConfig,
  IMultipleConfig,
  ITemplate,
} from "./campaignDetails";

export interface ISurveyPreviewState {
  questionConfig: IQuestionConfig | null;
  questionDetails: IQuestionDetails | null;
  activeTemplateID: number;
}

export interface IQuestionConfig {
  isExpired: boolean;
  isFinished: boolean;
}

export interface IQuestionDetails {
  id: number;
  title: string;
  type: number;
  isRequired: boolean;
  isLast: boolean;
  buttonText: string;
  multipleConfig: IMultipleConfig;
  commentConfig: ICommentConfig;
  metricConfig: IMetricConfig;
  template: ITemplate;
  answers: IAnswer[];
  publicURL: string;
}

export interface IQuestionRequest {
  answerIDs: string[];
  hash: string;
  surveyID: string | null;
}

export interface IQuestionAnswerRequest extends IQuestionRequest {}
