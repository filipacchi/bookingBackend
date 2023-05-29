
import { StyleSheet, View, Text, Pressable, FlatList, TouchableOpacity, TextComponent, Modal } from "react-native"
import React, { useEffect, useRef, useState, useContext } from 'react';
import * as styles1 from "reactnativeapp/src/screens/Style.js"
import axios from "../../../axios/axios";
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from "@react-navigation/native";
import Style from "../../screens/Style";
import { ActivityIndicator } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { Swipeable } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from "../../../auth/UserContextProvider";
import { Item } from "./Item";
import IOSPopup from "reactnativeapp/src/components/Misc/PopUp";
import base64 from 'react-native-base64'



export default function Schedule() {

    myBookings = {}
    const [ConfirmModalVisible, setConfirmModalVisible] = useState(true)
    const navigation = useNavigation()
    const [isRefreshing, setIsRefreshing] = useState(true)
    const { colorTheme } = useContext(AuthContext)
    const { authContext } = useContext(AuthContext)
    const { t, signOut } = authContext
    const [bookedTimes, setBookedTimes] = useState([])
    const [selectedTime, setSelectedTime] = useState("")

    const [errorText, setErrorText] = useState()
    const [errorPopUpVisible, setErrorPopUpVisible] = useState(false)
    const [isLoading, setisLoading] = useState(false)

    useEffect(() => loadData(), [])

    const sortObjectsByDate = ((objects) => {
        return objects.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))

    })

    const handlePopupClosePress = () => {
        console.log("Popup cancel button pressed (Schedule)")
        setErrorPopUpVisible(false)
    }

    const loadBookingsAndImages = async (data) => {
        const updatedData = [];
        for (let i = 0; i < data.length; i++) {

            let item = data[i];
            try {
                console.log(item.associationId)
                let profileImage = await getImage(item.associationId);
                item.profile_image = profileImage;

                //console.log(item.profile_image);
            } catch (error) {
                console.log(error);
            }

            updatedData.push(item);
        }

        console.log('UTANFÖR FOR LOOP');
        setBookedTimes(sortObjectsByDate(updatedData))
        setIsRefreshing(false)
    }

    const loadData = (() => {
        async function getUserBookings() {
            axios.get('user/bookedtimes/get')
                .then(response => {
                    loadBookingsAndImages(response.data)
                })
                .catch(error => {
                    console.log(error);
                });
        }
        getUserBookings()
    })

    const loadImages = async (response) => {
        try {
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
            return url
        } catch (e) {
            return e
        }
    }
    const getImage = async (associationId) => {
        try {
            const response = await axios.get(`association/get/${associationId}`, { responseType: "arraybuffer" })
            return loadImages(response)
        } catch (error) {
            let errorCode = error.response.status.toString()
            if (errorCode != "404") {
                setErrorText(t('RequestFailed') + error.response.status.toString())
                setErrorPopUpVisible(true)
            }
        } finally {
            setisLoading(false)
        }
    }


    /* useEffect(()=>{
     
    }) */



    const openComp = (ind) => {
        //OM BARA EN SKA KUNNA VARA ÖPPEN SAMTIDIGT
        let tempData = bookedTimes
        tempData.map((item, index) => {
            if (index == ind) {
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

    const delBookingAxios = async (ind) => {
        let booking = bookedTimes[ind]
        let data = {
            booking_object: booking["bookingObjectKey"],
            date: booking["date"],
            start_time: booking["startTime"],
            end_time: booking["endTime"]
        }
        axios.delete('book/delete/',
            { data }
        )
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const deleteBooking = (ind) => {
        delBookingAxios(ind)
        let tempData = bookedTimes
        let temp = []
        tempData.map((item, index) => {
            if (index != ind) {
                temp.push(item)
            }
        })
        setBookedTimes(temp)
    }

    if (isLoading) {
        return (
            <View style={{ flex: 1 }}>
                <ActivityIndicator />
            </View>
        )
    }

    const emptyFlatComp = () => {
        return (
            <View style={[Style.emptyFlatOuter]}>
                <MaterialCommunityIcons name="calendar-month-outline" size={24} color={colorTheme.firstColor} />
                <View style={Style.emptyFlatInner}>
                    <Text style={{fontWeight: 500, marginBottom: 5}}>{t('NoBookings')}</Text>
                    <Text style={{color: "grey"}}>{t("HintSchedule")}</Text>
                </View>

            </View>
        )
    }


    return (
        <View style={{ flex: 1 }}>
            <FlatList
            contentContainerStyle={{marginTop:10}}
                data={bookedTimes}
                onRefresh={() => { console.log("från onRefresh i FlatList"); loadData() }}
                refreshing={isRefreshing}
                renderItem={
                    ({ item, index }) => {
                        return (<Item item={item} index={index} onComponentOpen={(x) => {
                            console.log("aiosdjioas");
                            openComp(x)
                        }}
                            onDelete={(x, y) => {
                                deleteBooking(x)
                            }}
                        />)
                    }

                }
                ListEmptyComponent={emptyFlatComp}
                ListFooterComponent={bookedTimes.length == 0 ? null : <Text style={{color: "grey"}}>{t("HintSchedule")}</Text>}
                ListFooterComponentStyle={{justifyContent: "center", alignItems: "center"}}
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

const styles = StyleSheet.create({
    text: {
        marginTop: 100,
        backgroundColor: "red"
    }
});