import * as React from "react"
import { Text, View } from "react-native"


// ...fortsätter
import AppStack from "./navigation/AppStack"

export default function App() {
//const [isLoading, setIsLoading] = React.useState(true);
//return isLoading ? <Splash setIsLoading={setIsLoading}/> : <Home/> 
  return (

      <AppStack />

    //<Booking></Booking>
    // <Login></Login>
    //<Nav></Nav>
  )
}