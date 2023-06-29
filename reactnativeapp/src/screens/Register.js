import { StyleSheet, View, Text, TouchableOpacity, Linking } from "react-native"
import React, { useContext } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { AuthContext } from "../../auth/UserContextProvider";
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from "react-native";
import Style from "./Style";
import Checkbox from 'expo-checkbox';
import { getAllCodes, getName } from 'iso-639-1';
import { SelectList } from 'react-native-dropdown-select-list';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


export default function Register() {


    const navigation = useNavigation()
    const { colorTheme, authContext } = React.useContext(AuthContext);
    const { signUp, t, setLang } = authContext
    const [username, onChangeUsername] = useState("");
    const [password, onChangePassword] = useState("");
    const [passwordCheck, onChangePasswordCheck] = useState("");
    const [firstname, onChangeFirstname] = useState("");
    const [lastname, onChangeLastname] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [isLoading, setIsLoading] = useState(false)


    const languageOptions = getAllCodes().map((code) => ({
        label: code,
        value: code.toUpperCase() + '   ' + getName(code),
        flag: '',
    }));

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleTermsLinkPress = () => {
        const termsURL = 'https://bookease.se/app/termsofservice';
        Linking.openURL(termsURL);
    };

    async function handleSignUp() {
        if (username == "" || firstname == "" || lastname == "" || password == "" || passwordCheck == "" || !isChecked) {


        } else if (password === passwordCheck) {
            setIsLoading(true)
            let data = { email: username, firstname: firstname, lastname: lastname, password: password, nativeLang: selectedLanguage }
            let response = await signUp(data)
            setIsLoading(false)
            if(response) {
                navigation.navigate("ConfirmationCode", {email: username})
            }
            console.log(response)



        } else {

        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={-200} /* att ta bort denna gör  */
            style={{ flex: 1 }}>
                
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <LinearGradient colors={[colorTheme.firstColor, colorTheme.secondColor]} style={{ flex: 1 }}>
                    <View style={{
                        position: "absolute",
                        bottom: 150,
                        width: "100%",
                        gap: 20,
                        alignItems: "center",
                        flexDirection: "column-reverse"
                    }}>
                        <TouchableOpacity style={styles.input} onPress={() => { handleSignUp() }}>
                            {isLoading ? <ActivityIndicator></ActivityIndicator> : <Text style={styles.inputText}>{t("Register")}</Text>}
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row' }}>
                            <Checkbox
                                value={isChecked}
                                onValueChange={handleCheckboxChange}
                            />
                            <Text style={{ color: '#000000', flexDirection: 'row' }} onPress={handleCheckboxChange}>
                                {t("IAgreeToThe")}
                            </Text>
                            <TouchableOpacity onPress={handleTermsLinkPress}>
                                <Text style={{ color: 'blue' }}>{t("TermsOfService")}</Text>
                            </TouchableOpacity>
                        </View>

                        <SelectList
                            //dropdownStyles
                            arrowicon={<Entypo name="chevron-down" size={15} color="grey" />}
                            boxStyles={{ height: 45, alignItems: "center", justifyContent: "space-evenly", width: '50%', backgroundColor: "white" }}
                            search={true}
                            dropdownShown={false}
                            placeholder={t("NativeLanguage")}
                            setSelected={(val) => {
                                setSelectedLanguage(val);
                            }}
                            data={languageOptions}
                            dropdownStyles={{ position: "absolute", backgroundColor: "white", width: "50%", top: 45 }}
                        />

                        <View style={Style.inputCredentials}>
                            <TextInput
                                style={{ backgroundColor: "white" }}
                                onChangeText={onChangePasswordCheck}
                                placeholder={t("PasswordRepeat")}
                                secureTextEntry={true}
                                autoComplete="off"
                                autoCorrect={false}
                            />
                        </View>

                        <View style={Style.inputCredentials}>
                            <TextInput
                                style={{ backgroundColor: "white" }}
                                onChangeText={onChangePassword}
                                placeholder={t("Password")}
                                secureTextEntry={true}
                                autoComplete="off"
                                autoCorrect={false}
                            />
                        </View>

                        <View style={Style.inputCredentials}>
                            <TextInput
                                style={{ backgroundColor: "white" }}
                                onChangeText={onChangeLastname}
                                placeholder={t("Lastname")}
                                autoComplete="off"
                                autoCorrect={false}
                            />
                        </View>

                        <View style={Style.inputCredentials}>
                            <TextInput
                                style={{ backgroundColor: "white" }}
                                onChangeText={onChangeFirstname}
                                placeholder={t("Firstname")}
                                autoComplete="off"
                                autoCorrect={false}
                            />
                        </View>

                        <View style={Style.inputCredentials}>
                            <TextInput
                                style={{ backgroundColor: "white" }}
                                onChangeText={onChangeUsername}
                                placeholder={t("Email")}
                                autoComplete="off"
                                autoCorrect={false}
                            />
                        </View>
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
        height: 50,
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