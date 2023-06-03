import { StyleSheet, View, Text, TouchableOpacity, Linking } from "react-native"
import React from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { TextInput } from "react-native-paper";
import { AuthContext } from "../../auth/UserContextProvider";
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from "react-native";
import Style from "./Style";
import Checkbox from 'expo-checkbox';
import { getAllCodes, getName } from 'iso-639-1';
import { SelectList } from 'react-native-dropdown-select-list';
import { Entypo } from '@expo/vector-icons';


export default function Register() {

    const {colorTheme, authContext } = React.useContext(AuthContext);
    const { signUp, t, setLang } = authContext
    const [username, onChangeUsername] = useState("");
    const [password, onChangePassword] = useState("");
    const [passwordCheck, onChangePasswordCheck] = useState("");
    const [firstname, onChangeFirstname] = useState("");
    const [lastname, onChangeLastname] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("");


    const languageOptions = getAllCodes().map((code) => ({
        label: code,
        value: code.toUpperCase() + '   ' + getName(code),
        flag: '',
      }));
      
        const handleCheckboxChange = () => {
          setIsChecked(!isChecked);
        };
      
        const handleTermsLinkPress = () => {
          const termsURL = 'https://bookease.se/'; 
          Linking.openURL(termsURL);
        };

    function handleSignUp() {
        if (username == "" || firstname == "" || lastname == "" || password == "" || passwordCheck == "" || !isChecked) {
            console.log(selectedLanguage)
            console.log("Nåt är tomt")
        } else if (password === passwordCheck) {
            let data = { email: username, firstname: firstname, lastname: lastname, password: password, nativeLang: selectedLanguage }
            signUp(data)
            console.log(selectedLanguage)
            console.log("Lösenord ok också")

        } else {
            console.log("Lösenord stämmer ej överens")
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={-200}
            style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <LinearGradient colors={[colorTheme.firstColor, colorTheme.secondColor]} style={{ flex: 1 }}>
                    <View style={{
                        position: "absolute",
                        bottom: 150,
                        width: "100%",
                        gap: 20,
                        alignItems: "center"
                    }}>
                        <View style={Style.inputCredentials}>
                            <TextInput
                                onChangeText={onChangeUsername}
                                placeholder={t("Email")}
                                autoComplete="off"
                                autoCorrect={false}
                            />
                        </View>
                        <View style={Style.inputCredentials}>
                            <TextInput
                                onChangeText={onChangeFirstname}
                                placeholder={t("Firstname")}
                                autoComplete="off"
                                autoCorrect={false}
                            />
                        </View>
                        <View style={Style.inputCredentials}>
                            <TextInput
                                onChangeText={onChangeLastname}
                                placeholder={t("Lastname")}
                                autoComplete="off"
                                autoCorrect={false}
                            />
                        </View>
                        <View style={Style.inputCredentials}>
                            <TextInput
                                onChangeText={onChangePassword}
                                placeholder={t("Password")}
                                secureTextEntry={true}
                                autoComplete="off"
                                autoCorrect={false}
                            />
                        </View>
                        <View style={Style.inputCredentials}>
                            <TextInput
                                onChangeText={onChangePasswordCheck}
                                placeholder={t("PasswordRepeat")}
                                secureTextEntry={true}
                                autoComplete="off"
                                autoCorrect={false}
                            />
                        </View>
                        <SelectList
                            //dropdownStyles
                            arrowicon={<Entypo name="chevron-down" size={15} color="grey" />}
                            boxStyles={{ height: 45, alignItems: "center", justifyContent: "space-evenly" }}
                            search={true}
                            dropdownShown={false}
                            placeholder={t("NativeLanguage")}
                            setSelected={(val) => {
                                setSelectedLanguage(val);
                            }}
                            data={languageOptions}
                            dropdownStyles={{ position: "absolute", backgroundColor: "white", width: "100%", top: 45, zIndex: 2 }}
                        />
                        <View style={{flexDirection: 'row',}}>
      <Checkbox
        value={isChecked}
        onValueChange={handleCheckboxChange}
      />
      <Text style={{ color: '#000000', flexDirection: 'row' }} onPress={handleCheckboxChange}> {t("IAgreeToThe")} </Text><TouchableOpacity onPress={handleTermsLinkPress}>
        <Text style={{ color: 'blue'}}>{t("TermsOfService")}</Text>
      </TouchableOpacity>
    </View>
                        <TouchableOpacity style={styles.input} onPress={() => { handleSignUp() }}><Text style={styles.inputText}>{t("Register")}</Text></TouchableOpacity>
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