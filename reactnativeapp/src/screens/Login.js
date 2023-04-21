import { StyleSheet, View, Text, Pressable, PermissionsAndroid } from "react-native"
import { Card } from "react-native-paper"
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { useState, setState } from "react";
import { TextInput } from "react-native-paper";
import { AuthContext } from "../../navigation/AppStack";
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function Login() {

    const navigation = useNavigation()

    const { signIn, t, setLang } = React.useContext(AuthContext);
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
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <LinearGradient colors={["#53d5d5", "#2f9d9d"]} style={{ flex: 1 }}>
                    <View style={{
                        position: "absolute",
                        bottom: 150,
                        width: "100%",
                        gap: 20
                    }}>
                        <Text style={styles.inputCredentials}>{t("Settings")}</Text>
                        <TextInput
                            style={styles.inputCredentials}
                            onChangeText={onChangeUsername}
                            placeholder={username}
                            autoComplete="off"
                            autoCorrect={false}
                        />
                        <TextInput
                            style={styles.inputCredentials}
                            onChangeText={onChangePassword}
                            placeholder={password}
                            secureTextEntry = {true}
                            autoComplete="off"
                            autoCorrect={false}
                        />
                        <Pressable style={styles.input} onPress={() => { changeLang("sv") }}><Text style={styles.inputText}>Logga in</Text></Pressable>
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
    }

})