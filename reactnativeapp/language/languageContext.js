import { createContext, useState } from 'react';
import {NativeModules, Platform} from "react-native"

//create a context, with createContext api
export const userLanguageContext = createContext();

const UserLanguageProvider = (props) => {
        // this state will be shared with all components 

    const [userLanguage, setUserLanguage] = useState(
        (Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier
   )); /* här lägger vi till mobilens standardspråk */
    const [languagePackage, setLanguagePackage] = useState();

     

    return (
                // this is the provider providing state
        <userLanguageContext.Provider 
        value={[userLanguage, setUserLanguage, languagePackage, setLanguagePackage]}>
            {props.children}
        </userLanguageContext.Provider>
    );
};

export default UserLanguageProvider;