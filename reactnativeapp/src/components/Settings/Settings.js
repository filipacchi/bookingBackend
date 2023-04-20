
import { StyleSheet, View, Text, Pressable } from "react-native"
import React from 'react';
import { AuthContext } from "../../../navigation/AppStack";
import Style from "../../screens/Style";

export default function Settings() {
    const { signOut } = React.useContext(AuthContext);

    return (
        <View style={{ flex: 1 }}>
            <Pressable onPress={ () => signOut()} style={[Style.pressable]}><Text>LOGOUT</Text></Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        marginTop: 100,
        backgroundColor: "red"
    }
});