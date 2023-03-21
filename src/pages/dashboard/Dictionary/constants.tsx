import { IColumn } from "shared/ui/Table/constants";
import { ELanguageIds } from "store/enums/translations.enum";
import { ITranslatedKey, ITranslation } from "store/interfaces/translations";

export const dictionaryColumns: IColumn[] = [
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

export const deleteTranslationWarningConfig = {
  title: "Warning",
  description: "Are you sure you want to delete this translation???",
};
