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
import customLoadIcon from "../Misc/customLoadIcon";
import { Skeleton } from "moti/skeleton";
import { MotiView } from "moti";


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
    const [buttonBooked, setButtonBooked] = useState(false)
    const [timeBooked, setTimeBooked] = useState(false)
    const [bookingLoading, setBookingLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const delBookingAxios = async () => {


        console.log("SELECTEDCANCEL: " + selectedCancelTime)
        let data = {
            booking_object: route.params.id,
            date: selectedDay.format().slice(0, 10),
            start_time: selectedCancelTime.slice(0, 5),
            end_time: selectedCancelTime.slice(8, 13)
        }

        try {
            let response = await axios.delete('user/booking/delete/', { data })
            setBookedSlot([])
            setSelectedCancelTime(null)
            setSelectedTime(null)
            loadData()
        } catch (e) {
            console.log(e)
        }
        console.log("Avbokar")

    }


    const handleButtonPress = (index) => {
        if (index === 0) { // Yes button pressed
            bookTime()
        }

        console.log('Button Pressed:', index);
        console.log('Popup Cancelled: ' + selectedTime);
        setPopupVisible(false);
    };

    const handleDeleteButtonPress = (index) => {
        if (index === 0) { // Yes button pressed
            delBookingAxios()
        }

        console.log('Button Pressed:', index);
        //console.log('Popup Cancelled: ' + selectedCancelTime.slice(8, 13));
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
        opacityAnimation.setValue(0)
        animateElement()
    }, [selectedDay])



    const loadData = async () => {
        let objectId = route.params.id
        let sdate = selectedDay.format().slice(0, 10)
        try {
            const { data: response } = await axios.get('association/bookableobject/bookedtimes/get/' + objectId + "/" + sdate)
            setTimeSlots(response)
            setLoading(false)
        }

        catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        //loadData(1, selectedDate)
        if (route.params.token) {
            let decoded = jwt_decode(route.params.token)
            setUser(decoded["user_id"])
        }

    }, [])

    useEffect(() => {
        setLoading(true)
        setBookedSlot([])
        setSelectedCancelTime(null)
        setSelectedTime(null)
        console.log("Inne i UseEFFECT")
        if (route.params.id) {
            console.log("Inne i if")
            loadData()
        }
    }, [selectedDay])

    useEffect(() => {
        setButtonBooked(false)
        if (selectedCancelTime != null) {
            setTimeBooked(true)
        } else {
            setTimeBooked(false)
        }
    }, [selectedTime])
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

    const bookTimeRequest = async (bodyParameters) => {
        try {
            let response = await axios.post('user/booking/create/', bodyParameters)
            setButtonBooked(true)
            setBookedSlot([selectedTime, bodyParameters.date])
            loadData()
            setBookingLoading(false)
        } catch (e) {
            console.log(e)
            setBookingLoading(false)
        }

    }

    const bookTime = () => {
        setBookingLoading(true)
        if (selectedTime != null) {
            let startTime = selectedTime.slice(0, 5)
            let endTime = selectedTime.slice(8, 13)
            let bookDate = selectedDay.clone().format().slice(0, 10)
            let bookingObject = route.params.id
            let bodyParameters = {
                start_time: startTime,
                end_time: endTime,
                date: bookDate,
                booking_object: bookingObject
            }

            bookTimeRequest(bodyParameters)

        }
    }

    const slotSkeleton = () => {
        return (
            <MotiView
                transition={{
                    type: 'timing',
                }}
                style={{ flex: 1, justifyContent: "flex-start", paddingHorizontal: 15, }}
                animate={{ backgroundColor: '#ffffff' }}
            >
                <Spacer />
                <Skeleton transition={{
                    translateX: {
                        // defaults to a 3000ms timing function
                        type: 'timing',
                    },
                        }} 
                        colorMode="light" height={55} width={'100%'} />
                <Spacer height={10} />
                <Skeleton colorMode="light" height={55} width={'100%'} />
                <Spacer height={10} />
                <Skeleton colorMode="light" height={55} width={'100%'} />
                <Spacer />
                <Skeleton colorMode="light" height={55} width={'100%'} />
                <Spacer height={10} />
                <Skeleton colorMode="light" height={55} width={'100%'} />
                <Spacer height={10} />
                <Skeleton colorMode="light" height={55} width={'100%'} />
            </MotiView>
        )
    }

    const Spacer = ({ height = 16 }) => <View style={{ height }} />;
    {/* <ActivityIndicator size={"large"} color={colorTheme.firstColor} /> */ }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <SwipeableCalendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} bookAhead={route.params.bookAhead} />
                <Animated.View style={[opacityStyle, { flex: 1, justifyContent: "center" }]}>
                    {loading ? slotSkeleton() : <BookObjectComponent isLoading={isLoading} setIsLoading={setIsLoading} bookingLoading={bookingLoading} selectedCancelTime={selectedCancelTime} setSelectedCancelTime={setSelectedCancelTime} booked={bookedSlot} selectedDay={selectedDay.clone().format().slice(0, 10)} user={user} timeSlots={timeSlots[selectedDay.clone().format().slice(0, 10)]} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />}
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
                <View style={[Style.viewBookButton]}>
                    <Pressable onPress={() => { if (selectedTime != null && !buttonBooked) { setPopupVisible(true) } }} style={[Style.pressableBook, { backgroundColor: buttonBooked ? "#39e336" : colorTheme.firstColor, opacity: selectedCancelTime == null ? selectedTime == null ? 0.5 : 1 : 0.5 }]}>
                        {bookingLoading ? <ActivityIndicator /> : <Text style={Style.pressableText}>{buttonBooked ? t("Booked") : timeBooked ? t("Booked") : t("Book")}</Text>}</Pressable>
                    <Pressable onPress={() => { if (selectedCancelTime != null) { setPopupVisible(true) } }} style={[Style.pressableCancelBook, { opacity: selectedCancelTime == null ? 0.5 : 1 }]}><Text style={Style.pressableText}>{t("Avboka")}</Text></Pressable>
                </View>
                <IOSPopup
                    visible={popupVisible}
                    title={<View><Text style={{ fontSize: 18, fontWeight: 200, textAlign: "center", marginBottom: 5 }}>{selectedCancelTime == null ? t("BookTime") : t("CancelBookTime")}</Text><Text style={{ fontSize: 18, textDecorationLine: "underline", textAlign: "center", fontWeight: 500 }}>{selectedCancelTime == null ? selectedTime : selectedCancelTime}</Text></View>}
                    hasInput={false}
                    buttonTexts={[t('Yes'), t('No')]}
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