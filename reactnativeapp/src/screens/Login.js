import { StyleSheet, View, Text, Pressable, PermissionsAndroid } from "react-native"
import { Card } from "react-native-paper"
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";

export default function Login() {


    return (
        <LinearGradient colors={["#53d5d5", "#2f9d9d"]} style={{ flex: 1 }}>
            <View style={{
                position: "absolute",
                bottom: 150,
                width: "100%",
                gap: 20
            }}>
                <View style={styles.input}><Text style={styles.inputText}>Logga in</Text></View>
                <View style={styles.input}><AntDesign name="adduser" size={20} color="white" /><Text style={styles.inputText}>Skapa konto</Text></View>
            </View>
        </LinearGradient>
    )

}


const styles = StyleSheet.create({
    input: {
        width: "70%",
        height: "auto",
        borderRadius: 10,
        borderColor: "white",
        borderStyle: "solid",
        justifyContent: "center",
        borderWidth: 2,
        alignItems: "center",
        alignSelf: "center",
        padding: 15,
        flexDirection: "row",
        gap: 10
    },
    inputText: {
        color: "white",
        fontWeight: 600
    }

})