import React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView, StatusBar, Modal, TouchableOpacity   } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list';
import { useEffect, useState, useRef, useContext } from "react";
import axios from "../../../axios/axios";
import * as SecureStore from 'expo-secure-store';
import WeekCalendar from "reactnativeapp/src/components/Associations/WeekCalendar.js";
import moment from 'moment';
import { ActivityIndicator } from "react-native-paper";
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
import Style from "../../screens/Style";
import { Animated } from "react-native";
import IOSPopup from "reactnativeapp/src/components/Misc/PopUp";
import { AuthContext } from "../../../auth/UserContextProvider";
import SwipeableCalendar from "../Misc/SwipeableCalendar";


export default function ScheduleAdmin() {

    const { colorTheme } = useContext(AuthContext)
    const [token, setToken] = useState("")

    /* datum */
    const [selectedDate, setSelectedDate] = useState(moment());
    const [selectedDay, setSelectedDay] = useState(moment())
    const [selectedTime, setSelectedTime] = useState()

    /* loading */
    const [associationsLoading, setAssociationsLoading] = useState(true)
    const [bookingsLoading, setBookingsLoading] = useState(true) /* sätt true */
    const [refreshLoading, setRefreshLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(true)
    const [bookableObjectsExist, setBookableObjectsExist] = useState(true)

    /* Kalle */
    const [currentAssoIndex, setcurrentAssoIndex] = useState(0)
    const [myAssociationsWithBO, setMyAssociationsWithBO] = useState([])
    const [allBookings, setAllBookings] = useState()

    const [errorText, setErrorText] = useState("")
    const [errorPopUpVisible, setErrorPopUpVisible] = useState(false)


    const opacityAnimation = useRef(new Animated.Value(0)).current;
    const [ConfirmModalVisible, setConfirmModalVisible] = useState(false)
    const { authContext } = useContext(AuthContext)
    const {t} = authContext


    const animateElement = () => {

        Animated.timing(opacityAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            Animated.timing(opacityAnimation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            })
        })
    };

    
    useEffect(() => {
        setSelectedTime(null)
        opacityAnimation.setValue(0)
        animateElement()
    }, [selectedDate])

    useEffect(() => {
        
        setSelectedDate(selectedDay.format().slice(0, 10))
    }, [selectedDay])
    
    useEffect(() => {
        const afterAssociationChange = async () => {
            
        }
        loadVariableData()
        
    }, [currentAssoIndex])

    useEffect(() => {
        loadVariableData()
        
        
        
        
    }, [myAssociationsWithBO])
    
    useEffect(() => {
        
        
        
        if (allBookings) {
            allBookings.length == 0 ? setBookableObjectsExist(false) : setBookableObjectsExist(true)
        }

    }, [allBookings])


React.useEffect(() => {
    const getData = async () => {
        let access_token = await SecureStore.getItemAsync('userToken')
        
        setToken(access_token)
        
        loadAssociations(access_token)
    }
    getData()
    
}, [])

const handleErrorPopupCancelPress = () => {
    
    setErrorPopUpVisible(false)
    setErrorText("")
}

const loadVariableData = async () => {
    if (myAssociationsWithBO && myAssociationsWithBO.length > 0) {
        
        loadWeek()
    } else {
        
    }
}

