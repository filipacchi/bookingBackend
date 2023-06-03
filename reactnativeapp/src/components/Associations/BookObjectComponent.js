import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList, StatusBar, TouchableOpacity } from "react-native";
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