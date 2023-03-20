import { IPaginated } from "./main";

export interface INotificationState {
  list: IPaginated<INotification>;
}
export interface INotification {
  createdBy: string;
  id: number;
  title: string;
  content: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
}
export interface IAddEditNotificationRequest {
  title: string;
  content: string;
}
