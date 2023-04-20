import { StyleSheet, View, Text, Pressable } from "react-native"
import React from 'react';

export default function AssociationInformation() {



    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.text}>AssociationInformation</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        marginTop: 100,
        backgroundColor: "red"
    }
});