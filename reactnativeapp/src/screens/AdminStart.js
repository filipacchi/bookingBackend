
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
import { ActivityIndicator } from "react-native-paper";

export default function Associations() {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(true)
    const [isRefreshing, setIsRefreshing] = useState(true)
    const [token, setToken] = useState("")
    const [Associations, setAssociation] = useState([])

    //  this.focusListener = navigation.addListener('focus', () => {
    //      let access_token = SecureStore.getItemAsync('userToken')
    //      loadData(access_token)
    // });
    // DETTA REFRECHAR NÄR DU GÅR TBX TILL SIDAN MEN VERKAR SKAPA EN LOOP... INTE BRA!

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

    if(isLoading) {
        return(
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}><ActivityIndicator/></View>
            
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
                }}>
                    <Text style={[Style.assoText, Style.noAssoText]}>You are not admin for any associations, if this is incorrect contact the bookease team</Text></View>
                </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#dcdcdc" }}>
            <FlatList
                data={Associations}
                style={Style.expandFlatlist}
                onRefresh={() => loadData(token)}
                refreshing={isRefreshing}
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
                                    data={item['bookobjects']}
                                    style={{}}
                                    horizontal={true}
                                    ListFooterComponent={
                                        <Pressable onPress={() => {
                                            navigation.navigate("AddBookableObject", {associationId: item['id']})
                                            console.log(item.id)
                                        }} style={Style.addObject}>
                                            <Ionicons name="ios-add-circle-outline" size={25} color="black" />
                                            </Pressable>
                                      }
                                    renderItem={
                                        ({item}) => (
                                            <Pressable onPress={() => {
                                                console.log('HÄR HAR VI OBJECT ID:'+item['objectId'])
                                                navigation.navigate("EditBookableObject",{objectId: item['objectId'],})
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