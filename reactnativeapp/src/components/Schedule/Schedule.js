
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



export default function Schedule() {

    myBookings = {}
    const [ConfirmModalVisible, setConfirmModalVisible] = useState(true)
    const navigation = useNavigation()
    const [token, setToken] = useState("")
    const [isRefreshing, setIsRefreshing] = useState(true)
    const { colorTheme } = useContext(AuthContext)
    const { authContext  } = useContext(AuthContext)
    const {t} = authContext
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
                .then(response => {
                    console.log("response: ")
                    console.log(response.data)
                    setBookedTimes(sortObjectsByDate(response.data))
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
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        marginTop: 100,
        backgroundColor: "red"
    }
});