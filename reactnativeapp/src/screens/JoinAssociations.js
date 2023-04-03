
import { StyleSheet, View, Text, Pressable, SafeAreaView } from "react-native"
import React from 'react';
import { ScrollView } from "react-native-gesture-handler";


export default function JoinAssociations() {

    let myLocation =    {coordX: 17.64706376968685,
                         coordY: 59.839267262766334} // byt ut mot platsdata

    allAssociations = [
        {id: 1,
         name: "17.64 59.84 ångan",
        coordX: 17.64706376968685,
        coordY: 59.839267262766334}, // Ångströmslaboratoriet
        {id: 2,
        name: "12.35 56.16 köpenhamn",
        coordX: 12.34830,
        coordY: 56.16051}, // Köpenhamn
        {id: 3,
        name: "uthgård",
        coordX: 17.6521067898191,
        coordY: 59.840574219846076}, // Ångströmslaboratoriet nära
        {id: 4,
        name: "akademiska sjukhuset",
        coordX: 17.63991410277152, 
        coordY: 59.84862311933962}, // Ångströmslaboratoriet nära
        {id: 5,
        name: "10 50",
        coordX: 10.647063769,
        coordY: 50.839267262}, // Ångströmslaboratoriet nära
        {id: 6,
        name: "9 45",
        coordX: 9.647063769,
        coordY: 45.839267262}, // Ångströmslaboratoriet nära
    ]

    // load_all_associations_from_database()

    function calculateDistance(myLoc, associationLoc) {
        const xDiff = myLoc.coordX - associationLoc.coordX;
        const yDiff = myLoc.coordY - associationLoc.coordY;

        return Math.sqrt(xDiff ** 2 + yDiff ** 2);
    }

    allAssociations.sort( (obj1, obj2) => calculateDistance(myLocation, obj1) - calculateDistance(myLocation, obj2))


    return (
        <SafeAreaView>

                {allAssociations.map((item) => (
                    <View key={item}>
                        <Text>
                            {item.name}
                        </Text>
                    </View>
                ))}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    associationWrapper: {
        height: 200,
        width: 200,
        backgroundColor: 'red',
        color: "black"
    },
    text: {
      color: "green"  
    },
});