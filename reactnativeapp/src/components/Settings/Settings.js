
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native"
import React from 'react';
import { AuthContext } from "../../../auth/UserContextProvider";
import styles from "../../screens/Style";
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import * as SecureStore from 'expo-secure-store';

async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

export default function Settings() {
    const { authContext } = React.useContext(AuthContext);
    const { colorTheme, setColorTheme } = React.useContext(AuthContext);
    const { signOut, t, setLang, getLang } = authContext
    const [selectedLang, setSelectedLang] = React.useState("English");
    const [selectedTheme, setSelectedTheme] = React.useState(colorTheme.name);



    const colorThemes = {
        blue: {name: "The Original", firstColor: "#4d70b3", secondColor: "#6ea1ff" },
        black: {name: "Midnight", firstColor: "#262626", secondColor: "#575757" },
        tropical: {name: "Passion Sunrise", firstColor: "#FE4384", secondColor: "#FFE681" },
        stillblue: {name: "Still Blue", firstColor: "#5a97ff", secondColor: "#5a97ff" }
    }

    const suportedLanguages = [
        { key: 'en', value: 'English' },
        { key: 'sv', value: 'Svenska' },
    ]

    const supportedColorThemes = [
        { key: 'blue', value: "The Original"},
        { key: 'black', value: "Midnight"},
        { key: 'tropical', value: "Passion Sunrise"},
        { key: 'stillblue', value: "Still Blue"}
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
        <View style={{ width: '100%', height: '100%' }}>
            <ScrollView style={styles.container}>
                <View style={styles.settingContainer}>
                    <Text style={styles.settingLabel}>{t("Language")}</Text>
                    <SelectList
                        //dropdownStyles
                        placeholder={selectedLang}
                        setSelected={(val) => {
                            changeLang(val)
                        }}
                        data={suportedLanguages}
                    />
                </View>
                <View style={styles.settingContainer}>
                    <Text style={styles.settingLabel}>Färgtema</Text>
                    <SelectList
                        //dropdownStyles
                        placeholder={selectedTheme}
                        setSelected={(val) => {
                            changeTheme(val)
                        }}
                        data={supportedColorThemes}
                    />
                </View>
            </ScrollView>
            <View>
                <Pressable onPress={() => signOut()} style={[styles.button, { position: 'absolute', bottom: '2%', backgroundColor: 'red' }]}><Text style={styles.buttonText}>{t("LogOut")}</Text></Pressable>
            </View>
        </View>
    )
}