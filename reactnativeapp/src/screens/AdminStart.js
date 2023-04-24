
import { StyleSheet, View, Text, Pressable, TouchableOpacity, SafeAreaView, Image, FlatList, Modal } from "react-native"
import { useState, useContext } from "react";
import { userLanguageContext } from "reactnativeapp/language/languageContext.js";
import { NativeModules, Platform } from 'react-native';
import React from 'react';
import axios from "reactnativeapp/axios/axios.js";
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';
import Style from "reactnativeapp/src/screens/Style.js";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
//import * as AllLangs from "reactnativeapp/language/AllLangs.js"


export default function Associations() {

    const navigation = useNavigation()

  

    

    const [token, setToken] = useState("")
    const [Associations, setAssociation] = useState([])


    /* myAssociations */
    const [AssociationTest, setAssociationTest] = useState([
        {
            name: "BRF Gjuke",
            region: "Uppsala",
            id: 1,
            bookobjects: [
                { name: "Grill 1", id: 1 },
                { name: "Bastu", id: 2 },
                { name: "Tvättstuga", id: 3 }
           ],
        },
        {
            name: "BRF Rosen",
            region: "Uppsala",
            id: 2,
            bookobjects: [
                { name: "Grill 1", id: 1 },
                { name: "Bastu", id: 2 },
                { name: "Tvättstuga", id: 3 }
           ],
        },
        {
            name: "Strandvägen 54",
            region: "Uppsala",
            id: 3,
            bookobjects: [
                { name: "Grill 1", id: 1 },
                { name: "Bastu", id: 2 },
                { name: "Tvättstuga", id: 3 }
           ],
        },
        {
            name: "Triangelgatan 43",
            region: "Uppsala",
            id: 4,
            bookobjects: [
                { name: "Grill 1", id: 1 },
                { name: "Bastu", id: 2 },
                { name: "Tvättstuga", id: 3 }
           ],
        }

    ])

    const [bookableObjects, setBookObjects] = useState(
        {
            1: [
                 { name: "Grill 1" },
                 { name: "Bastu" },
                 { name: "Tvättstuga" }
            ],
            2: [
                { name: "Pingis" },
                { name: "Bastu" },
                { name: "Tvättstuga" }
            ],

        }
    )

    const bo = [
        {"name": "Grill 1"},
        {"name": "Bastu"},
        {"name": "Tvättstuga"}
      ];

    const loadData = (token) => {
        async function getUserAssociation(token) {
            console.log("Inuti getUser: " + token)
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const bodyParameters = {
                key: "value"
            };
            axios.get('user/associations',
                config
            )
                .then(response => {
                    console.log(response.data)
                    setAssociation(response.data)
                })
                .catch(error => {
                    console.log(error);
                });
        }
        getUserAssociation(token)
    }

    React.useEffect(() => {
        const getToken = async () => {
            let access_token = await SecureStore.getItemAsync('userToken')
            console.log("ASSO: " + access_token)
            setToken(access_token)
            loadData(access_token)



        }
        getToken()
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: "#dcdcdc" }}>
            <FlatList
                data={AssociationTest}
                style={Style.expandFlatlist}
                renderItem={
                    ({ item }) =>
                        <View style={Style.assoFlatView}>
                            <Pressable onPress={() => {
                                            navigation.navigate("AssociationInformation")
                                        }} style={Style.assoView}>
                                 <AntDesign name="home" size={28} color={"#222222"} />
                                <View>
                                    <Text suppressHighlighting={true}
                                        style={Style.assoText}>
                                        {item.name}</Text>
                                    <Text style={{ color: "#767676" }}>{item.region}</Text></View>
                            </Pressable>
                            <View style={Style.assoDarkView}>
                                <FlatList
                                    data={item.bookobjects}
                                    style={{}}
                                    horizontal={true}
                                    ListFooterComponent={
                                        <Pressable onPress={() => {
                                            navigation.navigate("AddBookableObject", {associationId: item.id})
                                            console.log(item.id)
                                        }} style={Style.addObject}>
                                            <Ionicons name="ios-add-circle-outline" size={25} color="black" />
                                            </Pressable>
                                      }
                                    renderItem={
                                        ({item}) => (
                                            <Pressable onPress={() => {
                                                console.log('HÄR HAR VI OBJECT ID:'+item.id)
                                                navigation.navigate("EditBookableObject",{objectId: item.id})
                                            }} style={Style.bookObject}>
                                                <Text>{item.name}</Text>
                                            </Pressable>
                                        )
                                    }
                                >
                                </FlatList>
                            </View>
                        </View>}
            >
            </FlatList>
            {/* <Pressable 
            style={Style.addAssociation}
            onPress={( () => {
                console.log(
            Platform.OS === 'ios'
            ? NativeModules.SettingsManager.settings.AppleLocale // iOS 13
            : NativeModules.I18nManager.localeIdentifier
            )
            })}>
                <Ionicons name="ios-add-circle-outline" size={60} color="#999999" /></Pressable> */}
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        marginTop: 100,
        backgroundColor: "red"
    }
});