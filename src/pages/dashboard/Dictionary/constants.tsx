import { IColumn } from "shared/ui/Table/constants";
import {
  ELanguageIds,
  ETranslationModules,
} from "store/enums/translations.enum";
import { ITranslatedKey, ITranslation } from "store/interfaces/translations";

export const columns: IColumn[] = [
  {
    label: "Translation key",
    field: "key",
  },
  {
    label: "Armenian",
    layout: (row: ITranslation) => {
      const translation = row?.captions.find(
        (i: ITranslatedKey) => i.languageId === ELanguageIds.Armenian
      );
      return <div>{translation.value}</div>;
    },
  },
  {
    label: "English",
    layout: (row: ITranslation) => {
      const translation = row?.captions.find(
        (i: ITranslatedKey) => i.languageId === ELanguageIds.English
      );
      return <div>{translation.value}</div>;
    },
  },
  {
    label: "Russian",
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
    name: "Dashboard",
  },
  {
    value: ETranslationModules.Feedback,
    name: "Feedback",
  },
  {
    value: ETranslationModules.Campaigns,
    name: "Campaigns",
  },
  {
    value: ETranslationModules.Customers,
    name: "Customers",
  },
  {
    value: ETranslationModules.Roles,
    name: "Roles",
  },
  {
    value: ETranslationModules.Users,
    name: "Users",
  },
  {
    value: ETranslationModules.Translation,
    name: "Translations",
  },
];

export const deleteTranslationWarningConfig = {
  title: "Warning",
  description: "Are you sure you want to delete this translation?",
};
