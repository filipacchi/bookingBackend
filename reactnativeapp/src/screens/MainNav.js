
import { StyleSheet, View, Text, Pressable } from "react-native"
import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AssociationStack from "../components/Associations/AssociationStack";
import Settings from "../components/Settings/Settings";
import ScheduleStack from "../components/Schedule/ScheduleStack"
import Info from "..//components/Information/Info"
import { TabRouter } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import NavButtons from "../screens/NavButtons"
import { LinearGradient } from "expo-linear-gradient";
import { Header } from "@react-navigation/native";
import AdminStart from "./AdminStart";
import { AuthContext } from "../../auth/UserContextProvider";
import SettingStack from "../components/Settings/SettingStack";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

export default function MainNav() {
    const {tabTitles, authContext, colorTheme} = React.useContext(AuthContext)
    const {signOut, t, setLang, getLang} = authContext


    return (
        <Tab.Navigator
        screenOptions={{
            
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
                }
        }}>
            <Tab.Screen name={tabTitles.AssociationsPage} component={AssociationStack} options={{
                    tabBarIcon: ({ focused, color }) => {
                        if(focused){
                            return <Ionicons name="ios-home" size={24} color={color} />
                        }else {
                            return <Ionicons name="ios-home-outline" size={24} color={color} />
                        }
                    }
                }} />
           {/*  <Tab.Screen name="Info" component={NavButtons} options={{
                tabBarIcon: ({ focused, color }) => (
                    <Ionicons focused={focused} name="chatbubble-outline" size={28} color={color} />
                )
<<<<<<< HEAD
            }} /> */}
    
            <Tab.Screen name={tabTitles.Bookings} component={ScheduleStack} options={{

                tabBarIcon: ({ focused, color }) => {
                    if(focused){
                        return <MaterialCommunityIcons name="calendar-month" size={24} color={color} />
                    }else {
                        return <MaterialCommunityIcons name="calendar-month-outline" size={24} color={color} />
                    }
                }
            }} />

            <Tab.Screen name={tabTitles.Profile} component={SettingStack} options={{
                tabBarIcon: ({ focused, color }) => {
                    if(focused){
                        return <FontAwesome name="user" size={27} color={color} />
                    }else {
                        return <FontAwesome name="user-o" size={24} color={color} />
                    }
                }, 
                headerShown: false
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