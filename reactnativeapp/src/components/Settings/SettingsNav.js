import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View, Text, Pressable, ScrollView, Image } from "react-native"
import React from 'react';
import { AuthContext } from "../../../auth/UserContextProvider";
import styles from "../../screens/Style";
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import * as SecureStore from 'expo-secure-store';
import axios from "../../../axios/axios";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import IOSPopup from "../Misc/PopUp";





export default function SettingsNav() {
    const { colorTheme, setColorTheme, state, authContext } = React.useContext(AuthContext);
    const { signOut, t, setLang, getLang } = authContext
    const navigation = useNavigation()
    const [confirmPopupVisible, setConfirmPopupVisible] = React.useState(false)

    const handleSignOut = () => {
        setTimeout(()=>signOut(), 5000)
    }

    const handleButtonPress = (index) => {
        if (index === 1) { // Yes button pressed
            console.log("LOGGA INTE UT")
            setConfirmPopupVisible(false);
        }
        else {
            console.log("LOGGA UT")
            signOut()
        }

    };

    const handleCancelPress = () => {
        console.log('Popup Cancelled');
        //setConfirmPopupVisible(false);
    };



    return (
        <View style={styles.settingsView}>
            <View style={styles.nameHeader}>
                <Text style={styles.nameTextLarge}>{state.firstName + " " + state.lastName}</Text>
            </View>
            <TouchableOpacity style={styles.containerSettings} onPress={() => { navigation.navigate('Settings') }}>
                <View style={styles.innerContainerSettings}>
                    <View style={styles.iconContainer}><Ionicons name="settings-outline" size={25} color="black" /></View>
                    <Text style={styles.settingNameText}>{t('SettingsPage')}</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerSettings}>
                <View style={styles.innerContainerSettings}>
                    <View style={styles.iconContainer}><Ionicons name="md-lock-closed-outline" size={24} color="black" /></View>
                    <Text style={styles.settingNameText}>{t('ChangePassword')}</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerSettings}>
                <View style={styles.innerContainerSettings}>
                    <View style={styles.iconContainer}><MaterialIcons name="feedback" size={24} color="black" /></View>
                    <Text style={styles.settingNameText}>Feedback / Support</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerSettings}>
                <View style={styles.innerContainerSettings}>
                    <View style={styles.iconContainer}><MaterialIcons name="perm-device-information" size={24} color="black" /></View>
                    <Text style={styles.settingNameText}>{t('Information')}</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerSettings} onPress={() => signOut()}>
                <View style={styles.innerContainerSettings}>
                    <View style={styles.iconContainer}><MaterialIcons name="logout" size={24} color="black" /></View>
                    <Text style={styles.settingNameText}>{t('LogOut')}</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}