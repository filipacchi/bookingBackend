import React from "react";
import { View, Text, Pressable, StyleSheet, FlatList, SafeAreaView, StatusBar } from "react-native";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import axios from "../../../axios/axios";
//import { Calendar, CalendarProvider, WeekCalendar} from "react-native-calendars";
import WeekCalendar from "./WeekCalendar";
import BookablesView from "./BookablesView";
import Swiper from 'react-native-swiper'

export default function BookObjectComponent({booked, user, selectedDay, timeSlots, selectedTime, setSelectedTime }) {


    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={timeSlots}
                style={{}}
                renderItem={
                    ({ item }) => {
                        if (!item.booked || item.booked_by == user) {
                            return (
                                <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10 }}>
                                    <Text suppressHighlighting={true}
                                        onPress={() => {
                                            if (!item.booked) {
                                                setSelectedTime(item.title)
                                                console.log("TOKEN ÄR: " + user)
                                                console.log("Bookedbt ÄR: " + item.booked_by)
                                            }
                                        }}
                                        style={{ fontSize: 28, padding: 20, backgroundColor: booked[1] == selectedDay ? booked[0] == item.title ? "rgba(0,0,0,0.1)" : selectedTime == null ? item.booked ? "rgba(0,0,0,0.1)" : "#8AAAE5" : selectedTime == item.title ? "#22992e" : item.booked ? "rgba(0,0,0,0.1)" : "#8AAAE5" : selectedTime == null ? item.booked ? "rgba(0,0,0,0.1)" : "#8AAAE5" : selectedTime == item.title ? "#22992e" : item.booked ? "rgba(0,0,0,0.1)" : "#8AAAE5", color: "white" }}>{item.title}</Text></View>
                            )
                        }

                    }
                }
            >
            </FlatList>
        </View>
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