import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator } from "react-native-paper";
import { Svg } from "react-native-svg";
import Logo from "../components/assets/Logo";
import { StyleSheet, Animated } from "react-native"
import { useEffect, useRef } from "react"
export default function Splash({ setLoadingState }) {
    const opacityAnimation = useRef(new Animated.Value(0)).current;
    const opacityStyle = { opacity: opacityAnimation, marginTop: "50%" };
    const animateElement = () => {

        Animated.timing(opacityAnimation, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true
        }).start(() => {
            Animated.timing(opacityAnimation, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }).start(() =>{
                setLoadingState(false)
            })
        })
    };

    useEffect(() =>{
        animateElement()
    }, [])
    return (
        <LinearGradient colors={["#53d5d5", "#2f9d9d"]} style={{ flex: 1, alignItems: 'center' }}>
            <Animated.View style={opacityStyle}>
            <Logo/>
            </Animated.View>
        </LinearGradient>
        //     <View style={{flex: 1, alignItems: "center", margin: 0}}>
        //         <LottieView
        //         source={require("../../assets/colorsplash.json")}
        //         autoPlay
        //         loop={false}
        //         onAnimationFinish={() => setLoadingState()}
        //         />
        // </View>
    )
}