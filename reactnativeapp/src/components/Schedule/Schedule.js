
import { StyleSheet, View, Text, Pressable, FlatList } from "react-native"
import React from 'react';
import * as styles1 from "reactnativeapp/src/screens/Style.js"
import axios from "../../../axios/axios";

export default function Schedule() {

    myBookings = {}


    
    return (
        <View style={{ flex: 1 }}>
            <Text style={styles1.text}>Schedule</Text>

            <Pressable style={{height: 200, width: 200, backgroundColor: "red"}}>
                <Text>test</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        marginTop: 100,
        backgroundColor: "red"
    }
});