import { createContext, useState } from 'react';

//create a context, with createContext api
export const userLanguageContext = createContext();

const UserLanguageProvider = (props) => {
        // this state will be shared with all components 
    const [userLanguage, setUserLanguage] = useState("swe"); /* här lägger vi till mobilens standardspråk */
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