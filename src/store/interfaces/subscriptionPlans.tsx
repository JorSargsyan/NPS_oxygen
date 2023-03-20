import { IPaginated } from "./main";

export interface ISubscriptionPlansState {
  list: IPaginated<ISubscriptionPlans>;
}

export interface ISubscriptionPlans {
  id:number
  type: string;
  title: string;
  body:string;
  price: number;
  duration: string;
  position: number | null;
  status: string; 
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}
export interface IAddEditSubscriptionPlanRequest {
  type: string;
  title: string;
  body:string;
  duration: string;
  position: number | null;
  price: number;
  
}