
import { StyleSheet, View, Text, Pressable, SafeAreaView } from "react-native"
import React from 'react';

export default function JoinAssociations() {

    allAssociations = [
        {id: 1,
         name: "a"}, // id får 
        {id: 2,
        name: "b"},
        {id: 3,
        name: "c"},
        {id: 4,
        name: "d"},
        {id: 5,
        name: "e"}, 
        {id: 6,
        name: "f"}, 
        {id: 7,
        name: "g"}
    ]


    return (
        
        <SafeAreaView>
            <View>
                {allAssociations.map((item) => {
                    <View>
                        <Text> item.name </Text>
                    </View>
                })}
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