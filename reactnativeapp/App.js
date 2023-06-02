import * as React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserContextProvider } from "./auth/UserContextProvider";
import AppStack from "./navigation/Stack";
import 'react-native-reanimated'
import 'react-native-gesture-handler'


export default function App() {
  const Stack = createNativeStackNavigator();
  const state = true
  return (
    <UserContextProvider>
      <AppStack/>
    </UserContextProvider>
  )
}