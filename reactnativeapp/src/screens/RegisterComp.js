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


export default function RegisterComp() {

    const navigation = useNavigation()

    const { authContext } = React.useContext(AuthContext);
    const { signUp, t, setLang } = authContext
    const [username, onChangeUsername] = useState("");
    const [password, onChangePassword] = useState("");
    const [passwordCheck, onChangePasswordCheck] = useState("");
    const [firstname, onChangeFirstname] = useState("");
    const [lastname, onChangeLastname] = useState("");


    function handleSignUp() {
        if (username == "" || firstname == "" || lastname == "" || password == "" || passwordCheck == "") {
            console.log("Nåt är tomt")
        } else if (password === passwordCheck) {
            let data = { email: username, firstname: firstname, lastname: lastname, password: password }
            signUp(data)
            console.log("Lösenord ok också")

        } else {
            console.log("Lösenord stämmer ej överens")
        }
    }

    return (
        <View style={{
            position: "absolute",
            bottom: 150,
            width: "100%",
            gap: 20
        }}>
            <View style={styles.inputCredentials}>
            <TextInput
                onChangeText={onChangeUsername}
                placeholder={t("Email")}
                autoComplete="off"
                autoCorrect={false}
            />
            </View>
            <View style={styles.inputCredentials}>
            <TextInput
                onChangeText={onChangeFirstname}
                placeholder={t("Firstname")}
                autoComplete="off"
                autoCorrect={false}
            />
            </View>
            <View style={styles.inputCredentials}>
            <TextInput
                onChangeText={onChangeLastname}
                placeholder={t("Lastname")}
                autoComplete="off"
                autoCorrect={false}
            />
            </View>
            <View style={styles.inputCredentials}>
            <TextInput
                onChangeText={onChangePassword}
                placeholder={t("Password")}
                secureTextEntry={true}
                autoComplete="off"
                autoCorrect={false}
            />
            </View>
            <View style={styles.inputCredentials}>
            <TextInput
                onChangeText={onChangePasswordCheck}
                placeholder={t("PasswordRepeat")}
                secureTextEntry={true}
                autoComplete="off"
                autoCorrect={false}
            />
            </View>
            <TouchableOpacity style={styles.input} onPress={() => { handleSignUp() }}><Text style={styles.inputText}>Register</Text></TouchableOpacity>
        </View>
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