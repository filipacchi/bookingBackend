import { createContext, useState } from 'react';
import {NativeModules, Platform } from 'react-native'
import * as asda from "reactnativeapp/language/allLangs"

//create a context, with createContext api
export const userLanguageContext = createContext();

const UserLanguageProvider = (props) => {
        // this state will be shared with all components 

    const [userLanguage, setUserLanguage] = useState((
        Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale
        : NativeModules.I18nManager.localeIdentifier).slice(0, 2)

    ); /* här lägger vi till mobilens standardspråk */
    const [languagePackage, setLanguagePackage] = useState();

    console.log("userLanguage: " + userLanguage)

    return (
                // this is the provider providing state
        <userLanguageContext.Provider 
        value={[userLanguage, setUserLanguage, languagePackage, setLanguagePackage]}>
            {props.children}
        </userLanguageContext.Provider>
    );
};

export default UserLanguageProvider;
