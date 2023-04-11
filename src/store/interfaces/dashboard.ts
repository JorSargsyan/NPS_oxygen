import { IPaginated } from "./main";

export interface IDashboardState {
  deliveredData: IDeliveredData | null;
  dashboardData: null | IDashboardData;
}

export interface IDeliveredData {
  sent: number;
  delivered: number;
  opened: number;
  responded: number;
  bounced: number;
}

export interface IDeliveredDataRequest {
  filters: IDateFilters[];
}

export interface IDateFilters {
  key: string;
  queryCondition: number;
  value: string;
}

export interface IScoreValues {
  badCount: number;
  ordinaryCount: number;
  goodCount: number;
  score: number;
}

export interface ILineChartData {
  name: string;
  data: { x: string; y: number }[];
}

export interface IDashboardData {
  nps: IScoreValues;
  friendliness: IScoreValues;
  npsChopChart: { key: number; value: number }[];
  friendlinessChopChart: { key: number; value: number }[];
  DateType: number;
  lineChartData: ILineChartData[];
}

export interface IDashboardDataRequest extends IDeliveredDataRequest {
  userVisibility: number;
}
