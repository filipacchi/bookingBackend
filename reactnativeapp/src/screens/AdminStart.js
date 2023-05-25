
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
import base64 from 'react-native-base64'


export default function Associations() {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(true)
    const [isRefreshing, setIsRefreshing] = useState(true)
    const [token, setToken] = useState("")
    const [Associations, setAssociation] = useState([])
    const [image, setImage] = useState(null);
    const [isImageLoaded, setIsImageLoaded] = React.useState(false)

    //  this.focusListener = navigation.addListener('focus', () => {
    //      let access_token = SecureStore.getItemAsync('userToken')
    //      loadData(access_token)
    // });
    // DETTA REFRECHAR NÄR DU GÅR TBX TILL SIDAN MEN VERKAR SKAPA EN LOOP... INTE BRA!

      const loadData = () => {
        async function getUserAssociation() {

            axios.get('user/association/get'
            )
                .then(async (response) => {
                    const updatedData = [];
                    for (let i = 0; i < response.data.length; i++) {
                      console.log('INUTI FOR LOOP');
                      console.log(response.data[i].profile_image);
                      console.log(response.data[i].id);
            
                      let item = response.data[i];
                      try {
                        let profileImage = await getImage(item.id);
            
                        item.profile_image = profileImage;
            
                        console.log(item.profile_image);
                      } catch (error) {
                        console.log(error);
                      }
            
                      updatedData.push(item);
                    }
            
                    console.log('UTANFÖR FOR LOOP');

                    setAssociation(updatedData);
                  })
                  .catch(error => {
                    console.log(error);
                  })
                  .finally(() => {
                    setIsLoading(false);
                    setIsRefreshing(false);
                  });
              }
        getUserAssociation()
    }

    const getImage = async (associationId) => {
        return new Promise((resolve, reject) => {
        axios.get(`association/get/${associationId}`, { responseType: "arraybuffer" }
        )
            .then(response => {
              let uintArray = new Uint8Array(response.data);
        
              let chunkSize = 65536; 
              let chunks = Math.ceil(uintArray.length / chunkSize);
        
              let chunkArray = [];
               for (let i = 0; i < chunks; i++) {
                 let start = i * chunkSize;
                 let end = start + chunkSize;
                 let chunk = Array.from(uintArray.slice(start, end));
                 chunkArray.push(chunk);
               }
        
               let base64Chunks = chunkArray.map((chunk) =>
               base64.encode(String.fromCharCode(...chunk))
               );
               let base64string = base64Chunks.join('');
        

              //base64string = base64.encode(String.fromCharCode(...uintArray))
                contentType = response.headers['content-type']
                url = "data:" + contentType + ";base64," + base64string
                resolve(url);
                console.log('SÄTTER NY BILD')
            })
            .catch(error => {
                console.log(error);
                reject(error);
            }).finally(()=>setIsImageLoaded(true))
        });
    }

    React.useEffect(() => {
        loadData()
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
                                            navigation.navigate("AssociationInformation", {associationId: item['id'], associationName: item['name'], associationKey: item['join_key']})
                                            console.log("AssociationInformation: " + 'associationId: ' + item['id'] + ' associationName: ' + item['name'])
                                        }} style={Style.assoView}>
                                            <View style={{/* alignSelf: 'left', */ width: 45, height: 45}}>
                                            {item.profile_image != null ?
                                                (<Image
                                                    style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: 75,
                                                    alignSelf: 'center'
                                                    }}
                                                    source={{
                                                    uri: item.profile_image,
                                                    }}
                                                />):(
                                 <AntDesign name="home" size={28} color={"#222222"} />)}
                                 </View>
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
                                            console.log('HÄR HAR VI ASSOCIATIONS IDT: ' + item['id'])
                                            navigation.navigate("AddBookableObject", {associationId: item['id']})
                                            console.log(item.id)
                                        }} style={Style.addObject}>
                                            <Ionicons name="ios-add-circle-outline" size={25} color="black" />
                                            </Pressable>
                                      }
                                    renderItem={
                                        ({item}) => (
                                            <Pressable onPress={() => {
                                                console.log('HÄR HAR VI OBJECT ID: ' + item['objectId'] + ' HÄR HAR VI ASSOCIATIONS NAMNET: ' + item['name'] + ' HÄR HAR VI ASSOCIATIONS IDT: ' + item['id'])
                                                navigation.navigate("EditBookableObject",{objectId: item['objectId'], associationName: item['name'], associationId: item['id']})
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