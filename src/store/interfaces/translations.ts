import { IPaginated } from "./main";

export interface ITranslationsState {
  list: IPaginated<ITranslation>;
}

export interface ITranslation {
  id: number;
  key: string;
  translationModule: number;
  captions: ITranslatedKey[];
}

export interface ITranslatedKey {
  value: string;
  languageId: number;
}

export interface IDeleteTranslation {
  key: string;
  module: number;
}

export type IAddEditTranslation = Omit<ITranslation, "id">;
