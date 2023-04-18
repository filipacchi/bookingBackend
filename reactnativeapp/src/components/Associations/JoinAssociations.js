
import { StyleSheet, View, Text, Pressable, TouchableOpacity, SafeAreaView, Image, FlatList, Modal } from "react-native"
import React from 'react';
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useState, useContext } from "react";
import { userLanguageContext } from "../../../language/LanguageContext";
/* import plusIcon from 'reactnativeapp\assets\plus-sign.png'; */


export default function JoinAssociations() {


    const [userLanguage, setUserLanguage] = useContext(userLanguageContext)

    const plusIcon = require('reactnativeapp/assets/plus-sign.png');
    const closeIcon = require('reactnativeapp/assets/close-window.png')

    const associationunoccupiedKeys = [ // importera från databas efter att vi har valt association
        {id: 1, 
        unoccupiedKeys: ["1", "11", "111", "1111", "11111"]},
        
        {id: 2,
        unoccupiedKeys: ["2", "22", "222", "2222", "22222"]
        }, 
        {id: 3,
        unoccupiedKeys: ["3", "33", "333", "3333", "33333"]
        }, 
        {id: 4,
        unoccupiedKeys: ["4", "44", "444", "4444", "44444"]
        }, 
        {id: 5,
        unoccupiedKeys: ["5", "55", "555", "5555", "55555"]
        }, 
        {id: 6,
        unoccupiedKeys: ["6", "66", "666", "6666", "66666"]
        }, 
    ]

    let myAssociations = [] /* lägg till selectedAssociation om vi har en matchning */
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
        {id: 7, 
        name: userLanguage,
        coordX: 9.647063769,
        coordY: 45.839267262}
    ]

    // const array = load_all_associations_from_database()

    function calculateDistance(myLoc, associationLoc) {
        const xDiff = myLoc.coordX - associationLoc.coordX;
        const yDiff = myLoc.coordY - associationLoc.coordY;

        return Math.sqrt(xDiff ** 2 + yDiff ** 2);
    }


    allAssociations.sort( (obj1, obj2) => calculateDistance(myLocation, obj1) - calculateDistance(myLocation, obj2))

    /* borde hända när vi laddar sidan, inte när vi importerar den i App */



    /* ---- HÄR BÖRJAR KOMPONENTEN! ---- */

    function AllAssociations() {

        /* FLATLIST */

        function openPopUp(item) {
            console.log("item: " + item)
            console.log("item.name: " + item.name)
            setSelectedAssociation(item)
            setModalVisible(true)
        }
        
        /* MODAL */

        const [modalVisible, setModalVisible] = useState(false)
        const [selectedAssociation, setSelectedAssociation] = useState({})

        const [isFocused, setIsFocused] = useState(false)
        const [inputText, setInputText] = useState("")

        const checkMarkIcon = require("reactnativeapp/assets/checkmark.png")

        const handleChangeText = ((newText) => {
            setInputText(newText)
        })


    /* MODAL --> NYCKLAR */
    

        const [keyMatchFound, setKeyMatchFound] = useState(false)

        function checkKeyMatch(inputText) {
            console.log("From checkKeyMatch:")
            console.log("inputText = " + inputText)
            console.log("selectedAssociation.id = " + selectedAssociation.id)

            const associationIDMatch = associationunoccupiedKeys.find( item => {
            return item.id === selectedAssociation.id})
            
            if (associationIDMatch.unoccupiedKeys.includes(inputText)) {
                console.log("Key match found for association " + selectedAssociation.id + 
                " and key " + inputText)
                setKeyMatchFound(true)
            } else {
                setKeyMatchFound(false)
                console.log("No match found")
            }

        }


        return (
            <SafeAreaView style={{flexGrow: 1}}>
                <FlatList
                data={allAssociations}
                style={{}}
                renderItem={({ item }) => 
                    <View style={{...styles.associationWrapper, marginLeft: '5%'}}>
                        <View style={styles.associationLeft}>
                            <Text style={{fontSize: 17, marginLeft: '10%', flexWrap: 'wrap', overflow: 'hidden'}}>{item.name}</Text>
                        </View>
                        
                        <View style={styles.associationRight}>
                            <TouchableOpacity style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}
                            onPress = { () => {
                                openPopUp(item);
                                setSelectedAssociation(item) /* dehär ska bort */
                            
                            }}
                            >
                            <Image source={plusIcon} style={{height: '50%', width: '50%', resizeMode: "contain"}}></Image>
                            </TouchableOpacity>
                            
                        </View>

                                            {/* onRefresh={() => loadData()} aktivera senare när vi har associations i databasen */
                                            /* refreshing={loading} --- samma här */}
                    </View>}
                ></FlatList>

                <View style={{border: "solid", borderWidth: 4}}>
                    <Text>
                        {"key match found: " + keyMatchFound}
                    </Text>
                </View>

                <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>

                    <View style={styles.modalWindow}>
                        <View style={styles.modalOuter}>
                            <View style={styles.modalInner}>
                                <Text>{"Submit Your Association Key:"}</Text>

                                <View style={styles.inputAndCheckMark}>
                                    <TextInput 
                                        value={inputText}
                                        /* style={styles.modalTextInput} */
                                        onPress={() => setIsFocused(true)}
                                        placeholder={"Enter Association Key"}
                                        onChangeText={handleChangeText}>
                                    </TextInput>
                                    <Pressable onPress={ () => {
                                        console.log("Value: " + inputText)
                                        checkKeyMatch(inputText)}}>
                                        <Image 
                                            source={checkMarkIcon} 
                                            
                                            style={styles.modalTextInputButton}>
                                        </Image>
                                    </Pressable>
                                </View>
                            </View>
                            

                            <Pressable
                            style={styles.modalCloseButton}
                            onPress={() => setModalVisible(false)}
                            >
                                <Image source={closeIcon} style={styles.modalCloseIcon} />
                            </Pressable>
                        </View>
                    </View>
                </Modal>

            </SafeAreaView>
        )
    }




    return (
        <AllAssociations/>
    )
}

const styles = StyleSheet.create({
    associationWrapper: {
        display: "flex",
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
/*         position: "left", */
        width: '70%',
        height: '100%',
        borderWidth: 3,
        borderColor: "blue",
        justifyContent: "center"
    },
    associationRight: {
/*         position: "right", */
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
    modalWindow: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)', /* en hinna över bakgrunden */
    },
    modalOuter: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        height: '20%',
        width: '80%',
        display: "flex",
    },
    modalInner: {
        position: "absolute",
        height: '100%',
        width: '95%',
        left: '5%',
        bottom: '10%',
        border: "solid", borderWidth: 2,
        borderColor: "green",
        backgroundColor: "white"
    },
    modalDescription: {
        fontSize: 16,
        marginBottom: 20,
    },
    modalCloseButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        /* border: 'solid', borderWidth: '2', */
    },
    modalCloseIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
    },
    inputAndCheckMark: {
        position: "absolute", 
        width: "100%", height: "30%",
        bottom: "5%",
        border: "solid", borderWidth: 2, borderRadius: 4, borderColor: "blue"
    },
    modalTextInput: {
        position: "absolute",
        color: "black",
        width: "85%", height: "100%",
        border: "solid", borderWidth: 2, borderRadius: 4
    },
    modalTextInputButton: {
        height: "100%",
        /* width: 20, */
        resizeMode: 'contain',
    },
});