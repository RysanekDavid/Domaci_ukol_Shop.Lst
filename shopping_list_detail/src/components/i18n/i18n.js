import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./ENtranslation.json";
import translationCZ from "./CZtranslation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  cz: {
    translation: translationCZ,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "cz", // Jazyk, na který se má přejít, pokud není nalezen aktuální jazyk
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
