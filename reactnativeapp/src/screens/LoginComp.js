import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import React from 'react';
import { useState } from "react";
import { TextInput } from "react-native-paper";
import { AuthContext } from "../../auth/UserContextProvider";
import Animated,{FadeInUp,FadeOut} from 'react-native-reanimated'



export default function LoginComp() {

    const { authContext } = React.useContext(AuthContext);
    const { signIn, t, setLang } = authContext
    const [username, onChangeUsername] = useState("Email");
    const [password, onChangePassword] = useState("Password");
    const [lang, setLanguage] = useState("")


    function handleRequest() {
        console.log('KLICKAD')
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
            <TouchableOpacity style={styles.input} onPress={() => { handleRequest() }}><Text style={styles.inputText}>{t("Login")}</Text></TouchableOpacity>
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