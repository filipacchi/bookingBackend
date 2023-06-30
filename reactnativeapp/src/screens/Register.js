import { StyleSheet, View, Text, TouchableOpacity, Linking, SafeAreaView, Dimensions } from "react-native"
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useHeaderHeight } from '@react-navigation/elements'


export default function Register() {

    const height = useHeaderHeight()
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
            if (response) {
                navigation.navigate("ConfirmationCode", { email: username })
            }
            console.log(response)



        } else {

        }
    }

    return (
        <LinearGradient colors={[colorTheme.firstColor, colorTheme.secondColor]} style={{ minHeight: Math.round(Dimensions.get('window').height) }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1, height: "100%", width: "100%" }}>
                <SafeAreaView style={{ flex: 1, width: "100%", alignItems: "center" }}>
                    {/* <KeyboardAvoidingView style={{ flex: 1, alignItems: "center",height: "100%", position: "absolute", backgroundColor: "blue", left: 0, right: 0, justifyContent: "center" }} behavior={Platform.OS === 'ios' ? 'padding' : null}> */}
                    {/* <KeyboardAwareScrollView contentContainerStyle={{justifyContent: "center", flex: 1}} style={{backgroundColor: "red"}}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "blue" }}> */}
                    <View style={{ height: "65%", width: "80%", alignItems: "center", justifyContent: "center" }}>

                        <View style={Style.inputCredentials}>
                            <TextInput
                                style={{ backgroundColor: "white", flex: 1, justifyContent: "center" }}
                                onChangeText={onChangeUsername}
                                placeholder={t("Email")}
                                autoComplete="off"
                                autoCorrect={false}
                            />
                        </View>


                        <View style={{
                            flexDirection: "row-reverse", height: "10%", width: "100%", justifyContent: "space-evenly", marginTop: "2%",
                            marginBottom: "2%",
                        }}>
                            <View style={Style.inputCredInside}>
                                <TextInput
                                    style={{ backgroundColor: "white", flex: 1, justifyContent: "center" }}
                                    onChangeText={onChangeLastname}
                                    placeholder={t("Lastname")}
                                    autoComplete="off"
                                    autoCorrect={false}
                                />
                            </View>

                            <View style={Style.inputCredInside}>
                                <TextInput
                                    style={{ backgroundColor: "white", flex: 1, justifyContent: "center" }}
                                    onChangeText={onChangeFirstname}
                                    placeholder={t("Firstname")}
                                    autoComplete="off"
                                    autoCorrect={false}
                                />
                            </View>
                        </View>

                        <View style={Style.inputCredentials}>
                            <TextInput
                                style={{ backgroundColor: "white", flex: 1, justifyContent: "center", textAlign: "left" }}
                                onChangeText={onChangePassword}
                                placeholder={t("Password")}
                                secureTextEntry={true}
                                autoComplete="off"
                                autoCorrect={false}
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={Style.inputCredentials}>
                            <TextInput
                                style={{backgroundColor: "white", flex: 1, justifyContent: "center"}}
                                onChangeText={onChangePasswordCheck}
                                placeholder={t("PasswordRepeat")}
                                textContentType="none"
                                secureTextEntry={true}
                                autoComplete="off"
                                autoCorrect={false}
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={{ width: "65%", marginTop: "2%", height: "11%", minHeight: 45 }}>
                            <SelectList
                                //dropdownStyles
                                arrowicon={<Entypo name="chevron-down" size={15} color="grey" />}
                                boxStyles={{ borderRadius: 1000, height: "100%", alignItems: "center", justifyContent: "space-evenly", width: '100%', backgroundColor: "white", alignSelf: "center" }}
                                search={true}
                                dropdownShown={false}
                                placeholder={t("NativeLanguage")}
                                setSelected={(val) => {
                                    setSelectedLanguage(val);
                                }}
                                data={languageOptions}
                                dropdownStyles={{ position: "absolute", backgroundColor: "white", width: "100%", top: 45, zIndex: 10 }}
                            />
                        </View>
                    </View>
                    <View style={{ height: "35%", justifyContent: "center", gap: 20, alignItems: "center", width: "100%", zIndex: -1 }}>

                        <View style={{
                            flexDirection: "row", width: "100%", justifyContent: "center", alignItems: "center", zIndex: -1, gap: 5
                        }}>
                            <Checkbox
                                value={isChecked}
                                onValueChange={handleCheckboxChange}
                                style={{ zIndex: -1 }}
                            />
                            <Text style={{ zIndex: -1, color: '#000000', flexDirection: 'row' }} onPress={handleCheckboxChange}>
                                {t("IAgreeToThe")}
                            </Text>

                            <TouchableOpacity onPress={handleTermsLinkPress}>
                                <Text style={{ zIndex: -1, color: 'blue' }}>{t("TermsOfService")}</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.input} onPress={() => { handleSignUp() }}>
                            {isLoading ? <ActivityIndicator></ActivityIndicator> : <Text style={styles.inputText}>{t("Register")}</Text>}
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback >
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