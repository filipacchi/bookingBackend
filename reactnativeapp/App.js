import * as React from "react"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from "./auth/UserContextProvider";
import { UserContextProvider } from "./auth/UserContextProvider";
import Auth from "./src/screens/Auth";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import MainNav from "./src/screens/MainNav";
import Nav from "./src/screens/Nav";
import AppStack from "./navigation/Stack";


import * as SecureStore from 'expo-secure-store';

import { useContext } from "react";
import { userLanguageContext } from "./language/languageContext";


export default function App() {

  //const [isLoading, setIsLoading] = React.useState(true);
  //return isLoading ? <Splash setIsLoading={setIsLoading}/> : <Home/> 
  const Stack = createNativeStackNavigator();
  //const { getLang } = useContext(AuthContext)
  const state = true
  return (
    <UserContextProvider>
        <AppStack/>
      </UserContextProvider>
    //<UserLanguageProvider>
    //</UserLanguageProvider>
    //<Booking></Booking>
    // <Login></Login>
    //<Nav></Nav>
  )
}