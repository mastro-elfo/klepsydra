import i18n from "i18next";
import Backend from "i18next-chained-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import LocalStorageBackend from "i18next-localstorage-backend";
import Fetch from "i18next-fetch-backend";
import { version } from "./version.json";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // debug: true,
    fallbackLng: "en",
    // defaultNS: "translation",
    backend: {
      backends: [LocalStorageBackend, Fetch],
      backendOptions: [
        {
          prefix: "i18next_res_",
          expirationTime: 7 * 24 * 60 * 60 * 1000,
          // expirationTime: 0,
          defaultVersion: version,
        },
        {
          loadPath: "/klepsydra/locales/{{lng}}/{{ns}}.json",
        },
      ],
    },
  });
