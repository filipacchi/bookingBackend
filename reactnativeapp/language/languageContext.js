import { createContext, useState } from 'react';
import { getLocales } from "expo-localization"
import React from 'react';

//create a context, with createContext api
export const userLanguageContext = createContext();

const UserLanguageProvider = (props) => {
    const [userLanguage, setUserLanguage] = useState(getLocales()[0].languageCode); /* här lägger vi till mobilens standardspråk */

    return (
                // this is the provider providing state
        <userLanguageContext.Provider 
        value={[userLanguage, setUserLanguage]}>
            {props.children}
        </userLanguageContext.Provider>
    );
};

export default UserLanguageProvider;
