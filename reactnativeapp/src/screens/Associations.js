
import { StyleSheet, View, Text, Pressable, TouchableOpacity, SafeAreaView, Image, FlatList, Modal } from "react-native"
import { useState } from 'react';
import React from 'react';
import axios from "../../axios/axios";
import * as SecureStore from 'expo-secure-store';
export default function Associations() {


    const [token, setToken] = useState("")
    const [allAssociations, setAssociation] = useState([])

    const loadData = () => {
        async function getUserAssociation() {
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
                    console.log(response)
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
            <Text style={styles.text}>Associations</Text>
            <FlatList
                data={allAssociations}
                style={{}}
                renderItem={({ item }) => 
                    <View>
                        <View>
                            <Text style={{fontSize: 17, marginLeft: '10%', flexWrap: 'wrap', overflow: 'hidden'}}>{item.name}</Text>
                        </View>
                    </View>}
                ></FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        marginTop: 100,
        backgroundColor: "red"
    }
});