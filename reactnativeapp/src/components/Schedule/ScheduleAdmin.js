import React from "react";
import { View, Text, Pressable, StyleSheet, FlatList, SafeAreaView, StatusBar, Modal } from "react-native";
import LottieView from "lottie-react-native";
import { SelectList } from 'react-native-dropdown-select-list';
import { useEffect, useState, useRef, useContext } from "react";
import axios from "../../../axios/axios";
import * as SecureStore from 'expo-secure-store';
//import { Calendar, CalendarProvider, WeekCalendar} from "react-native-calendars";
import WeekCalendar from "reactnativeapp/src/components/Associations/WeekCalendar.js";
import moment from 'moment';
import { ActivityIndicator } from "react-native-paper";
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Style from "../../screens/Style";
import { Animated } from "react-native";
import IOSPopup from "reactnativeapp/src/components/Misc/PopUp";
import jwt_decode from "jwt-decode";
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
    const [isRefreshing, setIsRefreshing] = useState(true)
    const [bookableObjectsExist, setBookableObjectsExist] = useState(true)

    /* Kalle */
    const [currentAssoIndex, setcurrentAssoIndex] = useState(0)
    const [myAssociationsWithBO, setMyAssociationsWithBO] = useState([])
    const [allBookings, setAllBookings] = useState()

    const [errorText, setErrorText] = useState()
    const [errorPopUpVisible, setErrorPopUpVisible] = useState(false)

    const [swiperIndex, setSwiperIndex] = useState(0)
    const swiper = useRef(null)
    const [noSwipe, setNoSwipe] = useState(false)

    const opacityAnimation = useRef(new Animated.Value(0)).current;
    const opacityStyle = { opacity: opacityAnimation };
    const [user, setUser] = useState()
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
        console.log(selectedDay.format().slice(0, 10))
        setSelectedDate(selectedDay.format().slice(0, 10))
    }, [selectedDay])
    
    useEffect(() => {
        const afterAssociationChange = async () => {
            console.log("blabla currentAssoIndex")
        }
        loadVariableData()
        
    }, [currentAssoIndex])

    useEffect(() => {
        loadVariableData()
        
        console.log("myAssociationsWithBO updated: ");
        console.log(myAssociationsWithBO);
        
    }, [myAssociationsWithBO])
    
    useEffect(() => {
        console.log("allBookings updated: ");
        console.log(allBookings);
        
        if (allBookings) {
            allBookings.length == 0 ? setBookableObjectsExist(false) : setBookableObjectsExist(true)
        }

        /* if (allBookings) {
            console.log(allBookings[0]["bookedTimes"][selectedDate])
        } */

}, [allBookings])


React.useEffect(() => {
    const getData = async () => {
        let access_token = await SecureStore.getItemAsync('userToken')
        console.log("ASSO: " + access_token)
        setToken(access_token)
        
        loadAssociations(access_token)
    }
    getData()
    
}, [])

const handlePopupCancelPress = () => {
    console.log("Popup cancel button pressed (Schedule)")
    setErrorPopUpVisible(false)
}

const loadVariableData = async () => {
    if (myAssociationsWithBO && myAssociationsWithBO.length > 0) {
        console.log("myAssociationsWithBO INTE falsy")
        loadWeek()
    } else {
        console.log("myAssociationsWithBO falsy")
    }
}

