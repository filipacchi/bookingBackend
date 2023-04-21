import { StyleSheet, View, Text, Pressable, PermissionsAndroid } from "react-native"
import { Card } from "react-native-paper"
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { useState, setState, useContext } from "react";
import { TextInput } from "react-native-paper";
import { AuthContext } from "../../navigation/AppStack";
import Logo from "../components/assets/Logo";

import { useNavigation } from "@react-navigation/native";


export default function Auth() {
    const navigation = useNavigation()
    const {t} = useContext(AuthContext)
    return (
        <LinearGradient colors={["#53d5d5", "#2f9d9d"]} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Logo></Logo>
            <View style={{
                position: "absolute",
                bottom: 150,
                width: "100%",
                gap: 20
            }}> 
                <Pressable style={[styles.input, styles.presslogin]} onPress={() => {navigation.navigate('Login') }}><Text style={[styles.inputText, styles.login]}>{t("Login")}</Text></Pressable>
                <Pressable style={[styles.input, styles.presslogin]} onPress={() => {navigation.navigate('Register') }}><AntDesign name="adduser" size={20} color="white" /><Text style={styles.inputText}>{t("CreateAccount")}</Text></Pressable>
            </View>
        </LinearGradient>
    )

}


const styles = StyleSheet.create({
    input: {
        width: "70%",
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
    },
    inputCredentials: {
        width: "70%",
        height: 30,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        padding: 15,
        flexDirection: "row",
        gap: 10
    }

})