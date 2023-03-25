
import { StyleSheet, View, Text } from "react-native"
import { Card } from "react-native-paper"
import React from 'react';
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons";


export default function Book() {

    return (
        <View style={{flex: 1}}>
            <View style={styles.navMenu}>
            
            </View>
            <View style={styles.main}>
            
            </View>
            <View style={styles.navMenu}>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    navMenu: {
        backgroundColor: "#2f9d9d",
        width: "100%",
        height: "10%"
    },
    main: {
        flex: 1
    }
});