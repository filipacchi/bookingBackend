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
import jwt_decode from "jwt-decode";
import { AuthContext } from "../../../auth/UserContextProvider";


export default function ScheduleAdmin() {

    const { state, colorTheme } = useContext(AuthContext)
    const [token, setToken] = useState("")

    const [selectedDate, setSelectedDate] = useState(moment());
    const [selectedDay, setSelectedDay] = useState(moment())
    const [selectedTime, setSelectedTime] = useState()
    const [associationsLoading, setAssociationsLoading] = useState(true)
    const [bookingsLoading, setBookingsLoading] = useState(false) /* sätt true */
    const [isRefreshing, setIsRefreshing] = useState(true)

    /* Kalle */
    const [currentIndex, setCurrentIndex] = useState(0)
    const [myAssociationsWithBO, setMyAssociationsWithBO] = useState([])
    const [allBookings, setAllBookings] = useState()

    const [swiperIndex, setSwiperIndex] = useState(0)
    const swiper = useRef(null)
    const [noSwipe, setNoSwipe] = useState(false)

    const opacityAnimation = useRef(new Animated.Value(0)).current;
    const opacityStyle = { opacity: opacityAnimation };
    const [user, setUser] = useState()
    const [ConfirmModalVisible, setConfirmModalVisible] = useState(false)
    const { authContext  } = useContext(AuthContext)
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



    const loadData = async (token, daterange) => {
        console.log("---- Inuti loadData (ScheduleAdmin.js), token = " + token)
        

        async function getAssociationsWithBO() {
            axios.get('user/association/get')
            .then(response => {
                console.log("mina associations och bokningsbara objekt:")
                console.log(response.data)

                setMyAssociationsWithBO(response.data)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                setAssociationsLoading(false)
            })
        }

        async function getAllBookings(token, object) {
            /* behöver objekten / associationen */
            axios.get('book/get/object/daterange/' + object.id + "/" + sdate + "/" + edate)
                .then(response => {
                    console.log("response from getAllBookings: ")
                    console.log(response.data)

                    setAllBookings(response.data)
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    setBookingsLoading(false)
                })
        }

        getAssociationsWithBO()
        getAllBookings()
        setIsRefreshing(false)

        /* getAllBookings(token) */
    }

    const loadWeek = async (objectid, startDate) => {

        let sdate = startDate.format().slice(0, 10)
        let edate = startDate.add(1, "months").format().slice(0, 10)
        let returnValue = await loadData(objectid, sdate, edate)
        setTimeSlots(returnValue)
        /* for (let index = 0; index < updatedWeekDates.length; index++) {

            let returnValue = await loadData(objectid, updatedWeekDates[index].format().slice(0, 10))

            tempBookArray.push(returnValue[0])
            tempTimeSlotArray.push(returnValue[1])
        } */
        /* setTimeSlotsWeekArray(tempTimeSlotArray) */
        setAssociationsLoading(false)
    }

    React.useEffect(() => {
        const getToken = async () => {
            let access_token = await SecureStore.getItemAsync('userToken')
            console.log("ASSO: " + access_token)
            setToken(access_token)
            loadData(token)
        }
        getToken()

    }, [])


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

    useEffect(() => {
        console.log(selectedDay.format().slice(0, 10))
        setSelectedDate(selectedDay.format().slice(0, 10))
    }, [selectedDay])

    const addBookableObject = async (bodyParameters) => {
        axios.post('book/add/',
            bodyParameters
        )
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            });
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
                                <Pressable onPress={() => {bookTime(), setConfirmModalVisible(false)}} style={[Style.modalButton, { backgroundColor: "green" }]}><Text style={{ color: "white" }}>{t("Yes")}</Text></Pressable>
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
            <View style={ {flex: 1}}>
                <SelectList 
                /* placeholder={myAssociationsWithBO[currentIndex].name} */
                placeholder={myAssociationsWithBO[currentIndex].name}
                editable={false}

                setSelected={ (key) => {
                    setCurrentIndex(key)
                }}


                data={getAssociationNames(myAssociationsWithBO)}
                /* data={myAssociationsWithBO["bookobjects"]} */>


                </SelectList>
                <WeekCalendar 
                selectedDay={selectedDay} 
                setSelectedDay={setSelectedDay} />
                
                <View style={{ padding: 20 }}>
                    <Pressable onPress={() => setConfirmModalVisible(true)} style={[Style.pressableBook]}><Text style={Style.pressableText}>Boka</Text></Pressable>
                </View>
                <PopUpModalConfirm />
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

                /* skapa getcurrentIndex som använder ID */
                <FlatList
                    data={myAssociationsWithBO[currentIndex]["bookobjects"]}
                    style={Style.expandFlatlist}
                    onRefresh={() => loadData(token)}
                    refreshing={isRefreshing}
                    renderItem={({ item }) => {
                        console.log("från renderItem, myAssociationsWithBO[currentIndex]['bookobjects']: ")
                        console.log(myAssociationsWithBO[currentIndex]["bookobjects"])

                        return(
                            <View style={[Style.assoFlatView, Style.shadowProp]}>
                                <View style={Style.assoView}>
                                    <View style={{alignSelf: 'left', width: 45, height: 45}}>
                                        <AntDesign name="pushpino" size={28} color={"#222222"} />
                                    </View>
                                    <View>
                                        <Text suppressHighlighting={true} style={Style.assoText}> {item["objectName"]} </Text>
                                        <Text style={{ color: "#767676" }}> {item.region} </Text>
                                    </View>
                                </View>
                                <View style={Style.assoDarkView}>
                                    <FlatList
                                        data={allBookings}
                                        style={{}}
                                        horizontal={true}
                                        renderItem={
                                            ({ item }) => (

                                                
                                                <Pressable 
                                                onPress={() => {}} 
                                                style={Style.bookObject}>
                                                    <Text>{item['objectName']}</Text>
                                                </Pressable>
                                            )
                                        }
                                        
                                    >

                                    </FlatList>
                                </View>
                            </View>)}}
                >
                </FlatList>
            }

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
        
        <Text>{currentIndex}</Text>
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