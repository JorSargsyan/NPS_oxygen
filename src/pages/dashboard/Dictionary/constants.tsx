import { IColumn } from "shared/ui/Table/constants";
import {
  ELanguageIds,
  ETranslationModules,
} from "store/enums/translations.enum";
import { ITranslatedKey, ITranslation } from "store/interfaces/translations";

export const columns: IColumn[] = [
  {
    label: "translation_key",
    field: "key",
  },
  {
    label: "armenian",
    layout: (row: ITranslation) => {
      const translation = row?.captions.find(
        (i: ITranslatedKey) => i.languageId === ELanguageIds.Armenian
      );
      return <div>{translation.value}</div>;
    },
  },
  {
    label: "english",
    layout: (row: ITranslation) => {
      const translation = row?.captions.find(
        (i: ITranslatedKey) => i.languageId === ELanguageIds.English
      );
      return <div>{translation.value}</div>;
    },
  },
  {
    label: "russian",
    layout: (row: ITranslation) => {
      const translation = row?.captions.find(
        (i: ITranslatedKey) => i.languageId === ELanguageIds.Russian
      );
      return <div>{translation.value}</div>;
    },
  },
];

export interface ITranslationModuleOptions {
  value: number;
  name: String;
}

export const translationModuleOptions: ITranslationModuleOptions[] = [
  {
    value: ETranslationModules.Dashboard,
    name: "overview_section_title",
  },
  {
    value: ETranslationModules.Feedback,
    name: "responses_section_title",
  },
  {
    value: ETranslationModules.Campaigns,
    name: "surveys_section_title",
  },
  {
    value: ETranslationModules.Customers,
    name: "customers_section_title",
  },
  {
    value: ETranslationModules.Roles,
    name: "roles_section_title",
  },
  {
    value: ETranslationModules.Users,
    name: "users_section_title",
  },
  {
    value: ETranslationModules.Translation,
    name: "translations_section_title",
  },
];

export const deleteTranslationWarningConfig = {
  title: "warning",
  description: "delete_translation",
};
