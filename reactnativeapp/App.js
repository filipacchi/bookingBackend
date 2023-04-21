import * as React from "react"
import { Text, View } from "react-native"
//import UserLanguageProvider from "./language/languageContext"
import * as en from "reactnativeapp/language/lang-en.json"
import * as sv from "reactnativeapp/language/lang-sv.json"
// ...fortsätter
import AppStack from "./navigation/AppStack"
import User from "./src/screens/User"
import { translations } from "./language/localizations"
import { useState } from "react"

import {getLocales} from "expo-localization"

export default function App() {
  
//const [isLoading, setIsLoading] = React.useState(true);
//return isLoading ? <Splash setIsLoading={setIsLoading}/> : <Home/> 

  return (

    //<UserLanguageProvider>
      <AppStack />
    //</UserLanguageProvider>
    //<Booking></Booking>
    // <Login></Login>
    //<Nav></Nav>
  )
}