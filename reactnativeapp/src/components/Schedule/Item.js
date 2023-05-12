
import { StyleSheet, View, Text, Pressable, FlatList, TouchableOpacity, TextComponent } from "react-native"
import React, { useEffect, useRef, useState } from 'react';
import Style from "../../screens/Style";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from "react-native-gesture-handler";
import { AuthContext } from "../../../auth/UserContextProvider";



export const Item = ({item, index, onComponentOpen, onDelete}) => {
    const ref = useRef()
    const { colorTheme } = React.useContext(AuthContext)

    const rigthSwipe = () => {
        return (
            <View style={Style.swipeToDelView}>
                <TouchableOpacity 
                style={Style.toSwipe}
                onPress={() => {
                    ref.current.close()
                    console.log("REMOVE")
                    onDelete(index, item)
                }}
                >
                    <Ionicons name="trash-outline" size={24} color={"white"} />
                </TouchableOpacity>
            </View>
        )
    }

    useEffect(()=>{
        console.log("ÖPPEN? "+item.opened)
        if(item.opened == false){
            ref.current.close()
        }
    })
    return (
        <Swipeable ref={ref} renderRightActions={rigthSwipe} onSwipeableOpen={() => {
            console.log("OPEN")
            onComponentOpen(index)
        }}
        >
            <View style={Style.bookedTimesView}>
                <View style={Style.assoView}>
                    <AntDesign name="pushpino" size={28} color={colorTheme.firstColor} />
                    <View style={Style.assoViewInner}>
                        <Text suppressHighlighting={true}
                            style={Style.assoText}>
                            {item.bookingObject + ", "}
                            <Text style={{ fontWeight: '600', color: colorTheme.firstColor }}>
                                {item.startTime + " - " + item.endTime}
                            </Text>
                        </Text>
                        <Text style={{ color: "#767676" }}> {item.association + ", "}
                            <Text style={{ color: "black" }}> {item.date} </Text>
                        </Text>

                    </View>
                </View>
            </View >
        </Swipeable>
    )
}