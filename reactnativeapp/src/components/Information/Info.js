
import { StyleSheet, View, Text, Pressable } from "react-native"
import React from 'react';

export default function Info() {



    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.text}>Info</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        marginTop: 100,
        backgroundColor: "red"
    }
});