
import { StyleSheet, View, Text, Pressable } from "react-native"
import { Card } from "react-native-paper"
import React from 'react';
import { useState, useEffect } from "react";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
//import Booking from "./Booking";
import Login from "./Login";
import { useNavigation } from "@react-navigation/native";
import Book from "./Book";
import JoinAssociations from "./JoinAssociations";
import Associations from "./Associations";

export default function Nav() {

    /* const navigation = useNavigation(); */

    const initialColorValues = {
        washC: "#999999",
        homeC: "#999999",
        calendarC: "#999999",
        userC: "#999999"
    }
    const [colorValues, setColor] = useState(initialColorValues);

    const [currentView, setCurrentView] = useState("") /* Byt till "Home" */

    function MainWindow() {
        
        if (currentView == "") {return (<View style={styles.main}/>) 
        } else if (currentView == "JoinAssociations") {return (<JoinAssociations/>)
        } else if (currentView == "Login") {return (<Login/>)
        } else if (currentView == "Book") {return (<Book/>)
        } else if (currentView == "Booking") {return (<Book/>)
        } else if (currentView == "Associations") {return (<Associations/>)
        }
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={styles.topBar}>
                <LinearGradient colors={["#2f9d9d", "#53d5d5"]} start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }} style={{ flex: 1 }}></LinearGradient>
            </View>

            <MainWindow language={lang}></MainWindow>

            <View style={styles.navMenu}>
{/*                 <Pressable style={styles.navButtons} onPress={() => {setColor({colorValues, washC:"#2f9d9d", homeC:"#999999", calendarC:"#999999", userC:"#999999" }), navigation.navigate('Book')}}>
                    <MaterialCommunityIcons name="washing-machine" size={28} color={colorValues.washC} style={styles.icon} />
                    <Text style={styles.navText}>Tvätta</Text>
                </Pressable> ---- HÄR MECKAR KARL ---- */}
                <Pressable style={styles.navButtons} onPress={() => {setColor({colorValues, washC:"#2f9d9d", homeC:"#999999", calendarC:"#999999", userC:"#999999" }), setCurrentView("JoinAssociations")}}>
                    <MaterialCommunityIcons name="washing-machine" size={28} color={colorValues.washC} style={styles.icon} />
                    <Text style={styles.navText}>JoinAssociations</Text>
                </Pressable>



                <Pressable style={styles.navButtons} onPress={() => {setColor({colorValues, homeC:"#2f9d9d", washC: "#999999",  calendarC:"#999999", userC:"#999999"}), setCurrentView('Associations')}}>
                    <AntDesign name="home" size={28} color={colorValues.homeC} style={styles.icon} />
                    <Text style={styles.navText}>Föreningar</Text>
                </Pressable>
                <Pressable style={styles.navButtons} onPress={() => {setColor({colorValues, calendarC:"#2f9d9d", washC: "#999999", homeC:"#999999", userC:"#999999"}), setCurrentView('Booking')}}>
                    <AntDesign name="calendar" size={28} color={colorValues.calendarC} style={styles.icon} />
                    <Text style={styles.navText}>Bokningar</Text>
                </Pressable>
                <Pressable style={styles.navButtons} onPress={() => {setColor({colorValues, userC:"#2f9d9d", washC: "#999999", homeC:"#999999", calendarC:"#999999"}), setCurrentView('Login')}}>
                    <AntDesign name="user" size={28} color={colorValues.userC} style={styles.icon} />
                    <Text style={styles.navText}>Profil</Text>
                </Pressable>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topBar: {
        backgroundColor: "#2f9d9d",
        width: "100%",
        height: "12%",
    },
    navMenu: {
        backgroundColor: "#fff",
        width: "100%",
        height: "12%",
        flexDirection: 'row',
        justifyContent: "space-around",
        paddingTop: 15,
        paddingBottom: 15
    },
    main: {
        flex: 1,
        backgroundColor: "#EAEAEA"
    },
    navButtons: {
        alignItems: "center",
        width: 70
    },
    navText: {
        textAlign: "center",
        marginTop: 10,
        fontSize: 12,
        /* fontFamily: "DamascusBold", ej i Android */
        
        color: "#999999"
    },
    icon: {
        width: 28,
    }
});