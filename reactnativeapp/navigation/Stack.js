import * as React from "react"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auth from "../src/screens/Auth";
import Login from "../src/screens/Login";
import Register from "../src/screens/Register";
import MainNav from "../src/screens/MainNav";
import { AuthContext } from "../auth/UserContextProvider";
import Splash from "../src/screens/Splash";
import { useFonts } from 'expo-font';
import {
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_500Medium,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
  OpenSans_300Light_Italic,
  OpenSans_400Regular_Italic,
  OpenSans_500Medium_Italic,
  OpenSans_600SemiBold_Italic,
  OpenSans_700Bold_Italic,
  OpenSans_800ExtraBold_Italic,
} from '@expo-google-fonts/open-sans';



import { useContext } from "react";


export default function AppStack() {
  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_500Medium,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
    OpenSans_300Light_Italic,
    OpenSans_400Regular_Italic,
    OpenSans_500Medium_Italic,
    OpenSans_600SemiBold_Italic,
    OpenSans_700Bold_Italic,
    OpenSans_800ExtraBold_Italic,
  });

  const [loadingState, setLoadingState] = React.useState(true);
  //return isLoading ? <Splash setIsLoading={setIsLoading}/> : <Home/> 
  const Stack = createNativeStackNavigator();
  const { state, colorTheme } = useContext(AuthContext)

  if(loadingState){
    return(
      <Splash setLoadingState={setLoadingState}/>
    )
  }
  else

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
          <Stack.Screen name="MainNav" component={MainNav} />

        )}
      </Stack.Navigator>

    </NavigationContainer>
  )
}