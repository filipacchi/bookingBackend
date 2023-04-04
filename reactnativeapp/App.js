import * as React from "react"
import { Text, View } from "react-native"

// dessa ska då inte behövas...
import Splash from "./src/screens/Splash"
import Booking from "./src/screens/Booking";
import Nav from "./src/screens/Nav";
import Login from "./src/screens/Login";


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