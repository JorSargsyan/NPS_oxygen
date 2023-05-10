import {
  ECommentConfigType,
  EMultipleConfigType,
} from "store/enums/campaignDetails";

export interface ICampaignDetailsState {
  triggers: ITrigger[];
  templates: ITemplate[];
  surveys: ICampaignSurvey[];
  details: ICampaignDetailed | null;
  selectedSurvey: number;
  surveyDetails: ICampaignSurveyDetails | null;
  surveyLogic: ISurveyLogicResponse | null;
  surveyTemplate: ITemplate | null;
  form: {
    survey: any;
    settings: any;
  };
}

export interface ICampaignDetailed {
  creationDate: string;
  hasFeedback: boolean;
  id: number;
  ignoreQuarantine: boolean;
  isActive: boolean;
  isLink: boolean;
  message: string;
  name: string;
  numberOfTransaction: number;
  postpone: boolean;
  postponeTime: number;
  quarantinePeriod: number;
  shareLink: string;
  surveyMetric: number;
  surveyQuarantine: boolean;
  touchpoint: string;
  triggerIDs: number[];
  type: number;
}

export interface ITrigger {
  id: number;
  label: string;
}

export interface ITemplate {
  answerColor: string;
  backgroundDesktopImage: string;
  backgroundImage: string;
  buttonColor: string;
  buttonTextColor: string;
  id: number;
  isDefault: boolean;
  isPublic: boolean;
  isSelected: boolean;
  logoImageBase64: string;
  imageBase64: string;
  name: string;
  questionColor: string;
}

export interface ICampaignSurvey {
  hasLogic: boolean;
  id: number;
  position: number;
  questionNumber: number;
  selected: boolean;
  title: string;
  type: number;
}

export interface IAnswer {
  id: number;
  position: number;
  value: string;
  name: string;
  newAnswer?: boolean;
}

export interface IDistributionSchedule {
  isLink: boolean;
  message: string;
  postpone: boolean;
  surveyQuarantine: boolean;
  ignoreQuarantine: boolean;
  postponeTime: number;
  numberOfTransaction: number;
  quarantinePeriod: number;
  triggerIDs: number[];
}

export interface ISurveyAnswer {
  id: number;
  value: string;
  position: number;
}
export interface ICampaignSurveyDetails {
  buttonText: string;
  commentConfig?: ICommentConfig;
  id?: number;
  isRequired: boolean;
  multipleConfig?: IMultipleConfig;
  metricConfig?: IMetricConfig;
  answers: ISurveyAnswer[];
  position: number;
  questionNumber?: number;
  title: string;
  type: number;
}

export interface IMetricConfig {
  customEndLength: string;
  customStartLength: string;
  metricLeftText: string | null;
  metricRightText: string | null;
}

export interface IAddEditSurveyTemplateRequest {
  name: string;
  questionColor: string;
  answerColor: string;
  buttonColor: string;
  buttonTextColor: string;
  logoImageBase64: string;
  logoImageExtension?: string;
  imageBase64: string;
  imageExtension?: string;
}
export interface IMultipleConfig {
  multipleExact: string;
  multipleMax: string;
  multipleMin: string;
  multipleType: EMultipleConfigType;
}

export interface ICommentConfig {
  commentType: ECommentConfigType;
  commentMin: string;
  commentMax: string;
}

export interface IUpdateSurveyRequest {
  campaignID: number;
  buttonText: string;
  commentConfig?: ICommentConfig;
  isRequired: boolean;
  multipleConfig?: IMultipleConfig;
  metricConfig?: IMetricConfig;
  answers: ISurveyAnswer[];
  position: number;
  title: string;
  type: number;
}

export interface ICreateCampaignSurveyResponse {
  campaignDeactivated: boolean;
  emptyQuestionSurveys: any;
  surveyId: number;
  surveyResponses: ICampaignSurvey[];
}

export interface IAddEditCampaignSurveyRequest {
  buttonText: string;
  campaignID: string;
  isRequired: boolean;
  position: number;
  metricConfig?: IMetricConfig;
  selected: boolean;
  title: string;
  type: number;
}

export interface IUpdateSurveyTemplateRequest {
  logoImage: {
    base64Image: string;
    extension?: string;
    removeImage: boolean;
  };
  image: {
    base64Image: string;
    removeImage: boolean;
    extension?: string;
  };
  name: string;
  questionColor: string;
  answerColor: string;
  buttonColor: string;
  buttonTextColor: string;
}

export interface ILinkedSurvey {
  surveyID: number;
  surveyTitle: string;
  surveyType: number;
}

export interface ISurveyLogic {
  linkedSurvey: ILinkedSurvey;
  surveyAnswers: {
    surveyAnswerID: number;
    surveyAnswerValue: string;
  }[];
}

export interface ISurveyLogicResponse {
  linkedSurvey: ILinkedSurvey;
  surveyLogic: ISurveyLogic[];
}

export interface ICreateSurveyLogic {
  answerIDs: string[];
  nextID: string;
}
