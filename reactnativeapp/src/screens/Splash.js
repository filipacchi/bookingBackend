import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "../components/assets/Logo";
import {  useContext } from "react"
import { AuthContext } from "../../auth/UserContextProvider";
import { MotiView } from "moti"
export default function Splash({setLoadingState}) {
    const { state, colorTheme } = useContext(AuthContext)

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