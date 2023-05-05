import { StyleSheet, View, Text, Pressable, PermissionsAndroid } from "react-native"
import { Card } from "react-native-paper"
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { useState, setState } from "react";
import { TextInput } from "react-native-paper";
import { AuthContext } from "../../auth/UserContextProvider";
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated,{FadeInLeft, FadeInUp,FadeOut,FadeOutUp} from 'react-native-reanimated'



export default function LoginComp() {

    const navigation = useNavigation()

    const { authContext } = React.useContext(AuthContext);
    const { signIn, t, setLang } = authContext
    const [username, onChangeUsername] = useState("Email");
    const [password, onChangePassword] = useState("Password");
    const [lang, setLanguage] = useState("")


    function handleRequest() {
        signIn({ username, password })
    }

    function changeLang(lang) {
        setLang(lang)
        setLanguage(lang)
    }

    return (
        <Animated.View
            entering={FadeInUp}
            exiting={FadeOut}
            style={{
                padding: 20,
                alignItems: "center",
                borderRadius: 8,
                gap: 20,
            }}
        >
            <View style={styles.inputCredentials}>
            <TextInput
                style={{}}
                onChangeText={onChangeUsername}
                placeholder={username}
                autoComplete="off"
                autoCorrect={false}
            />
            </View>
            <View style={styles.inputCredentials}>
            <TextInput
                style={{}}
                onChangeText={onChangePassword}
                placeholder={password}
                secureTextEntry={true}
                autoComplete="off"
                autoCorrect={false}
            />
            </View>
            <Pressable style={styles.input} onPress={() => { handleRequest() }}><Text style={styles.inputText}>{t("Login")}</Text></Pressable>
            </Animated.View>
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
        overflow: "hidden",
        width: "70%",
        height: 50,
        borderRadius: 10,
        justifyContent: "center"
    }

})