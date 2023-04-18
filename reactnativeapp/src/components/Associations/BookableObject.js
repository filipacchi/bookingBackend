import React from "react";
import { View, Text, Pressable, StyleSheet, FlatList, SafeAreaView, StatusBar } from "react-native";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import axios from "../../../axios/axios";
//import { Calendar, CalendarProvider, WeekCalendar} from "react-native-calendars";
import WeekCalendar from "./WeekCalendar";



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

            let titleTemp = prettyDate(index,next_index)

            timeSlotArray.push({ id: index, title: titleTemp, booked: false })
        }
    }
    return [data, populateTimeSlots(timeSlotArray, bookingsArray)]
}

const prettyDate = (i1,i2) => {
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

    React.useEffect(() => {
        loadData(2, selectedDate)
    }, [selectedDate])

    const markDate = (dateString) => {
        setSelectedTime("")
        setSelectedDate(dateString)
    }

    const bookTime = () =>{
        if(selectedTime !=""){
            console.log("Boka tid: "+prettyDate(selectedTime, selectedTime+parseInt(bookObject.timeSlotLength))+" ?")
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.calendarStyle}>
                <WeekCalendar/>
            {/* <CalendarStrip
            isEnglish
            showWeekNumber
            showEnglishLunar
  selectedDate = {selectedDate}
  onPressDate={(date) => {
    this.setState({ selectedDate: date });
  }}
  onPressGoToday={(today) => {
    this.setState({ selectedDate: today });
  }}
  markedDate={[]}
  weekStartsOn={1} // 0,1,2,3,4,5,6 for S M T W T F S
/>
<DatePicker locale={'es-mx'} selected={(date) => console.log(date)}></DatePicker>
                <Calendar
                    onDayPress={({ dateString }) => markDate(dateString)}
                    markedDates={{
                        [selectedDate]: { selected: true, disableTouchEvent: true }
                    }}
                ></Calendar> */}
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={timeSlots}
                        style={{}}
                        renderItem={
                            ({ item }) =>
                                <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10 }}>
                                    <Text suppressHighlighting={true}
                                        onPress={() => {
                                            if (!item.booked) {
                                                setSelectedTime(item.id)
                                            }
                                        }}
                                        style={{ fontSize: 28, padding: 20, backgroundColor: selectedTime == item.id ? "grey" : item.booked ? "red" : "#27a5a5", color: "white" }}>{item.title}</Text></View>}

                    >

                    </FlatList>
                    <Pressable style={styles.input} onPress={() => {bookTime()}}><Text style={styles.inputText}>Boka tid</Text></Pressable>
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