
import { StyleSheet, View, Text, Pressable } from "react-native"
import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AssociationStack from "../components/Associations/AssociationStack";
import Settings from "../components/Settings/Settings";
import Schedule from "../components/Schedule/Schedule"
import Info from "..//components/Information/Info"
import { TabRouter } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import NavButtons from "../screens/NavButtons"
import { LinearGradient } from "expo-linear-gradient";
import { Header } from "@react-navigation/native";
import AdminStart from "./AdminStart";
import { AuthContext } from "../../auth/UserContextProvider";

const Tab = createBottomTabNavigator();

export default function MainNav() {
    const {authContext} = React.useContext(AuthContext)
    const { signOut, t, setLang, getLang } = authContext
    const {state}= useContext(AuthContext)

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "#2f9d9d",
                tabBarStyle: {
                    height: 90,
                    padding: 10
                },
                headerStyle: {
                    backgroundColor: "white"
                }

            }}>
            <Tab.Screen name={t("AssociationsPage")} component={AssociationStack} options={{
                    tabBarIcon: ({ focused, color }) => (
                        <AntDesign focused={focused} name="home" size={25} color={color} />
                    )
                }} />
            <Tab.Screen name="Info" component={NavButtons} options={{
                tabBarIcon: ({ focused, color }) => (
                    <Ionicons focused={focused} name="chatbubble-outline" size={28} color={color} />
                )
            }} />
            <Tab.Screen name="Schedule" component={Schedule} options={{
                tabBarIcon: ({ focused, color }) => (
                    <AntDesign focused={focused} name="calendar" size={28} color={color} />
                )
            }} />

            <Tab.Screen name="Settings" component={Settings} options={{
                tabBarIcon: ({ focused, color }) => (
                    <AntDesign focused={focused} name="user" size={25} color={color} />
                )
            }} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    text: {
        marginTop: 100,
        backgroundColor: "red"
    }
});