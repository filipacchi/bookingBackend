import * as React from "react"
import { Text, View } from "react-native"
import UserLanguageProvider from "./language/LanguageContext"

// ...fortsätter
import AppStack from "./navigation/AppStack"
import User from "./src/screens/User"

export default function App() {
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