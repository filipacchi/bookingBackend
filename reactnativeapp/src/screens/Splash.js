import React, {useContext} from "react";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "../components/assets/Logo";
import { MotiView } from "moti"
export default function Splash({setAnimationComplete, appReady}) {
    /* const { state, colorTheme } = useContext(AuthContext) */

    const checkLoading = () => {
        /* setAnimationComplete(true) */
        if(appReady){
            setAnimationComplete(true)
        }
    }


    return (

        <LinearGradient colors={["#5a97ff", "#5a97ff"]} style={{ flex: 1, alignItems: 'center' }}>

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