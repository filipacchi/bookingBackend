import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, FlatList, StatusBar, TouchableOpacity, Dimensions } from "react-native";
import Style from "../../screens/Style";
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from "../../../auth/UserContextProvider";
import { Entypo } from '@expo/vector-icons';
import { ActivityIndicator } from "react-native-paper";
import { MotiView } from "moti";
import { Image as MotiImage } from "moti"
import CustomLoadIcon from "../Misc/customLoadIcon";
import { AnimatePresence } from "moti";


export default function BookObjectComponent({ isLoading, setIsLoading, bookingLoading, selectedCancelTime, setSelectedCancelTime, booked, user, selectedDay, timeSlots, selectedTime, setSelectedTime }) {
    const { colorTheme } = useContext(AuthContext)
    const viewRef = useRef(null)
    const [viewHeight, setViewHeight] = useState(0)
    const [viewWidth, setViewWidth] = useState(0)

    const handleLayout = () => {
        viewRef.current.measure((x, y, measuredWidth, measuredHeight) => {
            setViewHeight(measuredHeight)
            setViewWidth(measuredWidth)
            console.log('Width:', viewWidth);
            console.log('Height:', viewHeight);
        });
    };

    useEffect(() => {
        if (bookingLoading) {
            setIsLoading(true)
        }
    }, [bookingLoading])

    /* const customLoadIcon = (color) => {
        return (
            <MotiView
                style={{
        
                }}
                from={{
                    rotate: "0deg",
                }}
                animate={{
                    rotate: "360deg",
                }}
                transition={{
                    loop: true,
                    repeatReverse: true,
                    type: "timing",
                    duration: 1000,
                }}

            >
                <AntDesign name="checkcircle" size={24} color={color} />
            </MotiView>
        )
    } */

    const Item = (item) => {
        let red = "#ff2b2b"
        let green = "#39e336"
        let grey = "#080808"
        let lightGrey = "#636363"
        let black = "#000"
        let white = "white"
        let opacity;
        let bgColor = white
        /* let color
        if (selectedCancelTime == item.title){
            color = red
        } else if(booked[1] == selectedDay){
            if(booked[0] == item.title){
                if(bookingLoading){
                    color = colorTheme.firstColor
                } else {
                    color = green
                }
            } else if(selectedTime == null){
                if(item.booked){
                    color = green
                } else {
                    color = grey
                }
            }
        } */
        /* let color = selectedCancelTime == item.title ? red : booked[1] == selectedDay ? booked[0] == item.title ? bookingLoading ? colorTheme.firstColor : green : selectedTime == null ? item.booked ? green : grey : selectedTime == item.title ? colorTheme.firstColor : item.booked ? green : grey : selectedTime == null ? item.booked ? green : grey : selectedTime == item.title ? colorTheme.firstColor : item.booked ? green : grey */
        let color;


        if (selectedCancelTime === item.title) {
            color = red;
        } else if (booked[1] === selectedDay) {
            if (booked[0] === item.title) {
                color = bookingLoading ? colorTheme.firstColor : green;
            } else if (selectedTime === null) {
                color = item.booked ? item.booked_by === user ? green : black : grey;
                bgColor = item.booked ? item.booked_by === user ? white : lightGrey : white;
                opacity = item.booked ? item.booked_by === user ? 1 : 0.2 : 1;
            } else if (selectedTime === item.title) {
                color = colorTheme.firstColor;
            } else {
                color = item.booked ? item.booked_by === user ? green : black : grey;
                bgColor = item.booked ? item.booked_by === user ? white : lightGrey : white;
                opacity = item.booked ? item.booked_by === user ? 1 : 0.2 : 1;
            }
        } else if (selectedTime === null) {
            color = item.booked ? item.booked_by === user ? green : black : grey;
            bgColor = item.booked ? item.booked_by === user ? white : lightGrey : white;
            opacity = item.booked ? item.booked_by === user ? 1 : 0.2 : 1;
        } else if (selectedTime === item.title) {
            color = colorTheme.firstColor;
        } else {
            color = item.booked ? item.booked_by === user ? green : black : grey;
            bgColor = item.booked ? item.booked_by === user ? white : lightGrey : white;
            opacity = item.booked ? item.booked_by === user ? 1 : 0.2 : 1;
        }

        let icon = "unselected"
        if (selectedTime == item.title || selectedCancelTime == item.title) {
            icon = "selected"
        } else if (item.booked) {
            icon = "booked"
        }
        {/* <ActivityIndicator size={24} color={colorTheme.firstColor} /> */ }
        return (
            <TouchableOpacity
                onPress={() => {
                    if(item.booked && item.booked_by !==user){

                    }
                    else if (!item.booked) {
                        setSelectedCancelTime(null)
                        setSelectedTime(item.title)


                    } else {
                        setSelectedTime(null)
                        setSelectedCancelTime(item.title)
                    }
                }}
                style={[Style.bookedTimesView, { width: timeSlots.length >= 10 ? "41%" : "90%", backgroundColor: bgColor }]}>

                <View style={[Style.assoView, {overflow: "hidden"}]} ref={viewRef} onLayout={handleLayout}>
                    <View style={{
                        display: (bgColor == lightGrey ? viewHeight == 0 ? "none" : "flex" : "none"),
                        position: 'absolute',
                        transform: [{ rotate: `${Math.atan(viewHeight / viewWidth)}rad` }],
                        left: 0,
                        right: 0,
                        borderBottomWidth: 2,
                        borderBottomColor: 'white',
                    }}></View>
                    <View style={{
                        display: (bgColor == lightGrey ? viewHeight == 0 ? "none" : "flex" : "none"),
                        position: 'absolute',
                        transform: [{ rotate: `${Math.PI-Math.atan(viewHeight / viewWidth)}rad` }],
                        left: 0,
                        right: 0,
                        borderBottomWidth: 2,
                        borderBottomColor: 'white',
                    }}></View>
                    <View style={Style.assoViewInner}>
                        <Text style={{ fontWeight: 500, color: color }}>{item.title}</Text>

                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        {icon == "selected" ? bookingLoading ? <ActivityIndicator />/* CustomLoadIcon(color, 24, bookingLoading, setIsLoading) */ : <AntDesign name="checkcircle" size={24} color={color} /> : icon == "booked" ? <AntDesign name="checkcircleo" size={24} color={color} /> : <Entypo name="circle" size={24} color={color} />}
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


                        return (
                            Item(item)

                        )


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