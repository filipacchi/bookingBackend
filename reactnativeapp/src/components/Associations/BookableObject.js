import React from "react";
import { View, Text, Pressable, StyleSheet, FlatList, SafeAreaView, StatusBar } from "react-native";
import LottieView from "lottie-react-native";
import { useEffect, useState, useRef, useContext } from "react";
import axios from "../../../axios/axios";
//import { Calendar, CalendarProvider, WeekCalendar} from "react-native-calendars";
import SwipeableCalendar from "../Misc/SwipeableCalendar";
import BookablesView from "./BookablesView";
import Swiper from 'react-native-swiper'
import BookObjectComponent from "./BookObjectComponent";
import moment from 'moment';
import { ActivityIndicator } from "react-native-paper";
import Style from "../../screens/Style";
import { Animated } from "react-native"
import jwt_decode from "jwt-decode";
import { AuthContext } from "../../../auth/UserContextProvider";
import IOSPopup from "../Misc/PopUp";


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
    const { colorTheme, authContext } = useContext(AuthContext)
    const { t } = authContext
    const [popupVisible, setPopupVisible] = useState(false);

    const delBookingAxios = async () => {
        let data = {
            booking_object: route.params.id,
            date: selectedDate,
            start_time: selectedCancelTime.slice(0, 5),
            end_time: selectedCancelTime.slice(8, 13)
        }
        axios.delete('book/delete/',
            { data }
        )
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleButtonPress = (index) => {
        if (index === 0) { // Yes button pressed
            bookTime()
            setPopupVisible(false);
        }

        console.log('Button Pressed:', index);
        console.log('Popup Cancelled: ' + selectedTime);
        setPopupVisible(false);
    };

    const handleDeleteButtonPress = (index) => {
        if (index === 0) { // Yes button pressed
            setPopupVisible(false);
            delBookingAxios()
        }

        console.log('Button Pressed:', index);
        console.log('Popup Cancelled: ' + selectedCancelTime.slice(8, 13));
        setPopupVisible(false);
    };

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
    }, [selectedDay])



    const loadData = async (objectId, sdate, edate) => {
        try {
            const { data: response } = await axios.get('association/bookableobject/bookedtimes/get/' + objectId + "/" + sdate)
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
        if (route.params.token) {
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

    /*  useEffect(() => {
         console.log("BOOKAHEAD: "+route.params.bookAhead)
         setSelectedDate(selectedDay.clone().format().slice(0, 10))
     }, [selectedDay]) */

    const addBookableObject = async (bodyParameters) => {
        axios.post('book/add/',
            bodyParameters
        )
            .then(response => {
                console.log("Responses är: "+response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }

    const bookTime = () => {
        if (selectedTime != null) {
            let startTime = selectedTime.slice(0, 5)
            let endTime = selectedTime.slice(8, 13)
            let bookDate = selectedDay.clone().format().slice(0, 10)
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
                <SwipeableCalendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} bookAhead={route.params.bookAhead} />
                <Animated.View style={[opacityStyle, { flex: 1 }]}>
                    <BookObjectComponent selectedCancelTime={selectedCancelTime} setSelectedCancelTime={setSelectedCancelTime} booked={bookedSlot} selectedDay={selectedDay.clone().format().slice(0, 10)} user={user} timeSlots={timeSlots[selectedDay.clone().format().slice(0, 10)]} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
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
                    <Pressable onPress={() => { if (selectedTime != null) { setPopupVisible(true) } }} style={[Style.pressableBook, { opacity: selectedCancelTime == null ? 1 : 0.5 }]}><Text style={Style.pressableText}>{t("Book")}</Text></Pressable>
                    <Pressable onPress={() => { if (selectedCancelTime != null) { setPopupVisible(true) } }} style={[Style.pressableCancelBook, { opacity: selectedCancelTime == null ? 0.5 : 1 }]}><Text style={Style.pressableText}>{t("Avboka")}</Text></Pressable>
                </View>
                <IOSPopup
                    visible={popupVisible}
                    title={<Text style={{ fontWeight: 200 }}>{selectedCancelTime == null ? t("BookTime") : t("CancelBookTime")}<Text style={{ textDecorationLine: "underline", textAlign: "center", fontWeight: 500 }}>{selectedCancelTime == null ? selectedTime : selectedCancelTime}</Text></Text>}
                    hasInput={false}
                    buttonTexts={['Yes', 'No']}
                    buttonColor={colorTheme.firstColor}
                    onButtonPress={selectedCancelTime == null ? handleButtonPress : handleDeleteButtonPress}
                    onCancelPress={selectedCancelTime == null ? handleButtonPress : handleDeleteButtonPress}
                />
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