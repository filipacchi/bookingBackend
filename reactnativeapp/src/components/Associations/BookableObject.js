import React from "react";
import { View, Text, Pressable, StyleSheet, FlatList, SafeAreaView, StatusBar } from "react-native";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import axios from "../../../axios/axios";
//import { Calendar, CalendarProvider, WeekCalendar} from "react-native-calendars";
import WeekCalendar from "./WeekCalendar";
import BookablesView from "./BookablesView";
import Swiper from 'react-native-swiper'
import BookObjectComponent from "./BookObjectComponent";
import moment from 'moment';


const createTimeSlots = (response) => {
    let data = response[0]
    let bookingsArray = response[1]
    let start_time = parseInt(data.timeSlotStartTime.replace(/:/g, "").slice(0, 2))
    let end_time = parseInt(data.timeSlotEndTime.replace(/:/g, "").slice(0, 2))
    let slot_length = parseInt(data.timeSlotLength)
    let timeSlotArray = []
    console.log("TRIM: " + start_time + " : " + end_time + " : " + slot_length)
    for (let index = start_time; index < end_time; index = index + slot_length) {

        let next_index = index + slot_length
        if (next_index <= end_time) {

            let titleTemp = prettyDate(index, next_index)

            timeSlotArray.push({ id: index, title: titleTemp, booked: false })
        }
    }
    return [data, populateTimeSlots(timeSlotArray, bookingsArray)]
}

const prettyDate = (i1, i2) => {
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
    console.log("IN POPULAET: " + bookA[0])
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



export default function BookableObject() {

    const [bookObject, setBookObject] = useState([])
    const [timeSlots, setTimeSlots] = useState([])
    const [selectedDate, setSelectedDate,] = useState(new Date().toJSON().slice(0, 10));
    const [selectedTime, setSelectedTime] = useState("")

    const loadData = (objectid, date) => {
        console.log(date)
        axios.get('book/get/object/' + String(objectid) + "/" + String(date))
            .then(response => {
                console.log("RESPONSEN ÄR: " + Object.keys(response.data[0]))
                returnValue = createTimeSlots(response.data)
                setBookObject(returnValue[0])
                setTimeSlots(returnValue[1])
            })
            .catch(error => {
                console.log(error);
                return null
            })
    }

    const loadWeek = () => {
        let week = 7
        startDate = moment()
        const updatedWeekDates = Array.from({ length: 7 }).map((_, i) =>
            startDate.clone().startOf('isoWeek').add(i, 'days')
        );
        for (let index = 0; index < updatedWeekDates.length; index++) {
            returnValue = loadData(objectid, updatedWeekDates[index].format().slice(0,10))
            
        }
    }

    React.useEffect(() => {
        loadData(1, selectedDate)
        loadWeek()
    }, [selectedDate])

    const markDate = (dateString) => {
        setSelectedTime("")
        setSelectedDate(dateString)
    }

    const bookTime = () => {
        if (selectedTime != "") {
            console.log("Boka tid: " + prettyDate(selectedTime, selectedTime + parseInt(bookObject.timeSlotLength)) + " ?")
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <WeekCalendar />
                <BookObjectComponent timeSlots={timeSlots} />
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