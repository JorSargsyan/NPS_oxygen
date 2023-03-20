import { IPaginated } from "./main";

export interface ITranslationsState {
  list: IPaginated<ITranslation>;
}

export interface ILanguageBase {
  lang: string;
  text: string;
}

export interface IAddEditTranslationRequest {
  key: string;
  data: ILanguageBase[];
}

export interface ITranslation {
  id: number;
  key: string;
  data: ILanguageBase[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}


