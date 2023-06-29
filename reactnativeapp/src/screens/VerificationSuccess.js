import { StyleSheet, View, Text, Linking,TouchableOpacity } from "react-native"
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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ConfirmationCode from "../components/Misc/ConfirmationCode";
import { Octicons } from '@expo/vector-icons';
import styles from "../components/Misc/styles";

export default function VerificationSuccess() {

    const { colorTheme, authContext } = React.useContext(AuthContext);
    const {t} = authContext
    const navigation = useNavigation()
    return (
        <LinearGradient colors={[colorTheme.firstColor, colorTheme.secondColor]} style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={[styles.title]}>{t('VerificationSuccesful')}</Text>
                <Octicons style={{ alignSelf: "center" }} name="verified" size={100} color="#3dc236" />
            </View>
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={styles.nextButton}
                    onPress={()=>navigation.navigate("Auth")}
                >
                    <Text style={styles.nextButtonText}>{t('Login')}</Text>
                </TouchableOpacity>
            </View>

        </LinearGradient>
    )

}
