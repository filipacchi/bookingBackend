
import { StyleSheet, View, Text, Pressable, TouchableOpacity, SafeAreaView, Image, FlatList, Modal } from "react-native"
import { useState } from 'react';
import React from 'react';
import axios from "../../axios/axios";
import * as SecureStore from 'expo-secure-store';
export default function Associations() {


    const [token, setToken] = useState("")
    const [Associations, setAssociation] = useState([])

    const loadData = () => {
        async function getUserAssociation() {
            console.log("Inuti getUser: "+token)
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const bodyParameters = {
                key: "value"
            };
            axios.get('user/associations',
                config
            )
                .then(response => {
                    console.log(response.data)
                    setAssociation(response.data)
                })
                .catch(error => {
                    console.log(error);
                });
        }
        getUserAssociation()
    }

    React.useEffect(() => {
        const getToken = async () => {
            try {
                let access_token = await SecureStore.getItemAsync('userToken')
                console.log("ASSO: "+access_token)
                setToken(access_token)
                loadData()
            } catch (e) {
                console.log("Error when retrieving SecureStore.")
            }
        }
        getToken()
    },[])

    const getTokenn = async () =>{
        let token = await SecureStore.getItemAsync('userToken')
        console.log(token)
    }



    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.text}>Associations</Text>
            <Pressable onPress={() => {
                getTokenn()
            }}><Text style={styles.text}>Klicka maaj</Text></Pressable>
            <FlatList
                        data={Associations}
                        style={{}}
                        renderItem={
                            ({ item }) =>
                                <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10 }}>
                                    <Text suppressHighlighting={true}
                                        onPress={() => {
                                            console.log(item.name)
                                        }}
                                        style={{ fontSize: 28, padding: 20}}>{item.name}</Text></View>}

                    >

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