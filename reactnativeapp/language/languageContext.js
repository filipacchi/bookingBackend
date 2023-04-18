import { createContext, useState} from 'react';

export const userLanguageContext = createContext();

const userLanguageProvider = (props) => {
    const [userLanguage, setUserLanguage] = useState();

    return (
        <userLanguageContext.Provider value={[userLanguage, setUserLanguage]}>
            {props.children}
        </userLanguageContext.Provider>
    )
}

export default userLanguageProvider;