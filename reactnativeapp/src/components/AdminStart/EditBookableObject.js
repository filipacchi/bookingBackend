import { StyleSheet, View, Text, Pressable } from "react-native"
import React from 'react';

export default function EditBookableObject({route}) {
   const {id} = route.params


    return (
        <Pressable onPress={console.log(id)} style={{ flex: 1 }}>
            <Text style={styles.text}>EditBookableObject hej</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    text: {
        marginTop: 100,
        backgroundColor: "red"
    }
});