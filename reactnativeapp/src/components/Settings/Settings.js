
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native"
import React from 'react';
import { AuthContext } from "../../../navigation/AppStack";
import styles from "../../screens/Style";
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';

export default function Settings() {
    const { signOut, t, setLang, getLang } = React.useContext(AuthContext);
    const [selected, setSelected] = React.useState("English");



    const suportedLanguages = [
        { key: 'en', value: 'English' },
        { key: 'sv', value: 'Svenska' },
    ]
    function changeLang(val) {
        setLang(val)
        setSelected(val)
    }

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <ScrollView style={styles.container}>
                <View style={styles.settingContainer}>
                <Text style={styles.settingLabel}>{t("Language")}</Text>
                    <SelectList
                        //dropdownStyles
                        placeholder={selected}
                        setSelected={(val) => {
                            changeLang(val)
                        }}
                        data={suportedLanguages}
                    />
                </View>
            </ScrollView>
            <View>
                <Pressable onPress={() => signOut()} style={[styles.button, { position: 'absolute', bottom: '2%', backgroundColor: 'red' }]}><Text style={styles.buttonText}>{t("LogOut")}</Text></Pressable>
            </View>
        </View>
    )
}