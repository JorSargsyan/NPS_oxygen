import { IPaginated } from "./main";

export interface IUserNotificationState {
  list: IPaginated<IUserNotification>;
}
export interface IUserNotification {
  id: number;
  user: number;
  notification: number;
  scheduledAt: string;
  status: string;
}
export interface ISendUserNotificationRequest {
  notification: number;
  type: string;
  users: number[];
  scheduledAt: string;
}
