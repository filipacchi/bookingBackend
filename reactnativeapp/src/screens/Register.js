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


export default function Register() {

    const navigation = useNavigation()

    const { signIn, t, setLang } = React.useContext(AuthContext);
    const [username, onChangeUsername] = useState("Email");
    const [password, onChangePassword] = useState("Password");



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
                            secureTextEntry={true}
                            autoComplete="off"
                            autoCorrect={false}
                        />
                        <Pressable style={styles.input} onPress={() => { console.log("Klickish") }}><Text style={styles.inputText}>Register</Text></Pressable>
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