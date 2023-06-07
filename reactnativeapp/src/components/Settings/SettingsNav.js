import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text } from "react-native"
import React, { useContext } from 'react';
import { AuthContext } from "../../../auth/UserContextProvider";
import styles from "../../screens/Style";
import { useNavigation } from "@react-navigation/native";
import IOSPopup from "../Misc/PopUp";
import { useState } from "react";
import axios from '../../../axios/axios';





export default function SettingsNav() {
    const { colorTheme, setColorTheme, state, authContext } = React.useContext(AuthContext);
    const { signOut, t, setLang, getLang } = authContext
    const navigation = useNavigation()

    const [errorText, setErrorText] = useState()
    const [errorPopUpVisible, setErrorPopUpVisible] = useState(false)
    const [logoutPopupVisible, setLogoutPopupVisible] = useState(false)
    const [delAccountPopupVisible, setDelAccountPopupVisible] = useState(false)
    const [inputValue, setInputValue] = useState('');
    const [accountDeletedPopupVisible, setAccountDeletedPopupVisible] = useState(false)

    const delAccount = () => {
        axios.delete('accounts/delete')
            .then(response => {
                setAccountDeletedPopupVisible(true)
                setTimeout(() => signOut(), 4000)
            })
            .catch(error => {
            }).finally(() => {
                
            })
    }


    const handleErrorCancelPress = () => {

        setErrorPopUpVisible(false)
        setAccountDeletedPopupVisible(false)
    }

    const handleLogoutCancelPress = () => {

        setLogoutPopupVisible(false)
    }

    const handleLogoutPress = (index) => {
        if (index === 0) { // Yes button pressed

            setLogoutPopupVisible(false);
            setTimeout(() => signOut(), 1500)
        }
        else if (index === 1) {

            setLogoutPopupVisible(false)
        }

    };


    const handleDelAccountPress = (index) => {
        if (index === 0) { // Yes button pressed
            let confirmString = t("Confirm")
            if (inputValue == confirmString) {
                delAccount()
                setDelAccountPopupVisible(false);
            }

        }
        else if (index === 1) {

            setDelAccountPopupVisible(false);
        }

    };



    return (
        <View>
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
                {/* <TouchableOpacity style={styles.containerSettings}>
                    <View style={styles.innerContainerSettings}>
                        <View style={styles.iconContainer}><Ionicons name="md-lock-closed-outline" size={24} color="black" /></View>
                        <Text style={styles.settingNameText}>{t('ChangePassword')}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="black" />
                </TouchableOpacity> */}
                {/* <TouchableOpacity style={styles.containerSettings}>
                <View style={styles.innerContainerSettings}>
                    <View style={styles.iconContainer}><MaterialIcons name="feedback" size={24} color="black" /></View>
                    <Text style={styles.settingNameText}>{t("FeedbackSupport")}</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="black" />
            </TouchableOpacity> */}
                <TouchableOpacity style={styles.containerSettings} onPress={() => { navigation.navigate('Information') }}>
                    <View style={styles.innerContainerSettings}>
                        <View style={styles.iconContainer}><MaterialIcons name="perm-device-information" size={24} color="black" /></View>
                        <Text style={styles.settingNameText}>{t('Information')}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerSettings} onPress={() => { setLogoutPopupVisible(true) }}>
                    <View style={styles.innerContainerSettings}>
                        <View style={styles.iconContainer}><MaterialIcons name="logout" size={24} color="black" /></View>
                        <Text style={styles.settingNameText}>{t('LogOut')}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setDelAccountPopupVisible(true)}
                >
                    <Text style={{ color: '#bb0a1e', alignSelf: 'center', margin: '4%' }}>{t("DeleteAccount")}</Text>
                </TouchableOpacity>
            </View>
            <IOSPopup
                visible={logoutPopupVisible}
                title={t('SureLogOut?')}
                hasInput={false}
                bodyText={""}
                buttonTexts={[t('Yes'), t('No')]}
                buttonColor={colorTheme.firstColor}
                onButtonPress={handleLogoutPress}
                onCancelPress={handleLogoutCancelPress} />
            <IOSPopup
                visible={delAccountPopupVisible}
                placeholder={(t("Confirm"))}
                title={t('ConfirmMsg')}
                hasInput={true}
                buttonTexts={[t('Yes'), t('No')]}
                buttonColor={colorTheme.firstColor}
                inputValue={inputValue}
                setInputValue={setInputValue}
                onButtonPress={handleDelAccountPress}
                onCancelPress={handleDelAccountPress} />


            <IOSPopup
                visible={errorPopUpVisible}
                title={t("Error")}
                hasInput={false}
                bodyText={errorText}
                buttonTexts={[t('PopupCancel')]}
                buttonColor={colorTheme.firstColor}
                onButtonPress={handleErrorCancelPress}
                onCancelPress={handleErrorCancelPress} />
            <IOSPopup
                visible={accountDeletedPopupVisible}
                title={t("AccountDeleted")}
                hasInput={false}
                bodyText={errorText}
                buttonTexts={[t('PopupCancel')]}
                buttonColor={colorTheme.firstColor}
                onButtonPress={handleErrorCancelPress}
                onCancelPress={handleErrorCancelPress} />

        </View>
    )
}