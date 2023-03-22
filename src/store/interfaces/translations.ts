import { IPaginated } from "./main";

export interface ITranslationsState {
  list: IPaginated<ITranslation>;
  translationDataByLangId: ITranslationDataByLangId | null;
}

export interface ITranslation {
  id: number;
  key: string;
  translationModule: number;
  captions: ITranslatedKey[];
}

export interface ITranslatedKey {
  value: string;
  languageId?: number;
  languageID?: number;
}

export interface IDeleteTranslation {
  key: string;
  module: number;
}

export type IAddEditTranslation = Omit<ITranslation, "id">;

export interface ITranslationDataByLangId {
  languageId: number;
  translations: { [key: string]: string };
}
