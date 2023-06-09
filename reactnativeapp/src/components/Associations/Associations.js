
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native"
import React, { useState, useContext, useEffect } from "react";
import axios from "../../../axios/axios";
import { Ionicons } from '@expo/vector-icons';
import Style from "../../screens/Style";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../auth/UserContextProvider";
import { ActivityIndicator } from "react-native-paper";
import base64 from 'react-native-base64'
import IOSPopup from 'reactnativeapp/src/components/Misc/PopUp.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function Associations() {

    const navigation = useNavigation()
    const { state, colorTheme, authContext } = useContext(AuthContext)
    const { t } = authContext
    const [inputText, setInputText] = useState("")
    const [isRefreshing, setIsRefreshing] = useState(true)
    const [joinAssociationName, setJoinAssociationName] = useState("No Association")
    const [isLoading, setIsLoading] = useState(true)
    const [isImageLoaded, setIsImageLoaded] = React.useState(false)
    const [Associations, setAssociation] = useState([])
    const [popupVisible, setPopupVisible] = useState(false);
    const [confirmPopupVisible, setConfirmPopupVisible] = useState(false)
    const [inputValue, setInputValue] = useState('');
    const [errorPopupVisible, setErrorPopupVisible] = useState(false)

    const handleButtonPress = (index) => {
        if (index === 0) { // Yes button pressed
            
            checkKeyMatch(inputValue)
        }
        
        setPopupVisible(false);
    };

    const handleCancelPress = () => {
        
        setPopupVisible(false);
    };

    const handleConfirmButtonPress = (index) => {
        if (index === 0) { // Yes button pressed
            JoinAssociation()
        }
        
        setConfirmPopupVisible(false);
    };

    const handleConfirmCancelPress = () => {
        
        setConfirmPopupVisible(false);
    };

    const handleErrorButtonPress = (index) => {
        if (index === 0) { // Yes button pressed
            setPopupVisible(true);
        } else {
            setInputValue("")
        }
        
        setErrorPopupVisible(false);
    };

    const handleErrorCancelPress = () => {
        
        setErrorPopupVisible(false);
    };

    const getImage = async (associationId) => {
        return new Promise((resolve, reject) => {
            axios.get(`association/image/get/${associationId}`, { responseType: "arraybuffer" }
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

                    contentType = response.headers['content-type']
                    url = "data:" + contentType + ";base64," + base64string
                    resolve(url);
                    
                })
                .catch(error => {
                    
                    reject(error);
                })
                .finally(() => setIsImageLoaded(true))
        });
    }

    useEffect(() => loadData(), [])

    const loadData = () => {
        async function getUserAssociation() {
            const bodyParameters = {
                key: "value"
            };
            axios.get('user/association/with/bookableobjects/get'
            )
                .then(async (response) => {
                    const updatedData = [];
                    for (let i = 0; i < response.data.length; i++) {
                        
                        
                        

                        let item = response.data[i];
                        if (item.profile_image != null) {
                            try {
                                // Call the getImage function and await the result
                                let profileImage = await getImage(item.id);

                                // Update the profile_image of the captured data item
                                item.profile_image = profileImage;

                                // Debugging: Verify the correct profile_image is set
                                
                            } catch (error) {
                                
                            }
                        }

                        updatedData.push(item);
                    }

                    
                    // Update the state with the updated data
                    setAssociation(updatedData);
                })
                .catch(error => {
                    
                })
                .finally(() => {
                    setIsLoading(false);
                    setIsRefreshing(false);
                });
        }
        getUserAssociation()
    }


    async function JoinAssociation() {
        const bodyParameters = {
            key: "value"
        };
        axios.post('user/association/join/add/' + inputText
        )
            .then(response => {
                
                loadData()
            })
            .catch(error => {
                
            }).finally()
    }

    async function GetAssociation(tI) {

        const bodyParameters = {
            key: "value"
        };
        axios.get('user/association/join/get/' + tI
        )
            .then(response => {
                
                setJoinAssociationName(response.data.name)
                setConfirmPopupVisible(true)
            })
            .catch(error => {
                
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
        
    })

    const emptyFlatComp = () => {
        return (
            <View style={[Style.emptyFlatOuter]}>
                <Ionicons name="ios-home-outline" size={24} color={colorTheme.firstColor} />
                <View style={Style.emptyFlatInner}>
                    <Text style={{ fontWeight: 500, marginBottom: 5 }}>{t('NoAssociations')}</Text>
                    <Text style={{ color: "grey" }}>{t("NoAssociationsMsg")}</Text>
                </View>

            </View>
        )
    }

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><ActivityIndicator /></View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            {
                <FlatList
                    contentContainerStyle={{ marginTop: 10 }}
                    data={Associations}
                    style={Style.expandFlatlist}
                    onRefresh={() => loadData()}
                    refreshing={isRefreshing}
                    ListEmptyComponent={emptyFlatComp}
                    ListFooterComponent={
                        <TouchableOpacity onPress={() => setPopupVisible(true)} style={Style.addAssociation}><MaterialCommunityIcons name="home-group-plus" size={50} color={colorTheme.firstColor}/>{/* <Ionicons name="ios-add-circle-outline" size={60} color={colorTheme.firstColor}/> */}</TouchableOpacity>
                    }
                    renderItem={
                        ({ item }) => {
                            return (
                                <View style={[Style.assoFlatView, Style.shadowProp]}>
                                    <View style={Style.assoView}>
                                        <View style={{/* alignSelf: 'left', */ width: 45, height: 45, justifyContent: "center", alignItems: "center" }}>
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
                                                />) : (
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
                                                        
                                                        navigation.navigate("BookableObject", { name: item['objectName'], id: item['objectId'], bookAhead: item['bookAheadWeeks'], token: state.userToken, perDay: item['slotsPerDay'], perWeek: item['slotsPerWeek'], bookableAfterLast: item['bookableAfterLast']})
                                                    }} style={Style.bookObject}>
                                                        <Text style={{ color: "#1a1a1a" }}>{item['objectName']}</Text>
                                                    </TouchableOpacity>
                                                )
                                            }

                                        >


                                        </FlatList>
                                    </View>
                                </View>)
                        }}
                >
                </FlatList>
            }

            <IOSPopup
                visible={popupVisible}
                title={t("EnterAssociationKey")}
                placeholder="Ex: 123456"
                hasInput={true}
                buttonTexts={[t("PopupJoin"), t("Cancel")]}
                buttonColor={colorTheme.firstColor}
                inputValue={inputValue}
                setInputValue={setInputValue}
                onButtonPress={handleButtonPress}
                onCancelPress={handleCancelPress} />

            <IOSPopup
                visible={confirmPopupVisible}
                title={<View><Text style={{ fontWeight: 200, fontSize: 18, textAlign: "center", marginBottom: 5 }}>{t("DoYouWantToJoin")}</Text><Text style={{ fontWeight: 500, textAlign: "center", fontSize: 18, }}>{joinAssociationName}</Text></View>}
                hasInput={false}
                buttonTexts={[t('Yes'), t('No')]}
                buttonColor={colorTheme.firstColor}
                onButtonPress={handleConfirmButtonPress}
                onCancelPress={handleConfirmCancelPress} />

            <IOSPopup
                visible={errorPopupVisible}
                title={<Text style={{ fontWeight: 200 }}>{t("TryAgain")}</Text>}
                hasInput={false}
                buttonTexts={[t('Yes'), t('No')]}
                buttonColor={colorTheme.firstColor}
                onButtonPress={handleErrorButtonPress}
                onCancelPress={handleErrorCancelPress} />

        </View>
    )
}