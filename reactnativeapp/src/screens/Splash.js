import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "../components/assets/Logo";
import { useEffect, useRef, useContext } from "react"
import { AuthContext } from "../../auth/UserContextProvider";
import { MotiView } from "moti"
export default function Splash({setLoadingState}) {
    const { state, colorTheme } = useContext(AuthContext)
    /* const [splashLoaded, setSplashLoaded] = useState(false) */
    /* const animateElement = () => {

        Animated.timing(opacityAnimation, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true
        }).start(() => {
            Animated.timing(opacityAnimation, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }).start(() => {
                setLoadingState(false)
            })
        })
    };

    useEffect(() => {
        animateElement()
    }, []) */

    /* useEffect(() => {
        setTimeout(()=>{
            console.log("VÄNTAT KLART")
            setLoadingState(false)}, 2500)
    }, []) */

    const checkLoading = () => {
        if(!state.isLoading){
            setLoadingState(false)
        }
    }


    return (

        <LinearGradient colors={[colorTheme.firstColor, colorTheme.secondColor]} style={{ flex: 1, alignItems: 'center' }}>

        <MotiView style={{ marginTop: "50%" }}
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onDidAnimate={checkLoading}
            transition={{
                type: "timing",
                duration: 2000,
                loop: true
            }}
        >
            <Logo />
        </MotiView>
      </LinearGradient>)

}

{/* <Animated.View style={opacityStyle}>
                <Logo />
            </Animated.View> */}