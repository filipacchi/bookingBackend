
import { StyleSheet, View, Text, Pressable, FlatList } from "react-native"
import React, { useState } from 'react';
import * as styles1 from "reactnativeapp/src/screens/Style.js"
import axios from "../../../axios/axios";
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from "@react-navigation/native";
import Style from "../../screens/Style";
import { AntDesign } from '@expo/vector-icons';
import { useSafeAreaFrame } from "react-native-safe-area-context";

export default function Schedule() {

    myBookings = {}

    const navigation = useNavigation()
    const [token, setToken] = useState("")
    const [isRefreshing, setIsRefreshing] = useState(true)

    const [bookedTimes, setBookedTimes] = useState([])
    const [hardcodeBookedTime, setHardcodeBookedTime] = useState([
        {startTime: "02:00:00",
        endTime: "04:00:00",
        bookingObject: "Tvättstuga 1", 
        date: "2023-04-24",
        association: "BRF Gjuke"
        },
        {startTime: "04:00:00",
        endTime: "06:00:00",
        bookingObject: "Tvättstuga 2", 
        date: "2023-04-24",
        association: "BRF Gjuke"
        },
        {startTime: "06:00:00",
        endTime: "08:00:00",
        bookingObject: "Tvättstuga 1", 
        date: "2023-04-24",
        association: "BRF Schedulelo"
        },

    ])

    React.useEffect(() => {
        const getToken = async () => {
            let access_token = await SecureStore.getItemAsync('userToken')
            console.log("ASSO: " + access_token)
            setToken(access_token)
            loadData(access_token)



        }
        getToken()
    }, [])

    const loadData = ((token) => {
        console.log("---- Inuti loadData (Schedule.js), token = " + token)
        
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }

        axios.get('user/bookedtimes/get',
                config
            )
                .then(response => {
                    console.log("response: " + response.data)
                    setBookedTimes(response.data)
                    setIsRefreshing(false)
                })
                .catch(error => {
                    console.log(error);
                });
    })
    
    return (
        <View style={{ flex: 1 }}>
            <Text style={styles1.text}></Text>

        <FlatList
        data={hardcodeBookedTime}
        style={Style.expandFlatlist}
        onRefresh={loadData(token)}
        refreshing={isRefreshing}
        renderItem={
            ({ item }) =>
                <View style={Style.assoFlatView}>
                    <View style={Style.assoView}>
                        <AntDesign name="home" size={28} color={"#222222"} />
                        <View>
                            <Text suppressHighlighting={true}
                                onPress={() => {
                                    navigation.navigate("BookableObject")
                                }}
                                style={Style.assoText}>

                                {item.bookingObject}</Text>
                            <Text style={{ color: "#767676" }}>{item.association}</Text></View>
                    </View>
                    <View style={Style.assoDarkView}>
                        <FlatList
                            data={[{startTime: "blabla", endTime: "bloblo"}, {startTime: "blabla", endTime: "bloblo"}, {startTime: "blabla", endTime: "bloblo"}, {startTime: "blabla", endTime: "bloblo"}]} /* data = item ---- om vi har flera bokningar på samma bokningsobjekt */
                            style={{}}
                            horizontal={true}
                            renderItem={
                                ({ item }) => (
                                    <View style={Style.bookObject}>
                                        <Text>{item['startTime'] + " - " + item['endTime']}</Text>
                                    </View>
                                )
                            }
                        >

                        </FlatList>
                    </View>
                </View>
        }
        >
            <Pressable 
            style={{height: 200, width: 200, backgroundColor: "red"}} 
            onPress={loadData}>
                <Text>test</Text>
            </Pressable>
        </FlatList>

        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        marginTop: 100,
        backgroundColor: "red"
    }
});