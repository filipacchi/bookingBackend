
import { StyleSheet, View, Text, Pressable } from "react-native"
import React, {useContext} from 'react';

export default function User() {



    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.text}>USER</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        marginTop: 100,
        backgroundColor: "red"
    }
});