import * as engLang from "reactnativeapp/language/lang-en.json"
import * as sweLang from "reactnativeapp/language/lang-sv.json"

export default function AllLanguages () {

/*     if (lang == "sv") {
        return sweLang
    } else if (lang == "en") {
        return engLang
    }
 */

    const allLangs = [
        {
        lang: "swe",
        translationPackage: sweLang
        },

        {
        lang: "eng",
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