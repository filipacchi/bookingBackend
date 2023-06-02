import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, SafeAreaView, View, Text } from "react-native"
import { useNavigation } from "@react-navigation/native";

const NavButtonScreen = (langText) => {

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
                <TouchableOpacity style={styles.input} onPress={() => {navigation.navigate('Book')}}><Text style={styles.inputText}>{langText.booking}</Text></TouchableOpacity>
                <TouchableOpacity style={styles.input} onPress={() => {navigation.navigate('Associations')}}><Text style={styles.inputText}>Associations</Text></TouchableOpacity>
                <TouchableOpacity style={styles.input} onPress={() => {navigation.navigate('Login')}}><Text style={styles.inputText}>Log in</Text></TouchableOpacity>
                <TouchableOpacity style={styles.input} onPress={() => {navigation.navigate('BookableObject')}}><Text style={styles.inputText}>Bookable</Text></TouchableOpacity>
                <TouchableOpacity style={styles.input} onPress={() => {navigation.navigate('JoinAssociations')}}><Text style={styles.inputText}>JoinAssociations</Text></TouchableOpacity>
                <TouchableOpacity style={styles.input} onPress={() => {navigation.navigate('Nav')}}><Text style={styles.inputText}>Nav</Text></TouchableOpacity>
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