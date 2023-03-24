export interface ICampaignDetailsState {
  triggers: ITrigger[];
  templates: ITemplate[];
  surveys: ICampaignSurvey[];
  details: ICampaignDetailed | null;
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
  surveyQuarantine: true;
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
