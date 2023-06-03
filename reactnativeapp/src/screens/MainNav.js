
import { StyleSheet } from "react-native"
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AssociationStack from "../components/Associations/AssociationStack";
import ScheduleStack from "../components/Schedule/ScheduleStack"
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from "../../auth/UserContextProvider";
import SettingStack from "../components/Settings/SettingStack";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

export default function MainNav() {
    const { tabTitles, authContext, colorTheme } = React.useContext(AuthContext)


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
                },
                headerTitleAlign: "center",
            }}>
            <Tab.Screen name="AssociationNav" component={AssociationStack} options={{
                headerShown: false,
                tabBarLabel: tabTitles.AssociationsPage,
                tabBarIcon: ({ focused, color }) => {
                    if (focused) {
                        return <Ionicons name="ios-home" size={24} color={color} />
                    } else {
                        return <Ionicons name="ios-home-outline" size={24} color={color} />
                    }
                }
            }} />

            <Tab.Screen name="ScheduleNav" component={ScheduleStack} options={{
                tabBarLabel: tabTitles.Bookings,
                headerTitle:tabTitles.Bookings,
                tabBarIcon: ({ focused, color }) => {
                    if (focused) {
                        return <MaterialCommunityIcons name="calendar-month" size={24} color={color} />
                    } else {
                        return <MaterialCommunityIcons name="calendar-month-outline" size={24} color={color} />
                    }
                }
            }} />

            <Tab.Screen name="Profile" component={SettingStack} options={{
                tabBarLabel: tabTitles.Profile,
                tabBarIcon: ({ focused, color }) => {
                    if (focused) {
                        return <FontAwesome name="user" size={27} color={color} />
                    } else {
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