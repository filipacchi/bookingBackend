import * as React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserContextProvider } from "./auth/UserContextProvider";
import AppStack from "./navigation/Stack";
import 'react-native-reanimated'
import 'react-native-gesture-handler'
import * as SplashScreen from "expo-splash-screen";
import Splash from "./src/screens/Splash";
import { useState, useCallback } from "react";
import { View } from "react-native";
import { GlobalProvider } from "reactnativeapp/GlobalContext.js";

//SplashScreen.preventAutoHideAsync().catch(() => {
/* reloading the app might trigger some race conditions, ignore them */
//});

export default function App() {

  return (
    <UserContextProvider>
      <GlobalProvider>
      <AppStack />
      </GlobalProvider>
    </UserContextProvider>
  )

}