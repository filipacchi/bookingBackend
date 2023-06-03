
import { View, Text } from "react-native"
import React from 'react';
import { AuthContext } from "../../../auth/UserContextProvider";
import styles from "../../screens/Style";
import { SelectList } from 'react-native-dropdown-select-list';
import * as SecureStore from 'expo-secure-store';
import axios from "../../../axios/axios";
import { Entypo } from '@expo/vector-icons';

async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}

export default function Settings() {
    const langMatch = {
        en: "English",
        sv: "Svenska"
    }
    const { authContext } = React.useContext(AuthContext);
    const { i18n, colorTheme, setColorTheme } = React.useContext(AuthContext);
    const { signOut, t, setLang, getLanguage } = authContext
    const [selectedLang, setSelectedLang] = React.useState(getLanguage);
    const [selectedTheme, setSelectedTheme] = React.useState(colorTheme.name);



    const colorThemes = {
        blue: { name: "The Original", firstColor: "#4d70b3", secondColor: "#6ea1ff" },
        black: { name: "Midnight", firstColor: "#262626", secondColor: "#575757" },
        tropical: { name: "Passion Sunrise", firstColor: "#FE4384", secondColor: "#FFE681" },
        stillblue: { name: "Still Blue", firstColor: "#5a97ff", secondColor: "#5a97ff" }
    }

    const suportedLanguages = [
        { key: 'en', value: 'English' },
        { key: 'sv', value: 'Svenska' },
    ]
    const supportedColorThemes = [
        { key: 'blue', value: "The Original" },
        { key: 'black', value: "Midnight" },
        { key: 'tropical', value: "Passion Sunrise" },
        { key: 'stillblue', value: "Still Blue" }
    ]
    function changeLang(val) {
        setLang(val)
        setSelectedLang(val)
    }

    function changeTheme(val) {
        let colorValues = colorThemes[val]
        setColorTheme(colorValues)
        save('selectedColor', JSON.stringify(colorValues))
    }

    return (
            <View style={styles.container}>
                <View style={[styles.settingContainer]}>
                    <Text style={styles.settingLabel}>{t("Language")}</Text>
                    <View style={{ width: "40%" }}>
                        <SelectList
                            arrowicon={<Entypo name="chevron-down" size={15} color="grey" />}
                            boxStyles={{ height: 45, alignItems: "center", justifyContent: "space-evenly" }}
                            search={false}
                            dropdownShown={false}
                            placeholder={selectedLang}
                            setSelected={(val) => {
                                changeLang(val)
                            }}
                            data={suportedLanguages}
                            dropdownStyles={{ position: "absolute", backgroundColor: "white", width: "100%", top: 45, zIndex: 2 }}
                        />
                    </View>
                </View>
                <View style={[styles.settingContainer, { zIndex: 1 }]}>
                    <Text style={styles.settingLabel}>{t("ColorTheme")}</Text>
                    <View style={{ width: "40%" }}>
                        <SelectList
                            arrowicon={<Entypo name="chevron-down" size={15} color="grey" />}
                            boxStyles={{ height: 45, alignItems: "center", justifyContent: "space-evenly" }}
                            search={false}
                            placeholder={selectedTheme}
                            setSelected={(val) => {
                                changeTheme(val)
                            }}
                            data={supportedColorThemes}
                            dropdownStyles={{ position: "absolute", backgroundColor: "white", width: "100%", top: 45 }}
                        />
                    </View>
                </View>
            </View>

    )
}