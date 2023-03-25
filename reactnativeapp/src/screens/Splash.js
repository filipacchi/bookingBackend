import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

export default function Splash({setIsLoading}) {
    return (
        <View style={{flex: 1, alignItems: "center", margin: 0}}>
            <LottieView
            source={require("../../assets/colorsplash.json")}
            autoPlay
            loop={false}
            onAnimationFinish={() => setIsLoading(false)}
            />
    </View>
    )
}