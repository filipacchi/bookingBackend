import * as engLang from "reactnativeapp/language/lang-en.json"
import * as sweLang from "reactnativeapp/language/lang-sv.json"

export default function AllLanguages (lang) {

/*     if (lang == "sv") {
        return sweLang
    } else if (lang == "en") {
        return engLang
    }
 */
    return (
        {
            eng: engLang,
            swe: sweLang
        }
    )
}