
import { StyleSheet, View, Text, Pressable, SafeAreaView } from "react-native"
import React, { cloneElement } from 'react';

export default function JoinAssociations() {

    allAssociations = [ // plocka från databas sen
        {id: 1,
         name: "förening 1"},
        {id: 2,
        name: "förening 2"},
        {id: 3,
        name: "förening 3"},
        {id: 4,
        name: "förening 4"},
        {id: 5,
        name: "förening 5"}, 
        {id: 6,
        name: "förening 6"}, 
        {id: 7,
        name: "förening 7"}
    ]

    return (
        
        <SafeAreaView>
            <View style={{justifyContent: "center", alignItems: "center"}}>
                {allAssociations.map((item) => (
                    <View style={{height: 20, width: 200, borderRadius: 3, backgroundColor: "red", justifyContent: "center", alignItems: "center"}}>
                        <Text> {item.name} </Text>
                    </View>
                ))}
            </View>

        </SafeAreaView>
        

    )
}

const styles = StyleSheet.create({
    associationWrapper: {
        height: 20,
        width: 50,
        backgroundColor: 'red'
    },

    
    text: {
        marginTop: 100,
        backgroundColor: "red"
    },
});