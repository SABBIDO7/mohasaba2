import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
//const url = "http://localhost:8000";
const url = "https://pssapi.net:444";
i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'fr', 'ar'],
    fallbackLng: 'en',
    debug: true,
    // Specify where the translation files are located
    backend: {
      loadPath: `${url}/locales/{{lng}}/{{ns}}.json`, // Path to your translation files
    },
    detection: {
      order: ['path', 'cookie', 'htmlTag'],
      caches: ['cookie'],
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
