import React from "react";
import { View, Text, Pressable, StyleSheet, FlatList, SafeAreaView, StatusBar, Modal } from "react-native";
import LottieView from "lottie-react-native";
import { useEffect, useState, useRef, useContext } from "react";
import axios from "../../../axios/axios";
//import { Calendar, CalendarProvider, WeekCalendar} from "react-native-calendars";
import WeekCalendar from "./WeekCalendar";
import BookablesView from "./BookablesView";
import Swiper from 'react-native-swiper'
import BookObjectComponent from "./BookObjectComponent";
import moment from 'moment';
import { ActivityIndicator } from "react-native-paper";
import Style from "../../screens/Style";
import { Animated } from "react-native"
import jwt_decode from "jwt-decode";
import { AuthContext } from "../../../auth/UserContextProvider";


export default function BookableObject({ route }) {

    const [timeSlots, setTimeSlots] = useState([])
    const [selectedDate, setSelectedDate] = useState(moment());
    const [selectedDay, setSelectedDay] = useState(moment())
    const [selectedTime, setSelectedTime] = useState()
    const [selectedCancelTime, setSelectedCancelTime] = useState()
    const [loading, setLoading] = useState(true)
    const [swiperIndex, setSwiperIndex] = useState(0)
    const swiper = useRef(null)
    const [noSwipe, setNoSwipe] = useState(false)
    const opacityAnimation = useRef(new Animated.Value(0)).current;
    const opacityStyle = { opacity: opacityAnimation };
    const [user, setUser] = useState()
    const [bookedSlot, setBookedSlot] = useState([])
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



    const loadData = async (objectId, sdate, edate) => {
        try {
            const { data: response } = await axios.get('book/get/object/daterange/' + objectId + "/" + sdate + "/" + edate)
            return response
        }

        catch (error) {
            console.log(error);
        }
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
        setLoading(false)
    }

    React.useEffect(() => {
        //loadData(1, selectedDate)
        if (route.params.id) {
            loadWeek(route.params.id, selectedDate)
        }
        if(route.params.token){
            let decoded = jwt_decode(route.params.token)
            setUser(decoded["user_id"])
        }

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
                            <Text style={{ textAlign: "center" }}>{selectedCancelTime == null ? t("BookTime"): t("CancelBookTime")} </Text>
                            <Text style={{ textDecorationLine: "underline", textAlign: "center" }}>{selectedCancelTime == null ? selectedTime : selectedCancelTime}</Text>
                            <View style={{ flexDirection: "row", gap: 30, justifyContent: "center" }}>
                                <Pressable onPress={() => {bookTime(), setConfirmModalVisible(false)}} style={[Style.modalButton, { backgroundColor: "green" }]}><Text style={{ color: "white" }}>{t("Yes")}</Text></Pressable>
                                <Pressable onPress={() => setConfirmModalVisible(false)} style={[Style.modalButton, { backgroundColor: "red" }]}><Text style={{ color: "white" }}>{t("No")}</Text></Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal >
        )
    }

    if (loading) {
        return (
            <View style={{ flex: 1 }}>
                <ActivityIndicator />
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <WeekCalendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
                <Animated.View style={[opacityStyle, { flex: 1 }]}>
                    <BookObjectComponent selectedCancelTime={selectedCancelTime} setSelectedCancelTime={setSelectedCancelTime} booked={bookedSlot} selectedDay={selectedDay.format().slice(0, 10)} user={user} timeSlots={timeSlots[selectedDate]} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
                </Animated.View>
                {/* <Swiper showsPagination={false} ref={swiper} index={0} loop={false} onIndexChanged={(i) => {
                    console.log(noSwipe)
                    if (!noSwipe) {
                        if (i > swiperIndex) {
                            setSelectedDay(moment(selectedDay).add(1, 'days'))
                            setSelectedDayCalendar(moment(selectedDay).add(1, 'days'))
                        } else {
                            setSelectedDay(moment(selectedDay).subtract(1, 'days'))
                            setSelectedDayCalendar(moment(selectedDay).subtract(1, 'days'))
                        }
                    }
                    setSwiperIndex(i)
                    console.log("Indexet är: " + i)

                }
                }>
                    {
                        timeSlotsWeekArray.map((timeSlot, index) => (
                            <BookObjectComponent timeSlots={timeSlot} key={index} />
                        ))
                    }


                </Swiper> */}
                <View style={Style.viewBookButton}>
                    <Pressable onPress={() => {if (selectedTime != null){setConfirmModalVisible(true)}}} style={[Style.pressableBook, {opacity: selectedCancelTime == null ? 1 : 0.5}]}><Text style={Style.pressableText}>Boka</Text></Pressable>
                    <Pressable onPress={() => {if (selectedCancelTime != null){setConfirmModalVisible(true)}}} style={[Style.pressableCancelBook, {opacity: selectedCancelTime == null ? 0.5 : 1}]}><Text style={Style.pressableText}>Avboka</Text></Pressable>
                </View>
                <PopUpModalConfirm />
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