const loadAssociations = async (token) => {
    
    
    setRefreshLoading(true)

    try {
        const { data: response } = await axios.get('user/association/with/bookableobjects/get')
        
        
        
        setMyAssociationsWithBO(response)
    }
        
    catch (error) {
        setErrorText(t('RequestFailed') + error.response.status.toString())
        setErrorPopUpVisible(true)
    }

        finally {
            setAssociationsLoading(false)
            setIsRefreshing(false)
        }
    }
    
    const loadBookings = async (sdate, edate) => {
        
        

        try {
            const {data: response} = await axios.get('association/allobjects/bookedtimes/daterange/get/' + myAssociationsWithBO[currentAssoIndex].id + "/" + sdate + "/" + edate)
            
            
            return(response)
        }
        catch (error) {
            setErrorText(t('RequestFailed') + error.response.status.toString())
            setErrorPopUpVisible(true)
        }
        finally {
            setBookingsLoading(false)
            setRefreshLoading(false)
        }
    }

        const addMonth = (startDate) => {
            const month = startDate.slice(5, 7)
          
            if (Number(month) <= 8) {
              const incrementedMonth = Number(month) + 1
              return ("0" + incrementedMonth).slice(-2)
          
            } else if (Number(month) <= 11) {
              const incrementedMonth = Number(month) + 1
              return ("0" + incrementedMonth).slice(-2)
          
            } else if (Number(month) === 12) {
              return "01"
          
            } else {
              
              return "notvalid"
            }
        }

    const loadWeek = async () => {

        
        

        let sdate = selectedDate.slice(0, 10)
        const edate = sdate.slice(0, 5) + addMonth(sdate) + sdate.slice(7, 10);
        
        
        

        
        

        if (sdate && edate) {
            let loadedBookings = await loadBookings(sdate, edate)
            setAllBookings(loadedBookings)
        } else {
            
        }
    }

    const PopUpModalConfirm = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={ConfirmModalVisible}
                onRequestClose={() => setConfirmModalVisible(false)}
                >
                <View style={Style.modalWindow}>

                    <View style={Style.modalOuter}>
                        <View style={{ gap: 10 }}>
                            <Text style={{ textAlign: "center" }}>{t("BookTime")} </Text>
                            <Text style={{ textDecorationLine: "underline", textAlign: "center" }}>{selectedTime}</Text>
                            <View style={{ flexDirection: "row", gap: 30, justifyContent: "center" }}>
                                <TouchableOpacity onPress={() => {setConfirmModalVisible(false)}} style={[Style.modalButton, { backgroundColor: "green" }]}><Text style={{ color: "white" }}>{t("Yes")}</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => setConfirmModalVisible(false)} style={[Style.modalButton, { backgroundColor: "red" }]}><Text style={{ color: "white" }}>{t("No")}</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }


    const getAssociationNames = (test) => {
        let namesList = []

        for (let i = 0; i < test.length; i++) {
            namesList[i] = {key: i, value: test[i].name}
        }

        return namesList
    }


    if (associationsLoading || bookingsLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator />
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{justifyContent: "center"}}>

                <SelectList 
                placeholder={myAssociationsWithBO[currentAssoIndex].name}
                /* editable={false} */
                setSelected={ (key) => {
                    setcurrentAssoIndex(key)
                }}
                data={getAssociationNames(myAssociationsWithBO)}
                >
                </SelectList>


                <WeekCalendar 
                selectedDay={selectedDay} 
                setSelectedDay={setSelectedDay} />
                
            </View>

            <View style={{ flex: 1, backgroundColor: "#dcdcdc" }}>

                {myAssociationsWithBO.length == 0 ?
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <View style={{
                        borderStyle: "solid",
                        borderRadius: 10,
                        borderColor: "#999999",
                        borderWidth: 3,
                        margin: 20
                    }}>
                        <Text style={[Style.assoText, Style.noAssoText]}>{t("YouHaveNotJoined")}</Text></View>
                    <TouchableOpacity onPress={() => setEnterModalVisible(true)} style={Style.addAssociation}><Ionicons name="ios-add-circle-outline" size={60} color={colorTheme.firstColor} /></TouchableOpacity>
                </View> : 

                refreshLoading ? 

                <View style={{ flex: 1, marginTop: 20}}>
                    <ActivityIndicator />
                </View>

                :

                bookableObjectsExist ? 
                <FlatList
                data={allBookings}
                    style={Style.expandFlatlist}
                    onRefresh={() => loadAssociations(token)}
                    refreshing={isRefreshing}
                    renderItem={({ item }) => {
                        
                        
                        
                        return(
                            <View style={[Style.assoFlatView, Style.shadowProp]}>
                                <View style={Style.assoView}>
                                    <View style={{width: 45, height: 45}}>
                                        <AntDesign name="pushpino" size={28} color={"#222222"} />
                                    </View>
                                    <View>
                                        <Text suppressHighlighting={true} style={Style.assoText}> {item["bookingObject"]} </Text>
                                        <Text style={{ color: "#767676" }}> {"blabla"} </Text>
                                    </View>
                                </View>
                                <View style={Style.assoDarkView}>
                                    <FlatList
                                        data={item["bookedTimes"][selectedDate]}
                                        style={{}}
                                        horizontal={true}
                                        renderItem={
                                            ({ item }) => (
                                                
                                                
                                                <TouchableOpacity 
                                                onPress={() => {}} 
                                                style={Style.bookObject}>
                                                    <Text>{item['title']}</Text>
                                                </TouchableOpacity>
                                            )
                                        }
                                        
                                    >

                                    </FlatList>
                                </View>
                            </View>)}}
                >
                </FlatList>

                :

                <View style={Style.noBookablesContainer}>
                    <Text style={Style.noBookablesText}>
                        {t("AssoNoBookables")}
                    </Text>
                </View> 
            }

            <View style={{ padding: 10 }}>
                <TouchableOpacity onPress={() => {setConfirmModalVisible(true)}} style={[Style.pressableBook]}>
                    <Text style={Style.pressableText}>{t("Book")}</Text>
                </TouchableOpacity>
            </View>
            <PopUpModalConfirm />
            <IOSPopup
            visible={errorPopUpVisible}
            title={t("Error")}
            hasInput={false}
            bodyText={errorText}
            buttonTexts={[t('PopupCancel')]}
            buttonColor={colorTheme.firstColor}
            onButtonPress={handleErrorPopupCancelPress}
            onCancelPress={handleErrorPopupCancelPress}/>

        </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    input: {
        width: "70%",
        borderRadius: 10,
        borderColor: "#27a5a5",
        borderStyle: "solid",
        justifyContent: "center",
        borderWidth: 2,
        alignItems: "center",
        alignSelf: "center",
        padding: 15,
        flexDirection: "row",
        gap: 10,
        margin: 10
    },
    inputText: {
        color: "#27a5a5",
        fontWeight: 600
    },
    inputCredentials: {
        width: "70%",
        height: 30,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        padding: 15,
        flexDirection: "row",
        gap: 10
    }, calendarStyle: {
        marginTop: 20,
        flex: 1,
    },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },

})