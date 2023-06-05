
import { View, Text, TouchableOpacity, Image } from "react-native"
import React, { useEffect, useRef } from 'react';
import Style from "../../screens/Style";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable, GestureHandlerRootView } from "react-native-gesture-handler";
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
                    
                    onDelete(index, item)
                }}
                >
                    <Ionicons name="trash-outline" size={24} color={"white"} />
                </TouchableOpacity>
            </View>
        )
    }

    useEffect(()=>{
        
        if(item.opened == false){
            ref.current.close()
        }
    })
    return (
        <GestureHandlerRootView>
        <Swipeable ref={ref} renderRightActions={rigthSwipe} onSwipeableOpen={() => {
            
            onComponentOpen(index)
        }}
        >
            <View style={Style.bookedTimesView}>
                <View style={Style.assoView}>
                <View style={{ width: 45, height: 45, justifyContent: "center", alignItems: "center"}}>
                {item.profile_image != null ?
                                                (<Image
                                                    style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: 75,
                                                    alignSelf: 'center'
                                                    }}
                                                    source={{
                                                    uri: item.profile_image,
                                                    }}
                                                />):(
                                                    <AntDesign name="pushpino" size={28} color={colorTheme.firstColor} />)}
                     </View>
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
        </GestureHandlerRootView>
    )
}