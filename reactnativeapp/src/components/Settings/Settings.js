
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native"
import React from 'react';
import { AuthContext } from "../../../navigation/AppStack";
import styles from "../../screens/Style";
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';

export default function Settings() {
    const { signOut } = React.useContext(AuthContext);
    const [selected, setSelected] = React.useState("English");

    const suportedLanguages = [
        { key: '1', value: 'English' },
        { key: '2', value: 'Svenska' },
    ]

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <ScrollView style={styles.container}>
                <View style={styles.settingContainer}>
                <Text style={styles.settingLabel}>Language</Text>
                    <SelectList
                        //dropdownStyles
                        placeholder={selected}
                        setSelected={(val) => {
                            setSelected(val)
                            selectedLanguage = val
                        }}
                        data={suportedLanguages}
                    />
                </View>
            </ScrollView>
            <View>
                <Pressable onPress={() => signOut()} style={[styles.button, { position: 'absolute', bottom: '2%', backgroundColor: 'red' }]}><Text style={styles.buttonText}>LOG OUT</Text></Pressable>
            </View>
        </View>
    )
}