const loadAssociations = async (token) => {
    
    console.log("---- Inuti loadAssociations (ScheduleAdmin.js), token = " + token)
    
    try {
        const { data: response } = await axios.get('user/association/with/bookableobjects/get')
        console.log("response from loadAssociations: ")
        console.log(response)
        
        setMyAssociationsWithBO(response)
    }
        
    catch (error) {
        console.log("ERROR CATCHAT I loadAssociations")
        console.log(error);
        setErrorText(t('RequestFailed') + error.response.status.toString())
        setErrorPopUpVisible(true)
    }

        finally {
            setAssociationsLoading(false)
            setIsRefreshing(false)
        }
    }
    
    const loadBookings = async (sdate, edate) => {
        console.log("myAssociationsWithBO[currentAssoIndex].id från loadBookings: ")
        console.log(myAssociationsWithBO[currentAssoIndex].id)

        try {
            const {data: response} = await axios.get('association/allobjects/bookedtimes/daterange/get/' + myAssociationsWithBO[currentAssoIndex].id + "/" + sdate + "/" + edate)
            console.log("response from getAllBookings: ")
            console.log(response)

            /* setAllBookings(response.data) */
            return(response)
        }
        catch (error) {
            console.log("ERROR CATCHAT I loadBookings")
            console.log(error);
            setErrorText(t('RequestFailed') + error.response.status.toString())
            setErrorPopUpVisible(true)
        }
        finally {
            setBookingsLoading(false)
        }
    }

        /* axios.get('user/association/with/bookableobjects/get')
        .then(response => {
            console.log("mina associations och bokningsbara objekt:")
            console.log(response.data)

            return(response.data)
        })
        .catch(error => {
            console.log("från catch i getAssociationsWithBO: ")
            console.log(error)
        })
        .finally(() => {
            setAssociationsLoading(false)
        }) */


        /* getAllBookings(token) */

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
              console.log("not a valid month")
              return "notvalid"
            }
        }

    const loadWeek = async () => {

        console.log("startDate från loadWeek: ")
        console.log(selectedDate)

        /*  HÄR ÄR PROBLEMET!! */
        let sdate = selectedDate.slice(0, 10)
        /* let edate = selectedDate.add(1, "months").slice(0, 10) */
        /* ger 'TypeError: undefined is not a function' */

        /* let sdate = "2023-05-24" */
        const edate = sdate.slice(0, 5) + addMonth(sdate) + sdate.slice(7, 10);
        
        console.log("sdate från loadWeek: ")
        console.log(sdate)

        console.log("edate från loadWeek: ")
        console.log(edate)

        if (sdate && edate) {
            let loadedBookings = await loadBookings(sdate, edate)
            setAllBookings(loadedBookings)
        } else {
            console.log("ahsdiuhasuidhad")
        }
        
        
        /* setAllBookings(loadedBookings) */

        /* for (let index = 0; index < updatedWeekDates.length; index++) {

            let returnValue = await loadAssociations(objectid, updatedWeekDates[index].format().slice(0, 10))

            tempBookArray.push(returnValue[0])
            tempTimeSlotArray.push(returnValue[1])
        } */
        /* setTimeSlotsWeekArray(tempTimeSlotArray) */
    }


    /*  useEffect(() => {
         if (selectedDayCalendar.diff(selectedDay, 'days') != 0) {
             setNoSwipe(true)
             let diff = selectedDayCalendar.diff(selectedDay, 'days')
             console.log(diff)
             //swiper.current.scrollBy(diff)
             setSelectedDay(selectedDayCalendar)
             setSwipe()
         }
     }, [selectedDayCalendar]) */

    /* const markDate = () => {
        console.log(selectedDay.diff(selectedDayCalendar, 'days'))
    }
 */


    const addBookableObject = async (bodyParameters) => {
        axios.post('user/booking/create/',
            bodyParameters
        )
            .then(response => {
                console.log(response.data)
            })
            .catch( (error) => {
                console.log("ERROR CATCHAT I loadBookings")
                console.log(error);
                setErrorText(t('RequestFailed') + error.response.status.toString())
                setErrorPopUpVisible(true)
            })
    }

    const bookTime = () => {
        if (selectedTime != null) {
            let startTime = selectedTime.slice(0,5)
            let endTime = selectedTime.slice(8,13)
            let bookDate = selectedDay.format().slice(0, 10)
            let bookingObject = route.params.id
            setBookedSlot([selectedTime, bookDate])
            let bodyParameters = {
                start_time: startTime,
                end_time: endTime,
                date: bookDate,
                booking_object: bookingObject
            }

            addBookableObject(bodyParameters)
            
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
                                <Pressable onPress={() => {/* bookTime(),  */ setConfirmModalVisible(false)}} style={[Style.modalButton, { backgroundColor: "green" }]}><Text style={{ color: "white" }}>{t("Yes")}</Text></Pressable>
                                <Pressable onPress={() => setConfirmModalVisible(false)} style={[Style.modalButton, { backgroundColor: "red" }]}><Text style={{ color: "white" }}>{t("No")}</Text></Pressable>
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
            <View style={{ flex: 1 }}>
                <ActivityIndicator />
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <SelectList 
                /* placeholder={myAssociationsWithBO[currentAssoIndex].name} */
                placeholder={myAssociationsWithBO[currentAssoIndex].name}
                editable={false}

                setSelected={ (key) => {
                    setcurrentAssoIndex(key)
                }}


                data={getAssociationNames(myAssociationsWithBO)}
                /* data={myAssociationsWithBO["bookobjects"]} */>


                </SelectList>
                <WeekCalendar 
                selectedDay={selectedDay} 
                setSelectedDay={setSelectedDay} />
                
            </View>

            {/* bokningar */}

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
                    <Pressable onPress={() => setEnterModalVisible(true)} style={Style.addAssociation}><Ionicons name="ios-add-circle-outline" size={60} color={colorTheme.firstColor} /></Pressable>
                </View> : 
                bookableObjectsExist ? 
                <FlatList
                data={allBookings}
                    style={Style.expandFlatlist}
                    onRefresh={() => loadAssociations(token)}
                    refreshing={isRefreshing}
                    renderItem={({ item }) => {
                        console.log("från renderItem, item: ")
                        console.log(item)
                        
                        return(
                            <View style={[Style.assoFlatView, Style.shadowProp]}>
                                <View style={Style.assoView}>
                                    <View style={{/* alignSelf: "left",  */width: 45, height: 45}}>
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
                                        /* data={[1, 2, 3]} */
                                        style={{}}
                                        horizontal={true}
                                        renderItem={
                                            ({ item }) => (
                                                
                                                
                                                <Pressable 
                                                onPress={() => {}} 
                                                style={Style.bookObject}>
                                                    <Text>{item['title']}</Text>
                                                    {/* <Text>{item}</Text> */}
                                                </Pressable>
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
                <Pressable onPress={() => {setConfirmModalVisible(true)}} style={[Style.pressableBook]}>
                    <Text style={Style.pressableText}>{t("Book")}</Text>
                </Pressable>
            </View>
            <PopUpModalConfirm />

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
                {/* {Associations.length == 0 ? null : <Pressable onPress={() => setEnterModalVisible(true)} style={Style.addAssociation}><Ionicons name="ios-add-circle-outline" size={60} color="#4d70b3" /></Pressable>} */}
                
            <IOSPopup
            visible={errorPopUpVisible}
            title={t("Error")}
            hasInput={false}
            /* bodyText={errorText} */
            bodyText={""}
            buttonTexts={[t('PopupCancel')]}
            buttonColor={colorTheme.firstColor}
            onButtonPress={handlePopupCancelPress}
            onCancelPress={handlePopupCancelPress}/>

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