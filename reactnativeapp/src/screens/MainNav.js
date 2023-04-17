
import { StyleSheet, View, Text, Pressable } from "react-native"
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Associations from "../components/Associations/Associations";
import Settings from "../components/Settings/Settings";
import Schedule from "../components/Schedule/Schedule"
import Info from "..//components/Information/Info"
import { AuthContext } from "../../App";
import { TabRouter } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();

export default function MainNav({route}) {

    console.log(route.params.stateValue)
    const state = route.params.stateValue
    
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "#2f9d9d"
            }}
        >
            <Tab.Screen name="Associations" component={Associations} options={{tabBarIcon:({focused})=>(  
              <AntDesign name="home" size={25} color={this.tabBarActiveTintColor}/>
          )  }} />
                <Tab.Screen name="Info" component={Info} options={{tabBarIcon:({tintColor})=>(  
                  <Ionicons name="chatbubble-outline" size={25} color={tintColor} />
              )  }}/>
            <Tab.Screen name="Schedule" component={Schedule} options={{tabBarIcon:({tintColor})=>(  
              <AntDesign name="calendar" size={25} color={tintColor}/>
          )  }}/>
          
            <Tab.Screen name="Settings" component={Settings} options={{tabBarIcon:({tintColor})=>(  
              <AntDesign name="user" size={25} color={tintColor}/>
          )  }}/>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    text: {
        marginTop: 100,
        backgroundColor: "red"
    }
});