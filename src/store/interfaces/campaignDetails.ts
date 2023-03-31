export interface ICampaignDetailsState {
  triggers: ITrigger[];
  templates: ITemplate[];
  surveys: ICampaignSurvey[];
  details: ICampaignDetailed | null;
  selectedSurvey: number;
  surveyDetails: ICampaignSurveyDetails | null;
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
  logoImage: string;
  name: string;
  quesstionColor: string;
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

export interface IUpdateSurveyRequest {
  campaignID: number;
  title: string;
  position: number;
  type: number;
  buttonText: string;
  isRequired: boolean;
  answers?: IAnswer[];
  metricConfig?: {
    metricLeftText: string;
    metricRightText: string;
  };
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
  commentConfig?: {
    commentType: number;
    commentMin: number;
    commentMax: number;
  };
  id: number;
  isRequired: boolean;
  multipleConfig?: {
    multipleExact: number;
    multipleMax: number;
    multipleMin: number;
    multipleType: number;
  };
  metricConfig?: {
    customEndLength: number;
    customStartLength: number;
    metricLeftText: string | null;
    metricRightText: string | null;
  };
  answers: ISurveyAnswer[];
  position: number;
  questionNumber: number;
  title: string;
  type: number;
}

export interface ICreateCampaignSurveyResponse {
  campaignDeactivated: boolean;
  emptyQuestionSurveys: any;
  surveyId: number;
  surveyResponses: ICampaignSurvey[];
}

export interface ICreateCampaignSurveyRequest {
  buttonText: string;
  campaignID: string;
  isRequired: boolean;
  position: number;
  metricConfig?: {
    customEndLength: number;
    customStartLength: number;
    metricLeftText: string | null;
    metricRightText: string | null;
  };
  selected: boolean;
  title: string;
  type: number;
}
