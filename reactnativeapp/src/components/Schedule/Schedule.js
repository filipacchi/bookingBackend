
import { StyleSheet, View, Text, Pressable, FlatList, TouchableOpacity, TextComponent, Modal } from "react-native"
import React, { useEffect, useRef, useState, useContext } from 'react';
import * as styles1 from "reactnativeapp/src/screens/Style.js"
import axios from "../../../axios/axios";
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from "@react-navigation/native";
import Style from "../../screens/Style";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { Swipeable } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from "../../../auth/UserContextProvider";
import { Item } from "./Item";
import base64 from 'react-native-base64'



export default function Schedule() {

    myBookings = {}
    const [ConfirmModalVisible, setConfirmModalVisible] = useState(true)
    const navigation = useNavigation()
    const [token, setToken] = useState("")
    const [isRefreshing, setIsRefreshing] = useState(true)
    const { colorTheme } = useContext(AuthContext)
    const { authContext  } = useContext(AuthContext)
    const {t, signOut} = authContext
    const [bookedTimes, setBookedTimes] = useState([])
    const [selectedTime, setSelectedTime] = useState("")
    React.useEffect(() => {
        console.log("Inuti React.useEffect")
        const getToken = async () => {
            console.log("--- inuti getToken i React.useEffect ---")
            let access_token = await SecureStore.getItemAsync('userToken')
            console.log("ASSO: " + access_token)
            setToken(access_token)
            loadData(access_token)
        }
        getToken()
    }, [])

    const sortObjectsByDate = ((objects) => {
        return objects.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))

    })

    const loadData = ((token) => {
        console.log("---- Inuti loadData (Schedule.js), token = " + token)

        async function getUserBookings(token) {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }

            axios.get('user/bookedtimes/get',
                config
            )
                .then(async (response) => {
                    console.log("response: ")
                    console.log(response.data)
                    console.log("response 2: ")
                    console.log(response.data[0].associationId)

                    const updatedData = [];
                    for (let i = 0; i < response.data.length; i++) {
                      console.log('INUTI FOR LOOP');
                      console.log(response.data[i].profile_image);
                      console.log(response.data[i]);
            
                      let item = response.data[i];
                      try {
                        console.log(item.associationId)
                        let profileImage = await getImage(item.associationId);
            
                        item.profile_image = profileImage;
            
                        console.log(item.profile_image);
                      } catch (error) {
                        console.log(error);
                      }
            
                      updatedData.push(item);
                    }
            
                    console.log('UTANFÖR FOR LOOP');
                    setBookedTimes(sortObjectsByDate(updatedData))
                    setIsRefreshing(false)
                })
                .catch(error => {
                    console.log(error);
                });
        }
        getUserBookings(token)
        console.log(bookedTimes)
        setIsRefreshing(false)
    })

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
            }).finally()
        });
    }


    /* useEffect(()=>{

    }) */



    const openComp = (ind) => {
        //OM BARA EN SKA KUNNA VARA ÖPPEN SAMTIDIGT
        let tempData = bookedTimes
        tempData.map((item, index) => {
            if(index == ind) {
                item.opened = true
            } else {
                item.opened = false
            }
        })
        let temp = []
        tempData.map((item) => {
            temp.push(item)
        })
        setBookedTimes(temp)
    }

    const delBookingAxios = async (ind) =>{
        let booking = bookedTimes[ind]
        let data = {
            booking_object: booking["bookingObjectKey"],
            date: booking["date"],
            start_time: booking["startTime"],
            end_time: booking["endTime"]
        }
        axios.delete('book/delete/',
            {data}
        )
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }

    const deleteBooking = (ind) => {
        delBookingAxios(ind)
        let tempData = bookedTimes
        let temp = []
        tempData.map((item, index) => {
            if(index != ind) {
                temp.push(item)
            } 
        })
        setBookedTimes(temp)
    }

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles1.text}></Text>
            <FlatList
                data={bookedTimes}
                style={Style.expandFlatlist}
                onRefresh={() => { console.log("från onRefresh i FlatList"); loadData(token) }}
                refreshing={isRefreshing}
                renderItem={
                    ({ item, index }) => {
                        return <Item item={item} index={index} onComponentOpen={(x)=>{
                            openComp(x)
                        }}
                        onDelete={(x, y)=> {
                            deleteBooking(x)
                        }}
                        />
                    }
                       
                }
            ></FlatList>
            <Pressable onPress={() => signOut()} style={[Style.button, { position: 'absolute', bottom: '2%', backgroundColor: 'red' }]}><Text style={Style.buttonText}>{t("LogOut")}</Text></Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        marginTop: 100,
        backgroundColor: "red"
    }
});