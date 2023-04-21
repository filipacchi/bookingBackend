
import { StyleSheet, View, Text, Pressable, FlatList } from "react-native"
import React from 'react';

export default function Schedule() {

    myBookings = {}


    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.text}>Schedule</Text>

            <FlatList
            data={myBookings}
            onRender={( (item) => {
                
            })}>

            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        marginTop: 100,
        backgroundColor: "red"
    }
});