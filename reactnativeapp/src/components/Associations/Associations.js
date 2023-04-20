
import { StyleSheet, View, Text, Pressable, TextInput, TouchableOpacity, SafeAreaView, Image, FlatList, Modal } from "react-native"
import { useState, useContext } from "react";
import { userLanguageContext } from "reactnativeapp/language/languageContext.js";
import { NativeModules, Platform } from 'react-native';
import React from 'react';
import axios from "../../../axios/axios";
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';
import Style from "../../screens/Style";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
//import * as AllLangs from "reactnativeapp/language/AllLangs.js"


export default function Associations() {

    const navigation = useNavigation()

    const [userLanguage, setUserLanguage] = useContext(userLanguageContext)
    const [languagePackage, setLanguagePackage] = useContext(userLanguageContext)
    const [modalVisible, setModalVisible] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const [inputText, setInputText] = useState("")
    const [isCheckMarkPressed, setCheckMarkPressed] = useState(false)



    const [token, setToken] = useState("")
    const [Associations, setAssociation] = useState([])


    /* myAssociations */
    const [AssociationTest, setAssociationTest] = useState([
        {
            name: "BRF Gjuke",
            region: "Uppsala",
            id: 1,
            bookobjects: [
                { name: "Grill 1" },
                { name: "Bastu" },
                { name: "Tvättstuga" }
            ],
        },
        {
            name: "BRF Rosen",
            region: "Uppsala",
            id: 2,
            bookobjects: [
                { name: "Grill 1" },
                { name: "Bastu" },
                { name: "Tvättstuga" }
            ],
        },
        {
            name: "BRF Gjuke",
            region: "Uppsala",
            id: 3,
            bookobjects: [
                { name: "Grill 1" },
                { name: "Bastu" },
                { name: "Tvättstuga" }
            ],
        },
        {
            name: "BRF Gjuke",
            region: "Uppsala",
            id: 4,
            bookobjects: [
                { name: "Grill 1" },
                { name: "Bastu" },
                { name: "Tvättstuga" }
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
        {
            name: "BRF Rosen",
            region: "Uppsala",
            id: 1
        },
        {
            name: "BRF Gjuke",
            region: "Uppsala",
            id: 2
        },
        {
            name: "BRF Torsgården",
            region: "Uppsala",
            id: 3
        },
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
            axios.get('user/association/get',
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

    async function JoinAssociation() {
        console.log("Inuti getUser: " + token)
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const bodyParameters = {
            key: "value"
        };
        axios.post('join/association/add/'+inputText,
            config
        )
            .then(response => {
                console.log(response.data)
                loadData()
            })
            .catch(error => {
                console.log(error);
            });
    }

    const checkKeyMatch = () => {
        JoinAssociation()
    }

    const PopUpModal = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>

                <View style={Style.modalWindow}>
                    <View style={Style.modalOuter}>
                        < View style={Style.inputAndCheckMark}>
                            <TextInput
                                style={Style.modalInput}
                                value={inputText}
                                /* style={styles.modalTextInput} */
                                onPress={() => setIsFocused(true)}
                                placeholder={"Enter Association Key"}
                                onChangeText={setInputText}>
                            </TextInput>
                            <Pressable style={{ justifyContent: "center" }} onPress={() => {
                                console.log("Value: " + inputText)
                                checkKeyMatch(inputText)
                            }}>
                                <AntDesign name="check" size={20} color="black" />
                            </Pressable>
                        </View>


                        <Pressable
                            style={Style.modalCloseButton}
                            onPress={() => setModalVisible(false)}>
                            <AntDesign name="close" size={24} color="black" />
                        </Pressable>
                    </View>
                </View>
            </Modal >
        )
    }

    if (Associations.length == 0) {
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
                data={Associations}
                style={Style.expandFlatlist}
                renderItem={
                    ({ item }) =>
                        <View style={Style.assoFlatView}>
                            <View style={Style.assoView}>
                                <AntDesign name="home" size={28} color={"#222222"} />
                                <View>
                                    <Text suppressHighlighting={true}
                                        onPress={() => {
                                            navigation.navigate("BookableObject")
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
                                        ({ item }) => (
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
            <PopUpModal />

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
            <Pressable onPress={() => setModalVisible(true)} style={Style.addAssociation}><Ionicons name="ios-add-circle-outline" size={60} color="#999999" /></Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        marginTop: 100,
        backgroundColor: "red"
    }
});