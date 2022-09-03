import i18n from 'i18next';
import ns1 from './en/ns1.json';
import ns2 from './en/ns2.json';
import v1 from './vi/ns1.json';
import v2 from './vi/ns2.json';
import { initReactI18next } from 'react-i18next';
import Cookies from "js-cookie";
import {defaultLang} from "../config/i18nConfig";

export const resources = {
  en: {
    ns1,
    ns2,
  },
  vi: {
    ns1: v1,
    ns2: v2,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: Cookies.get('lang') ?? defaultLang,
  ns: ['ns1', 'ns2'],
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
});
