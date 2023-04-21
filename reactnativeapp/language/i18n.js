import { translations } from "./localizations";
import { useState, createContext } from "react"
import { I18n } from "i18n-js";
import { getLocales } from "expo-localization"

export const i18n = createContext({
    i18n: new I18n(translations),
    t: () => {},
    changeLocale: () => {}
})


