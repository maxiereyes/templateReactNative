import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {en, es} from './../i18n'

//empty for now
const resources = {
    es: {
        translation: es
    },
    en: {
        translation: en
    }
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "es",
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
});

export default i18n;