import * as React from "react"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from "./Settings";
import SettingsNav from "./SettingsNav";
import { AuthContext } from "../../../auth/UserContextProvider";





import * as SecureStore from 'expo-secure-store';

import { useContext } from "react";
import { color } from "react-native-reanimated";


export default function SettingStack() {
    const { colorTheme, setColorTheme, state, authContext } = React.useContext(AuthContext);
    const {t} = authContext
    const SettingStack = createNativeStackNavigator();
    return (

        <SettingStack.Navigator screenOptions={{

        }}>
            <SettingStack.Screen name="SettingsNav" component={SettingsNav} options={{

                tabBarActiveTintColor: colorTheme.firstColor,//"#577ac2",
                tabBarStyle: {
                    height: 90,
                    padding: 10
                },
                headerStyle: {
                    backgroundColor: colorTheme.firstColor//"#8AAAE5"
                },
                headerTitleStyle: {
                    color: 'white'
                },
                headerTitle: t("Profile")
            }} />
            <SettingStack.Screen name="Settings" component={Settings} options={{ headerTitle: "", headerStyle: { backgroundColor: colorTheme.firstColor }, headerTintColor: "white"}} />

        </SettingStack.Navigator>

    )
}