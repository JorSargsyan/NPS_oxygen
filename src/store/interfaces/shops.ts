import { IPaginated } from "./main";
import { ICategory } from "./shopCategories";

export interface IShopsState {
  list: IPaginated<IShops>;
}

export interface IShops {
  id: number;
  status: string;
  url: string;
  name: string;
  position: number;
  shopCategories: ICategory[];
  logoUrl: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface IAddEditShopRequest {
  url: string;
  name: string;
  categories: number[];
  position: number | null;
  logoUrl: string;
}
