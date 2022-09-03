import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
  defaultLang,
} from "../../../../config/i18nConfig";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import {resources} from "../../../../i18n/config";
import Cookies from "js-cookie";

const initialState = {
  lang: Cookies.get('lang') ?? defaultLang, // "en" when app loads
};

export const i18nSlice = createSlice({
  name: "i18n",
  initialState,
  reducers: {
    updateI18n: (state, action: PayloadAction<string>) => {
      Cookies.set('lang', action.payload)
      state.lang = action.payload

      i18n.use(initReactI18next).init({
        lng: action.payload,
        ns: ['ns1', 'ns2'],
        interpolation: {
          escapeValue: false, // not needed for react as it escapes by default
        },
        resources,
      });
    }
  }
});


export const {
  updateI18n,
} = i18nSlice.actions

export default i18nSlice.reducer;
