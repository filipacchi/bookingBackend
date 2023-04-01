import * as React from "react"
import { Text, View } from "react-native"

// dessa ska då inte behövas...
import Splash from "./src/screens/Splash"
import Booking from "./src/screens/Booking";
import Nav from "./src/screens/Nav";
import Login from "./src/screens/Login";

// ...fortsätter
import { NavigationContainer } from "@react-navigation/native";
import { HomeStack } from "./navigation/stack";

export default function App() {
//const [isLoading, setIsLoading] = React.useState(true);
//return isLoading ? <Splash setIsLoading={setIsLoading}/> : <Home/> 
  return (

    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>

    //<Booking></Booking>
    // <Login></Login>
    //<Nav></Nav>
  )
}