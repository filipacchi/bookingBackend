
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native"
import { useState } from 'react';
import React, {useContext} from 'react';
import axios from "../../../axios/axios";
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';
import Style from "../../screens/Style";
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from "../../../auth/UserContextProvider";


export default function BookablesView() {
    const { state, colorTheme, authContext  } = React.useContext(AuthContext)
    const {t} = authContext
    const [token, setToken] = useState("")
    const [Associations, setAssociation] = useState([])
    const [AssociationTest, setAssociationTest] = useState([
        {
            name: "Grill 1",
            region: "BRF Gjuke",
            id: 1,
            bookobjects: [
                { name: "06:00 - 10:00" },
                { name: "14:00 - 18:00" },
           ],
        },
        {
            name: "Grill 2",
            region: "BRF Gjuke",
            id: 2,
            bookobjects: [
                { name: "10:00 - 14:00" },
                { name: "18:00 - 22:00" },
                { name: "10:00 - 14:00" },
                { name: "18:00 - 22:00" },
                { name: "10:00 - 14:00" },
                { name: "18:00 - 22:00" },
                { name: "10:00 - 14:00" },
                { name: "18:00 - 22:00" },
                { name: "10:00 - 14:00" },
                { name: "18:00 - 22:00" },
                { name: "10:00 - 14:00" },
                { name: "18:00 - 22:00" },
           ],
        },
        {
            name: "Bastu",
            region: "BRF Gjuke",
            id: 3,
            bookobjects: [
                { name: "14:00 - 18:00" },
           ],
        },
        

    ])

    const [bookableObjects, setBookObjects] = useState(
        {
            1: [
                 { name: "Grill 1" },
                 { name: "Bastu" },
                 { name: "Tvättstuga" }
            ],
            2: [
                { name: "Pingis" },
                { name: "Bastu" },
                { name: "Tvättstuga" }
            ],

        }
    )

    const bo = [
        {"name": "Grill 1"},
        {"name": "Bastu"},
        {"name": "Tvättstuga"}
      ];

    const loadData = (token) => {
        async function getUserAssociation(token) {
            
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
                    
                    setAssociation(response.data)
                })
                .catch(error => {
                    
                });
        }
        getUserAssociation(token)
    }

    React.useEffect(() => {
        const getToken = async () => {
            let access_token = await SecureStore.getItemAsync('userToken')
            
            setToken(access_token)
            loadData(access_token)



        }
        getToken()
    }, [])

    if (AssociationTest.length == 0) {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <View style={{
                    borderStyle: "solid",
                    borderRadius: 10,
                    borderColor: "#999999",
                    borderWidth: 3,
                    margin: 20
                }}><Text style={[Style.assoText, Style.noAssoText]}>{t("NotJoinedAssociationYet")}</Text></View>
                <TouchableOpacity style={Style.addAssociation}><Ionicons name="ios-add-circle-outline" size={60} color="#999999" /></TouchableOpacity>
            </View>
        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: "#dcdcdc" }}>
            <FlatList
                data={AssociationTest}
                style={Style.expandFlatlist}
                renderItem={
                    ({ item }) =>
                        <View style={Style.assoFlatView}>
                            <View style={Style.assoView}>
                                <AntDesign name="home" size={28} color={"#222222"} />
                                <View>
                                    <Text suppressHighlighting={true}
                                        onPress={() => {
                                            
                                        }}
                                        style={Style.assoText}>

                                        {item.name}</Text>
                                    <Text style={{ color: "#767676" }}>{item.region}</Text></View>
                            </View>
                            <View style={Style.assoDarkView}>
                                <FlatList
                                    data={item.bookobjects}
                                    style={{}}
                                    horizontal={true}
                                    renderItem={
                                        ({item}) => (
                                            <View style={Style.bookObject}>
                                                <Text>{item.name}</Text>
                                            </View>
                                        )
                                    }
                                >

                                </FlatList>
                            </View>
                        </View>}
            >
            </FlatList>
        </View>
    )
}