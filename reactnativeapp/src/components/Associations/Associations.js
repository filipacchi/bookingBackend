
import { StyleSheet, View, Text, Pressable, TextInput, TouchableOpacity, SafeAreaView, Image, FlatList, Modal, Button } from "react-native"
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
import base64 from 'react-native-base64'
//import * as AllLangs from "reactnativeapp/language/AllLangs.js"
import IOSPopup from 'reactnativeapp/src/components/Misc/PopUp.js';


export default function Associations() {

    const navigation = useNavigation()
    const { state, colorTheme, authContext  } = useContext(AuthContext)
    const {t} = authContext

    /* const [userLanguage, setUserLanguage] = useContext(userLanguageContext)
    const [languagePackage, setLanguagePackage] = useContext(userLanguageContext) */

    const [isFocused, setIsFocused] = useState(false)
    const [inputText, setInputText] = useState("")
    const [isRefreshing, setIsRefreshing] = useState(true)
    const [joinAssociationName, setJoinAssociationName] = useState("No Association")
    const [isLoading, setIsLoading] = useState(true)
    const [image, setImage] = useState(null);
    const [isImageLoaded, setIsImageLoaded] = React.useState(false)
    const [token, setToken] = useState("")
    const [Associations, setAssociation] = useState([])
    const [popupVisible, setPopupVisible] = useState(false);
    const [confirmPopupVisible, setConfirmPopupVisible] = useState(false)
    const [inputValue, setInputValue] = useState('');
    const [errorPopupVisible, setErrorPopupVisible] = useState(false)

    const handleButtonPress = (index) => {
        if (index === 0) { // Yes button pressed
          console.log('Input Value:', inputValue);
          checkKeyMatch(inputValue)
        }
        console.log('Button Pressed:', index);
        setPopupVisible(false);
      };
    
      const handleCancelPress = () => {
        console.log('Popup Cancelled');
        setPopupVisible(false);
      };

      const handleConfirmButtonPress = (index) => {
        if (index === 0) { // Yes button pressed
            JoinAssociation()
        }
        console.log('Button Pressed:', index);
        setConfirmPopupVisible(false);
      };
    
      const handleConfirmCancelPress = () => {
        console.log('Popup Cancelled');
        setConfirmPopupVisible(false);
      };

      const handleErrorButtonPress = (index) => {
        if (index === 0) { // Yes button pressed
            setPopupVisible(true);
        }
        console.log('Button Pressed:', index);
        setErrorPopupVisible(false);
      };
    
      const handleErrorCancelPress = () => {
        console.log('Popup Cancelled');
        setErrorPopupVisible(false);
      };

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
            })
            .finally(() => setIsImageLoaded(true))
        });
    }

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
            .then(async (response) => {
                const updatedData = [];
                for (let i = 0; i < response.data.length; i++) {
                  console.log('INUTI FOR LOOP');
                  console.log(response.data[i].profile_image);
                  console.log(response.data[i].id);
        
                  let item = response.data[i];
                  try {
                    // Call the getImage function and await the result
                    let profileImage = await getImage(item.id);
        
                    // Update the profile_image of the captured data item
                    item.profile_image = profileImage;
        
                    // Debugging: Verify the correct profile_image is set
                    console.log(item.profile_image);
                  } catch (error) {
                    console.log(error);
                  }
        
                  updatedData.push(item);
                }
        
                console.log('UTANFÖR FOR LOOP');
                // Update the state with the updated data
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
            }).finally()
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
                setConfirmPopupVisible(true)
            })
            .catch(error => {
                console.log(error);
                setErrorPopupVisible(true)
            })
            .finally(() => {
                setIsLoading(false)

            })
    }


    const checkKeyMatch = (tI) => {
        setInputText(tI)
        GetAssociation(tI)
    }

    let tempInput = ""
    const handleChangeText = ((newText) => {
        tempInput = newText
        console.log(tempInput)
    })

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
                        <Text style={[Style.assoText, Style.noAssoText]}>{t("YouHaveNotJoined")}</Text></View>
                    <Pressable onPress={() => setPopupVisible(true)} style={Style.addAssociation}><Ionicons name="ios-add-circle-outline" size={60} color={colorTheme.firstColor} /></Pressable>
                </View> :
                <FlatList
                    data={Associations}
                    style={Style.expandFlatlist}
                    onRefresh={() => loadData(token)}
                    refreshing={isRefreshing}
                    ListFooterComponent={
                        <Pressable onPress={() => setPopupVisible(true)} style={Style.addAssociation}><Ionicons name="ios-add-circle-outline" size={60} color={colorTheme.firstColor} /></Pressable>
                    }
                    renderItem={
                        ({ item }) =>{
                        return(
                            <View style={[Style.assoFlatView, Style.shadowProp]}>
                                <View style={Style.assoView}>
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
                                        <Text suppressHighlighting={true} style={Style.assoText}> {item.name} </Text>
                                        <Text style={{ color: "#767676" }}> {item.region} </Text>
                                    </View>
                                </View>
                                <View style={Style.assoDarkView}>
                                    <FlatList
                                        data={item['bookobjects']}
                                        style={{}}
                                        horizontal={true}
                                        renderItem={
                                            ({ item }) => (
                                                <TouchableOpacity onPress={() => {
                                                    console.log(item['objectId'])
                                                    navigation.navigate("BookableObject", {name: item['objectName'] ,id: item['objectId'], bookAhead: item['bookAheadWeeks'], token: state.userToken })
                                                }} style={Style.bookObject}>
                                                    <Text>{item['objectName']}</Text>
                                                </TouchableOpacity>
                                            )
                                        }
                                        
                                    >
                                        

                                    </FlatList>
                                </View>
                            </View>)}}
                >
                </FlatList>
            }

            <IOSPopup
            visible={popupVisible}
            title={t("EnterAssociationKey")}
            placeholder="Ex: 123456"
            hasInput={true}
            buttonTexts={['Join', 'Cancel']}
            buttonColor={colorTheme.firstColor}
            inputValue={inputValue}
                setInputValue={setInputValue}
            onButtonPress={handleButtonPress}
            onCancelPress={handleCancelPress}/>

            <IOSPopup
            visible={confirmPopupVisible}
            title={<Text style={{fontWeight:200}}>{t("DoYouWantToJoin")}<Text style={{fontWeight:500}}>{joinAssociationName}</Text></Text>} 
            hasInput={false}
            buttonTexts={['Yes', 'No']}
            buttonColor={colorTheme.firstColor}
            onButtonPress={handleConfirmButtonPress}
            onCancelPress={handleConfirmCancelPress}/>

            <IOSPopup
            visible={errorPopupVisible}
            title={<Text style={{fontWeight:200}}>{t("TryAgain")}</Text>} 
            hasInput={false}
            buttonTexts={['Yes', 'No']}
            buttonColor={colorTheme.firstColor}
            onButtonPress={handleErrorButtonPress}
            onCancelPress={handleErrorCancelPress}/>

        </View>
    )
}