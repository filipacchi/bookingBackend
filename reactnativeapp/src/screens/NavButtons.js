import React from "react";
import { SafeAreaView, View } from "react-native";
import LottieView from "lottie-react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const NavButtonScreen = () => {

    const navigation = useNavigation()

    return (
        <SafeAreaView>
            <Button title='Till Booking' onPress={() => {navigation.navigate('Booking')}} />
            <Button title='Till Nav' onPress={() => {navigation.navigate('Nav')}} />
            <Button title='Till Login' onPress={() => {navigation.navigate('Login')}} />
            <Button title='Till Splash' onPress={() => {navigation.navigate('Splash')}} />





        </SafeAreaView>
    )


}



export default NavButtonScreen;