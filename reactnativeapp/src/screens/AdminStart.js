
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native"
import { useState } from "react";
import React, {useContext} from 'react';
import axios from "reactnativeapp/axios/axios.js";
import { Ionicons } from '@expo/vector-icons';
import Style from "reactnativeapp/src/screens/Style.js";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import base64 from 'react-native-base64'
import IOSPopup from "reactnativeapp/src/components/Misc/PopUp";
import { AuthContext } from "../../auth/UserContextProvider";


export default function Associations() {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(true)
    const [isRefreshing, setIsRefreshing] = useState(true)
    const [token, setToken] = useState("")
    const [Associations, setAssociation] = useState([])
    const [isImageLoaded, setIsImageLoaded] = React.useState(false)


    const { authContext, colorTheme } = useContext(AuthContext)
    const { t } = authContext
    
    const [errorText, setErrorText] = useState()
    const [errorPopUpVisible, setErrorPopUpVisible] = useState(false)

    //  this.focusListener = navigation.addListener('focus', () => {
    //      let access_token = SecureStore.getItemAsync('userToken')
    //      loadData(access_token)
    // });
    // DETTA REFRECHAR NÄR DU GÅR TBX TILL SIDAN MEN VERKAR SKAPA EN LOOP... INTE BRA!

      const loadData = () => {
        async function getUserAssociation() {

            axios.get('user/association/with/bookableobjects/get'
            )
            .then(async (response) => {
                    const updatedData = [];
                    for (let i = 0; i < response.data.length; i++) {
                        
                        
                        
            
                        let item = response.data[i];
                        if (item.profile_image != null){
                    try {
                        let profileImage = await getImage(item.id);
            
                        item.profile_image = profileImage;
            
                        
                    } catch (error) {
                        
                    }}
                    
                    updatedData.push(item);
                }
                
                
                
                setAssociation(updatedData);
            })
            .catch(error => {
                setErrorText(t('RequestFailed') + error.response.status.toString())
                setErrorPopUpVisible(true)
                
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
            .finally(()=>setIsImageLoaded(true))
        });
    }

    React.useEffect(() => {
        loadData()
    }, [])

    const handlePopupClosePress = () => {
        
        setErrorPopUpVisible(false)
    }


    if(isLoading) {
        return(
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator/>
            </View>
            
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
                    <Text style={[Style.assoText, Style.noAssoText]}>{t("NotAdminYet")}</Text></View>
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
                            <TouchableOpacity onPress={() => {
                                            navigation.navigate("AssociationInformation", {associationId: item['id'], associationName: item['name'], associationKey: item['join_key'], associationImage: item['profile_image']})
                                            
                                        }} style={Style.assoView}>
                                            <View style={{width: 45, height: 45}}>
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
                            </TouchableOpacity>
                            <View style={Style.assoDarkView}>
                                <FlatList
                                    data={item['bookobjects']}
                                    style={{}}
                                    horizontal={true}
                                    ListFooterComponent={
                                        <TouchableOpacity onPress={() => {
                                            
                                            navigation.navigate("AddBookableObject", {associationId: item['id']})
                                            
                                        }} style={Style.addObject}>
                                            <Ionicons name="ios-add-circle-outline" size={25} color="black" />
                                            </TouchableOpacity>
                                      }
                                    renderItem={
                                        ({item}) => (
                                            <TouchableOpacity onPress={() => {
                                                
                                                navigation.navigate("EditBookableObject",{objectId: item['objectId'], associationName: item['name'], associationId: item['id']})
                                            }} style={Style.bookObject}>
                                                <Text>{item['objectName']}</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                >
                                </FlatList>
                            </View>
                        </View>}
            >
            </FlatList>
            <IOSPopup
            visible={errorPopUpVisible}
            title={t("Error")}
            hasInput={false}
            bodyText={errorText}
            buttonTexts={[t('PopupCancel')]}
            buttonColor={colorTheme.firstColor}
            onButtonPress={handlePopupClosePress}
            onCancelPress={handlePopupClosePress} />
        </View>
    )
}