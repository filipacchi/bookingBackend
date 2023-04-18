
import { StyleSheet, View, Text, Pressable, TouchableOpacity, SafeAreaView, Image, FlatList, Modal } from "react-native"
import { useState } from 'react';
import React from 'react';
import axios from "../../axios/axios";
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';
import Style from "./Style";
import { AntDesign } from '@expo/vector-icons';


export default function AdminStart() {

    const [token, setToken] = useState("")
    const [Associations, setAssociation] = useState([])
    const [AssociationTest, setAssociationTest] = useState([
        {
            name: "BRF Gjuke",
            region: "Uppsala",
            id: 1,
        },
        {
            name: "BRF Rosen",
            region: "Uppsala",
            id: 1,
        },
        {
            name: "BRF Sandstrand",
            region: "Uppsala",
            id: 2,
        },
        {
            name: "Triangelgatan 87",
            region: "Uppsala",
            id: 2,
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

    if (AssociationTest.length == 0) {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <View style={{
                    borderStyle: "solid",
                    borderRadius: 10,
                    borderColor: "#999999",
                    borderWidth: 3,
                    margin: 20
                }}><Text style={[Style.assoText, Style.noAssoText]}>You have not joined any associations yet, press the button below to join an association</Text></View>
                <Pressable style={Style.addAssociation}><Ionicons name="ios-add-circle-outline" size={60} color="#999999" /></Pressable>
            </View>
        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: "#dcdcdc" }}>
            <FlatList
                data={AssociationTest}
                style={Style.expandFlatlist}
                renderItem={
                    ({ item }) =>
                        <View style={Style.assoFlatView}>
                            <View style={Style.assoView}>
                                <AntDesign name="home" size={28} color={"#222222"} />
                                <View>
                                    <Text suppressHighlighting={true}
                                        onPress={() => {
                                            console.log(Object.keys(bookableObjects[1]).map((key)=> bookableObjects[1][key]))
                                        }}
                                        style={Style.assoText}>

                                        {item.name}</Text>
                                    <Text style={{ color: "#767676" }}>{item.region}</Text></View>
                            </View>
                            <View style={Style.assoDarkView}>
                                <FlatList
                                    data={item.bookobjects}
                                    style={{}}
                                    horizontal={true}
                                    renderItem={
                                        ({item}) => (
                                            <View style={Style.bookObject}>
                                                <Text>{item.name}</Text>
                                            </View>
                                        )
                                    }
                                >

                                </FlatList>
                            </View>
                        </View>}
            >
            </FlatList>
            <Pressable style={Style.addAssociation}><Ionicons name="ios-add-circle-outline" size={60} color="#999999" /></Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        marginTop: 100,
        backgroundColor: "red"
    }
});