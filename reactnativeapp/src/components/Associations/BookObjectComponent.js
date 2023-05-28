import React, { useContext } from "react";
import { View, Text, Pressable, StyleSheet, FlatList, SafeAreaView, StatusBar, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import axios from "../../../axios/axios";
//import { Calendar, CalendarProvider, WeekCalendar} from "react-native-calendars";
import WeekCalendar from "./WeekCalendar";
import BookablesView from "./BookablesView";
import Swiper from 'react-native-swiper'
import { BookItem } from "./BookItem";
import Style from "../../screens/Style";
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from "../../../auth/UserContextProvider";
import { Entypo } from '@expo/vector-icons';

export default function BookObjectComponent({ selectedCancelTime, setSelectedCancelTime, booked, user, selectedDay, timeSlots, selectedTime, setSelectedTime }) {
    const {colorTheme} = useContext(AuthContext)
    const Item = (item) => {
        let red = "#ff2b2b"
        let green = "#39e336"
        let grey = "#080808"
        let color = selectedCancelTime == item.title ? red :  booked[1] == selectedDay ? booked[0] == item.title ? green : selectedTime == null ? item.booked ? green : grey : selectedTime == item.title ? colorTheme.firstColor : item.booked ? green : grey : selectedTime == null ? item.booked ? green : grey : selectedTime == item.title ? colorTheme.firstColor : item.booked ? green : grey
        console.log("SELECTEDCANDEL "+selectedCancelTime)
        let icon = "unselected"
        if(selectedTime == item.title || selectedCancelTime == item.title){
            icon = "selected"
        } else if(item.booked){
            icon = "booked"
        }
        return (
            <TouchableOpacity
                onPress={() => {
                    if (!item.booked) {
                        setSelectedCancelTime(null)
                        setSelectedTime(item.title)
                        console.log("TOKEN ÄR: " + user)
                        console.log("Bookedbt ÄR: " + item.booked_by)
                    } else {
                        setSelectedTime(null)
                        setSelectedCancelTime(item.title)
                    }
                }} 
                style={[Style.bookedTimesView, { width: timeSlots.length >= 10 ? "41%" : "90%" }]}>
                <View style={Style.assoView}>
                    <View style={Style.assoViewInner}>
                        <Text style={{fontWeight: 500, color: color}}>{item.title}</Text>

                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        { icon == "selected" ? <AntDesign name="checkcircle" size={24} color={color} /> : icon == "booked" ? <AntDesign name="checkcircleo" size={24} color={color} /> : <Entypo name="circle" size={24} color={color} />}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={timeSlots}
                numColumns={2}
                contentContainerStyle={{ marginVertical: 10 }}
                columnWrapperStyle={{ alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }}
                renderItem={
                    ({ item }) => {
                        console.log(item.booked)
                        if (!item.booked || item.booked_by == user) {
                            return (
                                Item(item)

                            )
                        }

                    }
                }
            >
            </FlatList>
        </View>
    )
}

{/* <View style={{width: timeSlots.length >= 10 ? "40%" : "90%", borderRadius: 10, overflow: 'hidden', margin: selectedCancelTime == item.title ? 6 : 8 }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (!item.booked) {
                                                setSelectedCancelTime(null)
                                                setSelectedTime(item.title)
                                                console.log("TOKEN ÄR: " + user)
                                                console.log("Bookedbt ÄR: " + item.booked_by)
                                            } else{
                                                setSelectedTime(null)
                                                setSelectedCancelTime(item.title)
                                            }
                                        }}
                                        style={{ borderColor: "black", borderWidth: selectedCancelTime == item.title ? 2 : 0, borderRadius: 10, padding: 15, backgroundColor: booked[1] == selectedDay ? booked[0] == item.title ? "rgba(0,0,0,0.1)" : selectedTime == null ? item.booked ? "rgba(0,0,0,0.1)" : "#8AAAE5" : selectedTime == item.title ? "#22992e" : item.booked ? "rgba(0,0,0,0.1)" : "#8AAAE5" : selectedTime == null ? item.booked ? "rgba(0,0,0,0.1)" : "#8AAAE5"  : selectedTime == item.title ? "#22992e" : item.booked ? "rgba(0,0,0,0.1)" : "#8AAAE5"}}><Text style={{color: "white"}}>{item.title}</Text>
                                        </TouchableOpacity>
                                        </View> */}

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