
import { StyleSheet, View, Text, Pressable } from "react-native"
import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from "../../axios/axios"

/*const token = await SecureStore.getItemAsync('userToken');*/


export default function Book() {

    const [token, setToken] = useState("")
    const [bookings, setBooking] = useState([])

    const loadData = () => {
        async function getAllBookings() {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const bodyParameters = {
                key: "value"
            };
            axios.get('book/get/object/1',
                config
            )
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                    console.log(error);
                });
        }
        getAllBookings()
    }

    React.useEffect(() => {
        const getToken = async () => {
            try {
                setToken(await SecureStore.getItemAsync('userToken'))
            } catch (e) {
                console.log("Error when retrieving SecureStore.")
            }
        }
        getToken()
        loadData()
    })

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.text}>TOKEN: {token}</Text>
            <Pressable style={styles.button} onPress={() => {console.log(token)}}><Text>Klicka mig</Text></Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        marginTop: 100,
        backgroundColor: "red"
    },
    button: {
        backgroundColor: "grey",
        alignSelf: "center",
        padding: 20,
        margin: 10
    }
});