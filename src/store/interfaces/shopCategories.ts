import { IPaginated } from "./main";

export interface IShopCategoriesState {
  list: IPaginated<IShopCategories>;
}

export interface IShopCategories {
  id: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  deleteAt: string;
}

export interface ICategory {
  category: number;
}
export interface IAddEditShopCategoryRequest {
  type: string;
  position: number;
}
