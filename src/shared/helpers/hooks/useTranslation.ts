import { useCallback } from "react";
import { useSelector } from "react-redux";
import { selectTranslationsByLangId } from "store/slicers/translations";

const useTranslation = () => {
  const lang = useSelector(selectTranslationsByLangId);

  const translatedKey = useCallback(
    (key: string) => {
      if (lang?.translations && lang.translations.hasOwnProperty(key)) {
        return lang.translations[key as string];
      }
      return key;
    },
    [lang?.translations]
  );

  return translatedKey;
};

export default useTranslation;
