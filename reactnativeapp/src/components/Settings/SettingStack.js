import * as React from "react"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from "./Settings";
import SettingsNav from "./SettingsNav";





import * as SecureStore from 'expo-secure-store';

import { useContext } from "react";


export default function SettingStack() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>

            <Stack.Navigator screenOptions={{

            }}>
                <Stack.Screen name="SettingsNav" component={SettingsNav} />
                <Stack.Screen name="Settings" component={Settings} />

            </Stack.Navigator>

        </NavigationContainer>
    )
}