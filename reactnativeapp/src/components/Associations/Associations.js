
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
import { AuthContext } from "../../../auth/UserContextProvider";
import { ActivityIndicator } from "react-native-paper";
//import * as AllLangs from "reactnativeapp/language/AllLangs.js"


export default function Associations() {

    const navigation = useNavigation()
    const { state } = useContext(AuthContext)
    const { colorTheme } = useContext(AuthContext)
    /* const [userLanguage, setUserLanguage] = useContext(userLanguageContext)
    const [languagePackage, setLanguagePackage] = useContext(userLanguageContext) */

    const [EnterModalVisible, setEnterModalVisible] = useState(false)
    const [ConfirmModalVisible, setConfirmModalVisible] = useState(false)
    const [ErrorModalVisible, setErrorModalVisible] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const [inputText, setInputText] = useState("")
    const [isCheckMarkPressed, setCheckMarkPressed] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(true)
    const [joinAssociationName, setJoinAssociationName] = useState("No Association")
    const [isLoading, setIsLoading] = useState(true)

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
            axios.get('user/association/get'
            )
                .then(response => {
                    console.log(response.data)
                    setAssociation(response.data)
                })
                .catch(error => {
                    console.log(error);
                }).finally(() => setIsLoading(false), setIsRefreshing(false))
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
        console.log("Inuti getUser: " + state.userToken)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        const bodyParameters = {
            key: "value"
        };
        axios.post('join/association/add/' + inputText
        )
            .then(response => {
                console.log("" + response.data)
                loadData(token)
            })
            .catch(error => {
                console.log(error);
            }).finally(() => setConfirmModalVisible(false))
    }

    async function GetAssociation(tI) {
        console.log("Inuti getUser: " + state.userToken)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        const bodyParameters = {
            key: "value"
        };
        axios.get('join/association/get/' + tI
        )
            .then(response => {
                console.log("" + response.data)
                setJoinAssociationName(response.data.name)
                setConfirmModalVisible(true)
            })
            .catch(error => {
                console.log(error);
                setErrorModalVisible(true)
            })
            .finally(() => {
                setIsLoading(false)

            })
    }


    const checkKeyMatch = (tI) => {
        setInputText(tI)
        GetAssociation(tI)
        setEnterModalVisible(false)

    }
    let tempInput = ""
    const handleChangeText = ((newText) => {
        tempInput = newText
        console.log(tempInput)
    })
    const PopUpModalEnterKey = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={EnterModalVisible}
                onRequestClose={() => setEnterModalVisible(false)}>

                <View style={Style.modalWindow}>
                    <View style={Style.modalOuter}>
                        <Text>Enter Association Key</Text>
                        < View style={Style.inputAndCheckMark}>
                            <TextInput
                                style={Style.modalInput}
                                //value={tempInput}
                                /* style={styles.modalTextInput} */
                                //onPress={() => setIsFocused(true)}
                                placeholderTextColor="#6e6e6e"
                                onChangeText={handleChangeText}
                                placeholder={"Ex: 123456"}>
                            </TextInput>
                            <Pressable style={{ justifyContent: "center" }} onPress={() => {
                                console.log("Value: " + tempInput)
                                checkKeyMatch(tempInput)
                            }}>
                                <AntDesign name="check" size={20} color="black" />
                            </Pressable>
                        </View>


                        <Pressable
                            style={Style.modalCloseButton}
                            onPress={() => setEnterModalVisible(false)}>
                            <AntDesign name="close" size={24} color="black" />
                        </Pressable>
                    </View>
                </View>
            </Modal >
        )
    }

    const PopUpModalConfirm = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={ConfirmModalVisible}
                onRequestClose={() => setConfirmModalVisible(false)}>
                <View style={Style.modalWindow}>

                    <View style={Style.modalOuter}>
                        <View style={{ gap: 10 }}>
                            <Text style={{ textAlign: "center" }}>Vill du gå med i föreningen: </Text>
                            <Text style={{ textDecorationLine: "underline", textAlign: "center" }}>{joinAssociationName}</Text>
                            <View style={{ flexDirection: "row", gap: 30, justifyContent: "center" }}>
                                <Pressable onPress={() => JoinAssociation()} style={[Style.modalButton, { backgroundColor: "green" }]}><Text style={{ color: "white" }}>Ja</Text></Pressable>
                                <Pressable onPress={() => setConfirmModalVisible(false)} style={[Style.modalButton, { backgroundColor: "red" }]}><Text style={{ color: "white" }}>Avbryt</Text></Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal >
        )
    }

    const tryAgain = () => {

        setErrorModalVisible(false)
        setEnterModalVisible(true)
    }

    const PopUpModalError = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={ErrorModalVisible}
                onRequestClose={() => setErrorModalVisible(false)}>
                <View style={Style.modalWindow}>

                    <View style={Style.modalOuter}>
                        <View style={{ gap: 10 }}>
                            <Text style={{ textAlign: "center" }}>Nåt gick fel, vill du prova igen? </Text>
                            <View style={{ flexDirection: "row", gap: 30, justifyContent: "center" }}>
                                <Pressable onPress={() => tryAgain()} style={[Style.modalButton, { backgroundColor: "green" }]}><Text style={{ color: "white" }}>Ja</Text></Pressable>
                                <Pressable onPress={() => setErrorModalVisible(false)} style={[Style.modalButton, { backgroundColor: "red" }]}><Text style={{ color: "white" }}>Nej</Text></Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal >
        )
    }

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><ActivityIndicator /></View>

        )
    }



    return (
        <View style={{ flex: 1, backgroundColor: "#dcdcdc" }}>
            {Associations.length == 0 ?
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <View style={{
                        borderStyle: "solid",
                        borderRadius: 10,
                        borderColor: "#999999",
                        borderWidth: 3,
                        margin: 20
                    }}>
                        <Text style={[Style.assoText, Style.noAssoText]}>You have not joined any associations yet, press the button below to join an association</Text></View>
                    <Pressable onPress={() => setEnterModalVisible(true)} style={Style.addAssociation}><Ionicons name="ios-add-circle-outline" size={60} color={colorTheme.firstColor} /></Pressable>
                </View> :
                <FlatList
                    data={Associations}
                    style={Style.expandFlatlist}
                    onRefresh={() => loadData(token)}
                    refreshing={isRefreshing}
                    ListFooterComponent={
                        <Pressable onPress={() => setEnterModalVisible(true)} style={Style.addAssociation}><Ionicons name="ios-add-circle-outline" size={60} color={colorTheme.firstColor} /></Pressable>
                    }
                    renderItem={
                        ({ item }) =>
                            <View style={[Style.assoFlatView, Style.shadowProp]}>
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
                                        data={item['bookobjects']}
                                        style={{}}
                                        horizontal={true}
                                        renderItem={
                                            ({ item }) => (
                                                <Pressable onPress={() => {
                                                    console.log(item['objectId'])
                                                    navigation.navigate("BookableObject", { id: item['objectId'] })
                                                }} style={Style.bookObject}>
                                                    <Text>{item['objectName']}</Text>
                                                </Pressable>
                                            )
                                        }
                                        
                                    >

                                    </FlatList>
                                </View>
                            </View>}
                >
                </FlatList>
            }
            <PopUpModalEnterKey />
            <PopUpModalConfirm />
            <PopUpModalError />

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
                {/* {Associations.length == 0 ? null : <Pressable onPress={() => setEnterModalVisible(true)} style={Style.addAssociation}><Ionicons name="ios-add-circle-outline" size={60} color="#4d70b3" /></Pressable>} */}
            
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        marginTop: 100,
        backgroundColor: "red"
    }
});