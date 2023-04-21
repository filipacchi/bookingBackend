import * as React from "react"
import { Text, View } from "react-native"
import UserLanguageProvider from 'reactnativeapp/language/languageContext.js'

// ...fortsätter
import AppStack from "./navigation/AppStack"
import User from "./src/screens/User"
// import {translations} from "reactnativeapp\language\localizations.js"
// import { useState } from "react"
// import { I18n } from "i18n-js";
// import { Localization } from "expo-localization"

export default function App() {
  // const [locale, setLocale] = useState(Localization.locale);
  // const i18n = new I18n(translations)
//const [isLoading, setIsLoading] = React.useState(true);
//return isLoading ? <Splash setIsLoading={setIsLoading}/> : <Home/> 

  return (

    <UserLanguageProvider>
      <AppStack />
    </UserLanguageProvider>
    //<Booking></Booking>
    // <Login></Login>
    //<Nav></Nav>
  )
}