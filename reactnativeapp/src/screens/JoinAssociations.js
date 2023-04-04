
import { StyleSheet, View, Text, Pressable, SafeAreaView, Image, FlatList } from "react-native"
import React from 'react';
import { ScrollView } from "react-native-gesture-handler";
/* import plusIcon from 'reactnativeapp\assets\plus-sign.png'; */


export default function JoinAssociations() {

    const plusIcon = require('reactnativeapp/assets/plus-sign.png');


    let myAssociations = [] /*  */
    let myLocation =    {coordX: 17.64706376968685,
                         coordY: 59.839267262766334} // byt ut mot platsdata

    const allAssociations = [
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
        name: "akademiska sjukhuset sjukhuset sjukhuset sjukhuset",
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

    // const array = load_all_associations_from_database()

    function calculateDistance(myLoc, associationLoc) {
        const xDiff = myLoc.coordX - associationLoc.coordX;
        const yDiff = myLoc.coordY - associationLoc.coordY;

        return Math.sqrt(xDiff ** 2 + yDiff ** 2);
    }

    allAssociations.sort( (obj1, obj2) => calculateDistance(myLocation, obj1) - calculateDistance(myLocation, obj2))


    return (
        <SafeAreaView>

            <FlatList
            data={allAssociations}
            style={{}}
            renderItem={({ item }) => 
            <View style={{...styles.associationWrapper, marginLeft: '7%'}}>
                <View style={styles.associationLeft}>
                    <Text style={{fontSize: 17, marginLeft: '10%', flexWrap: 'wrap', overflow: 'hidden'}}>{item.name}</Text>
                </View>
                <View style={styles.associationRight}>
                    <Pressable style={{height: '100%', width: '100%', alignItems: "center", justifyContent: "center"}} 
                    onPress={ () =>
                    myAssociations
                    
                    }>
                        <Image source={plusIcon} style={{height: '50%', width: '50%', resizeMode: "contain"}}></Image>
                    </Pressable>
                </View>
            </View>}


            /* onRefresh={() => loadData()} aktivera senare när vi har associations i databasen */
            /* refreshing={loading} --- samma här */


            /> 


{/*             {allAssociations.map((item, index) => (
                <View style={styles.associationWrapper} key={index}>
                    <View style={styles.associationLeft}>
                        <Text>
                            {item.name}
                        </Text>
                    </View>
                    <View style={styles.associationRight}>
                            <Image source={plusIcon} style={{height: '50%', width: '50%', resizeMode: "contain"}}>
                                
                            </Image>
                    </View>

                    
                </View>
            ))} */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    associationWrapper: {
        flexDirection: "row",
        left: '7%',
        height: 70,
        width: '86%',
        color: "black",
        borderWidth: 3,
        borderRadius: 5,
        borderColor: "red",
        border: "solid"
    },

    associationLeft: {
        position: "left",
        width: '70%',
        height: '100%',
        borderWidth: 3,
        borderColor: "blue",
        justifyContent: "center"
    },
    associationRight: {
        position: "right",
        width: '30%',
        height: '100%',
        borderColor: "blue",
        borderWidth: 3,
        alignItems: "center",
        justifyContent: "center"

    },

    text: {
      color: "green"  
    },
});