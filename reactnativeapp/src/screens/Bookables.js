import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput }from "react-native-paper";
import { StyleSheet, SafeAreaView, View, Text, Pressable, PermissionsAndroid } from "react-native"
import LottieView from "lottie-react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const NavButtonScreen = () => {


    const iconPaths = {
        laundryRoom: "reactnativeapp/assets/laundry-machine.png",

    }

    const bookableObjectBars = [ /* ska importeras från db */


        {name: "Laundry Room 1",
        type: "Laundry Room",
        }, 
        {name: "Laundry Room 2",
        type: "Laundry Room",
        }, 
        {name: "Laundry Room 2",
        type: "Laundry Room",
        }, 
        {name: "Laundry Room 2",
        type: "Laundry Room",
        }, 
        {name: "Laundry Room 2",
        type: "Laundry Room",
        }, 
        {name: "Laundry Room 2",
        type: "Laundry Room",
        }, 

    ]
    const navigation = useNavigation()

    return (
        <LinearGradient colors={["#53d5d5", "#2f9d9d"]} style={{ flex: 1 }}>
            <View style={{
                position: "absolute",
                bottom: 150,
                width: "100%",
                gap: 20
            }}>
            <SafeAreaView>


            </SafeAreaView>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    input: {
        width: "70%",
        borderRadius: 10,
        borderColor: "white",
        borderStyle: "solid",
        justifyContent: "center",
        borderWidth: 2,
        alignItems: "center",
        alignSelf: "center",
        padding: 15,
        flexDirection: "row",
        gap: 10
    },
    inputText: {
        color: "white",
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
    }

})

export default NavButtonScreen;