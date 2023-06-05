
import { StyleSheet, View, Text, Pressable, ScrollView, Image } from "react-native"
import React, {useContext} from 'react';
import { AuthContext } from "../../../auth/UserContextProvider";
import styles from "../../screens/Style";
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import * as SecureStore from 'expo-secure-store';
import axios from "../../../axios/axios";
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Linking } from "react-native";

async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}

export default function Information() {
    const { authContext } = React.useContext(AuthContext);
    const { i18n, colorTheme, setColorTheme } = React.useContext(AuthContext);
    const { signOut, t, setLang, getLanguage } = authContext

    const handleEmailLinkPress = () => {
        const emailAddress = 'feedback@bookease.se';
        const subject = 'Feedback';
        const mailtoUrl = `mailto:${emailAddress}?subject=${subject}`;

        Linking.openURL(mailtoUrl)
            .catch(error => 
    };


    return (
        <View style={styles.container}>
            <Text><Text style={{ color: colorTheme.firstColor, textDecorationLine: "underline" }}>Bookease </Text>{t("BookeaseInfoTitle")}</Text>
            <Text></Text>
            <Text>{t("Feedback")}<TouchableOpacity onPress={handleEmailLinkPress} style={{ justifyContent: "center", alignItems: "center" }}><Text style={{ color: colorTheme.firstColor, textDecorationLine: "underline" }} >feedback@bookease.se</Text></TouchableOpacity></Text>
            <View style={{ flex: 1 }}></View>
            <TouchableOpacity style={{ alignSelf: "center", borderWidth: 2, borderRadius: 6, padding: 10, borderColor: colorTheme.firstColor }}><Text style={{ color: colorTheme.firstColor }}>{t('TermsOfService')}</Text></TouchableOpacity>
        </View>

    )
}