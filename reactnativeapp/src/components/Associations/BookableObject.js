import React from "react";
import { View, Text, Pressable, StyleSheet, FlatList, SafeAreaView, StatusBar } from "react-native";
import LottieView from "lottie-react-native";
import { useEffect, useState, useRef } from "react";
import axios from "../../../axios/axios";
//import { Calendar, CalendarProvider, WeekCalendar} from "react-native-calendars";
import WeekCalendar from "./WeekCalendar";
import BookablesView from "./BookablesView";
import Swiper from 'react-native-swiper'
import BookObjectComponent from "./BookObjectComponent";
import moment from 'moment';
import { ActivityIndicator } from "react-native-paper";
import Style from "../../screens/Style";

const createTimeSlots = (response) => {

    let data = response[0]
    let bookingsArray = response[1]
    let start_time = parseInt(data.timeSlotStartTime.replace(/:/g, "").slice(0, 2))
    let end_time = parseInt(data.timeSlotEndTime.replace(/:/g, "").slice(0, 2))
    let slot_length = parseInt(data.timeSlotLength)
    let timeSlotArray = []
    for (let index = start_time; index < end_time; index = index + slot_length) {

        let next_index = index + slot_length
        if (next_index <= end_time) {

            let titleTemp = prettyDate(index, next_index)

            timeSlotArray.push({ id: index, title: titleTemp, booked: false })
        }
    }
    if (bookingsArray.length == 0) {
        console.log("Inga bokningar")
        return [data, timeSlotArray]
    }
    console.log("BOKNINGAR,")
    return [data, populateTimeSlots(timeSlotArray, bookingsArray)]
}

const prettyDate = (i1, i2) => {
    let t1, t2
    if (i1.toString().length == 1) {
        t1 = String("0" + i1 + ":00")
    } else {
        t1 = String(i1 + ":00")
    }
    if (i2.toString().length == 1) {
        t2 = String("0" + i2 + ":00")
    } else {
        t2 = String(i2 + ":00")
    }
    return t1 + " - " + t2
}


const populateTimeSlots = (timeA, bookA) => {

    for (let index = 0; index < bookA.length; index++) {
        let start_time = parseInt(bookA[index].start_time.replace(/:/g, "").slice(0, 2))
        for (let index = 0; index < timeA.length; index++) {
            if (timeA[index].id == start_time) {
                timeA[index].booked = true
            }
        }
    }
    return timeA
}



export default function BookableObject({ route }) {

    const [bookObject, setBookObject] = useState([])
    const [timeSlots, setTimeSlots] = useState([])
    const [selectedDate, setSelectedDate] = useState(moment());
    let today = moment()
    const [selectedDay, setSelectedDay] = useState(moment())
    const [selectedDayCalendar, setSelectedDayCalendar] = useState(moment())
    const [selectedTime, setSelectedTime] = useState("")
    const [timeSlotsWeekArray, setTimeSlotsWeekArray] = useState([])
    const [bookObjectsArray, setBookObjectsArray] = useState([])
    const [loading, setLoading] = useState(true)
    const [swiperIndex, setSwiperIndex] = useState(0)
    const swiper = useRef(null)
    const [noSwipe, setNoSwipe] = useState(false)

    const loadData = async (objectid, date) => {
        console.log(date)
        try {
            const { data: response } = await axios.get('book/get/object/' + String(objectid) + "/" + String(date)) //use data destructuring to get data from the promise object

            const returnValue = await createTimeSlots(response)

            return returnValue
        }

        catch (error) {
            console.log(error);
        }
    }

    const loadWeek = async (objectid, startDate) => {
        console.log(startDate)
        const tempBookArray = []
        const tempTimeSlotArray = []
        const updatedWeekDates = Array.from({ length: 7 }).map((_, i) =>
            startDate.clone().add(i, 'days')
        );
        for (let index = 0; index < updatedWeekDates.length; index++) {

            let returnValue = await loadData(objectid, updatedWeekDates[index].format().slice(0, 10))

            tempBookArray.push(returnValue[0])
            tempTimeSlotArray.push(returnValue[1])
        }
        setTimeSlotsWeekArray(tempTimeSlotArray)
        setLoading(false)
    }

    React.useEffect(() => {
        //loadData(1, selectedDate)
        if (route.params.id) {
            loadWeek(route.params.id, selectedDate)
        }

    }, [selectedDate])

    async function setSwipe(){
        setTimeout(()=>{
            console.log("Sätter till false")
            setNoSwipe(false)
        }, 500)
    }
    useEffect(() => {
        if (selectedDayCalendar.diff(selectedDay, 'days') != 0) {
            setNoSwipe(true)
            let diff = selectedDayCalendar.diff(selectedDay, 'days')
            console.log(diff)
            swiper.current.scrollBy(diff)
            setSelectedDay(selectedDayCalendar)
            setSwipe()
        }
    }, [selectedDayCalendar])

    /* const markDate = () => {
        console.log(selectedDay.diff(selectedDayCalendar, 'days'))
    }
 */
    const bookTime = () => {
        if (selectedTime != "") {
            console.log("Boka tid: " + prettyDate(selectedTime, selectedTime + parseInt(bookObject.timeSlotLength)) + " ?")
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
                <WeekCalendar selectedDay={selectedDay} setSelectedDay={setSelectedDayCalendar} />
                <Swiper showsPagination={false} ref={swiper} index={0} loop={false} onIndexChanged={(i) => {
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


                </Swiper>
                <View style={{padding: 20}}>
                <Pressable onPress={() => console.log("Boka")} style={[Style.pressableBook]}><Text style={Style.pressableText}>Boka</Text></Pressable>
                </View>
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