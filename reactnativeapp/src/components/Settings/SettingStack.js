import * as React from "react"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from "./Settings";
import SettingsNav from "./SettingsNav";
import { AuthContext } from "../../../auth/UserContextProvider";
import { Text } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import Information from "./Information";



import * as SecureStore from 'expo-secure-store';

import { useContext } from "react";
import { color } from "react-native-reanimated";
import { TouchableOpacity } from "react-native";


export default function SettingStack() {
    const nav = useNavigation()
    const { tabTitles, colorTheme, setColorTheme, state, authContext } = React.useContext(AuthContext);
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
                headerBackTitleVisible: false,
                headerTitle: tabTitles.Profile,
                headerTitleAlign: "center",
            }} />
            <SettingStack.Screen name="Settings" component={Settings} options={{headerBackTitle: "TILLBAKA", headerTitle: "", headerStyle: { backgroundColor: colorTheme.firstColor }, headerTintColor: "white", headerLeft: () => <TouchableOpacity onPress={()=> nav.navigate("SettingsNav")} style={{flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10}}><AntDesign name="left" size={20} color="white" /><Text style={{color: "white"}}>{tabTitles.Return}</Text></TouchableOpacity>,}} />
            <SettingStack.Screen name="Information" component={Information} options={{headerBackTitle: "TILLBAKA", headerTitle: "", headerStyle: { backgroundColor: colorTheme.firstColor }, headerTintColor: "white", headerLeft: () => <TouchableOpacity onPress={()=> nav.navigate("SettingsNav")} style={{flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10}}><AntDesign name="left" size={20} color="white" /><Text style={{color: "white"}}>{tabTitles.Return}</Text></TouchableOpacity>,}} />
        </SettingStack.Navigator>

    )
}