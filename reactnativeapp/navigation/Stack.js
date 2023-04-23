import * as React from "react"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auth from "../src/screens/Auth";
import Login from "../src/screens/Login";
import Register from "../src/screens/Register";
import MainNav from "../src/screens/MainNav";
import Nav from "../src/screens/Nav";
import { AuthContext } from "../auth/UserContextProvider";



import * as SecureStore from 'expo-secure-store';

import { useContext } from "react";


export default function AppStack() {

  //const [isLoading, setIsLoading] = React.useState(true);
  //return isLoading ? <Splash setIsLoading={setIsLoading}/> : <Home/> 
  const Stack = createNativeStackNavigator();
  const { state } = useContext(AuthContext)
  return (
      <NavigationContainer>
        
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          {state.userToken == null ? (
            <Stack.Group>
              <Stack.Screen name="Auth" component={Auth} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </Stack.Group>

          ) : (
            <Stack.Screen name="MainNav" component={MainNav}/>
  
          )}
        </Stack.Navigator>
        
      </NavigationContainer>
  )
}