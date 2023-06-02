import { useContext } from "react"
import * as engLang from "reactnativeapp/language/lang-en.json"
import * as sweLang from "reactnativeapp/language/lang-sv.json"
import { userLanguageContext } from "./languageContext"

export default function AllLanguages () {


    const [userLanguage, setUserLanguage] = useContext(userLanguageContext)

    setUserLanguage(userLanguage.slice(0, 2))
    console.log(userLanguage)

    const allLangs = [
        {
        lang: "sv",
        translationPackage: sweLang
        },

        {
        lang: "en",
        eng: engLang
        }
    ]

    const returnLanguagePackage = (lang) => {
        const languageMatch = allLangs.find( item => {
            return item.lang = lang
        })

        return languageMatch.translationPackage
    }
}