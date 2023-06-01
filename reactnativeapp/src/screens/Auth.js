import { StyleSheet, View, Text, Pressable, PermissionsAndroid,TouchableOpacity } from "react-native"
import { Card } from "react-native-paper"
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { useState, setState, useContext } from "react";
import { TextInput } from "react-native-paper";
import { AuthContext } from "../../auth/UserContextProvider";
import Logo from "../components/assets/Logo";
import Style from "./Style";
import LoginComp from "./LoginComp";
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, Platform } from "react-native";
import { Linking } from "react-native";
import axios from "../../axios/axios";


import { useNavigation } from "@react-navigation/native";
import { color } from "react-native-reanimated";

export default function Auth() {
    const navigation = useNavigation()
    const { authContext, colorTheme } = useContext(AuthContext)
    const { t, setLang, getLang } = authContext
    const [lang, setLanguage] = useState(getLang())
    const [isLoginDisplayed, setIsLoginDisplayed] = React.useState(false);
    const [isRegisterDisplayed, setIsDisplayed] = React.useState(false);
    const resetUrl = axios.defaults.baseURL + "/accounts/password-reset/"
    function changeLang() {
        console.log("KlickarBenim")
        if (lang == "en") {
            setLang("sv")
            setLanguage("sv")
        } else {
            setLang("en")
            setLanguage("en")
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={-200}
            >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <LinearGradient colors={[colorTheme.firstColor, colorTheme.secondColor]} style={{ flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity style={Style.langSwitchBox} onPress={() => changeLang()}><Text style={Style.langText}>{lang.toUpperCase()}</Text></TouchableOpacity>
                    <View style={{ marginTop: "50%" }}><Logo></Logo></View>
                    <View style={{
                        position: "absolute",
                        bottom: 150,
                        width: "100%",
                        gap: 20
                    }}>
                        {isLoginDisplayed ?
                            <View>
                                <LoginComp />
                                <TouchableOpacity style={[styles.back]} onPress={() => { Linking.openURL(resetUrl) }}><Text style={[styles.inputText, styles.login]}>{t("ResetPassword")}</Text></TouchableOpacity>
                                <TouchableOpacity style={[styles.back]} onPress={() => { setIsLoginDisplayed(false) }}><Text style={[styles.inputText, styles.login]}>{t("Return")}</Text></TouchableOpacity>
                            </View>
                            :
                            <View style={{gap: 10}}>
                                <TouchableOpacity style={[styles.input, styles.presslogin]} onPress={() => { setIsLoginDisplayed(true) }}><Text style={[styles.inputText, styles.login]}>{t("Login")}</Text></TouchableOpacity>
                                <TouchableOpacity style={[styles.input, styles.presslogin]} onPress={() => { navigation.navigate('Register') }}><AntDesign name="adduser" size={20} color="white" /><Text style={styles.inputText}>{t("CreateAccount")}</Text></TouchableOpacity>
                            </View>
                        }
                        {/* {isToasterDisplayed && <LoginComp />}
                        {isToasterDisplayed && <TouchableOpacity style={[styles.back]} onPress={() => { setIsToasterDisplayed(false) }}><Text style={[styles.inputText, styles.login]}>{t("Return")}</Text></TouchableOpacity>}
                        {!isToasterDisplayed && <TouchableOpacity style={[styles.input, styles.presslogin]} onPress={() => { setIsToasterDisplayed(true) }}><Text style={[styles.inputText, styles.login]}>{t("Login")}</Text></TouchableOpacity>}
                        {!isToasterDisplayed && <TouchableOpacity style={[styles.input, styles.presslogin]} onPress={() => { navigation.navigate('Register') }}><AntDesign name="adduser" size={20} color="white" /><Text style={styles.inputText}>{t("CreateAccount")}</Text></TouchableOpacity>} */}
                    </View>
                </LinearGradient>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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
    },
    back: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "5%"
    }

})