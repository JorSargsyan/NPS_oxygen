import { IPaginated } from "./main";

export interface ICampaignState {
  campaigns: IPaginated<ICampaign> | null;
}

export interface ICampaignLog {
  creationDate: string;
  state: string;
  userId: number;
  username: string;
}

export interface ICampaign {
  bounced: number;
  creationDate: string;
  delivered: number;
  hasWarning: boolean;
  id: number;
  isActive: boolean;
  name: string;
  opened: number;
  responded: number;
  sent: number;
  touchpoint: string;
}
