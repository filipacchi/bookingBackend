import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useEffect, useState, useRef, useContext } from "react";
import axios from "../../../axios/axios";
import SwipeableCalendar from "../Misc/SwipeableCalendar";
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
    const [selectedDay, setSelectedDay] = useState(moment())
    const [selectedTime, setSelectedTime] = useState()
    const [selectedCancelTime, setSelectedCancelTime] = useState()
    const [loading, setLoading] = useState(true)
    const swiper = useRef(null)
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