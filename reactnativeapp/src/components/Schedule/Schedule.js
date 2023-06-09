
import { StyleSheet, View, Text, FlatList } from "react-native"
import React, { useEffect, useState, useContext } from 'react';
import axios from "../../../axios/axios";
import { useNavigation } from "@react-navigation/native";
import Style from "../../screens/Style";
import { ActivityIndicator } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from "../../../auth/UserContextProvider";
import { Item } from "./Item";
import IOSPopup from "reactnativeapp/src/components/Misc/PopUp";
import base64 from 'react-native-base64'
import moment from 'moment';



export default function Schedule() {

    myBookings = {}
    const navigation = useNavigation()
    const [isRefreshing, setIsRefreshing] = useState(true)
    const { colorTheme } = useContext(AuthContext)
    const { authContext } = useContext(AuthContext)
    const { t, signOut } = authContext
    const [bookedTimes, setBookedTimes] = useState([])

    const [errorText, setErrorText] = useState()
    const [errorPopUpVisible, setErrorPopUpVisible] = useState(false)
    const [isLoading, setisLoading] = useState(false)

    useEffect(() => loadData(), [])

    const sortObjectsByDate = ((objects) => {
        return objects.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))

    })

    const handlePopupClosePress = () => {
        
        setErrorPopUpVisible(false)
    }

    const loadBookingsAndImages = async (data) => {
        const currentDate = moment();
        const updatedData = [];
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            targetDate = moment(item.date).set({ hour: item.endTime.slice(0,2), minute: item.endTime.slice(3,5), second: 0 });
            differenceInMinutes = currentDate.diff(targetDate, 'minutes');
            try {
                
                let profileImage = await getImage(item.associationId);
                item.profile_image = profileImage;
                
            } catch (error) {
                
                /* behöver inte ha pop-up för error på bilderna */
            }

            if (differenceInMinutes <= 0){
                updatedData.push(item);
            }
        }

        
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
                setErrorText(t('RequestFailed') + error.response.status.toString())
                setErrorPopUpVisible(true)
                
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

            contentType = response.headers['content-type']
            url = "data:" + contentType + ";base64," + base64string
            return url
        } catch (e) {
            return e
        }
    }
    const getImage = async (associationId) => {
        try {
            const response = await axios.get(`association/image/get/${associationId}`, { responseType: "arraybuffer" })
            return loadImages(response)
        } catch (error) {
            
            
        } finally {
            setisLoading(false)
        }
    }


    const handleRefresh = async () => {
        try {
            loadData()
        } catch (error) {
            setErrorText(t('RequestFailed') + error.response.status.toString())
            setErrorPopUpVisible(true)
        }
    }

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
        axios.delete('user/booking/delete/',
            { data }
        )
            .then(response => {
                
            })
            .catch(error => {
                
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
            onRefresh={() => { handleRefresh() }}
            refreshing={isRefreshing}
            renderItem={
                ({ item, index }) => {
                    return (<Item item={item} index={index} onComponentOpen={(x) => {
                        
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