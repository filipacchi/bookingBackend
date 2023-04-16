
import { StyleSheet, View, Text, Pressable } from "react-native";
import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from "../../axios/axios";
import styles from './Style' 
import { Title } from "react-native-paper";

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
        <View style={styles.container}>
            <Title style={styles.Title}>Titel</Title>
            <Text style={styles.Text}>TOKEN: {token}</Text>
            <Pressable style={styles.pressable} onPress={() => {console.log(token), loadData()}}><Text style = {styles.pressableText}>Klicka mig</Text></Pressable>
        </View>
    )
}