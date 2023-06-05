import { MotiView } from "moti"
import { AntDesign } from '@expo/vector-icons';
import { Easing } from "react-native-reanimated";


const CustomLoadIcon = (color, size, loadState, setLoading) => {
    const timeDuration = 500
    checkLoading = () => {
        if(!loadState){
            setLoading(false)
        }
    }
    return (
        <MotiView
            style={{
    
            }}
            from={{
                rotate: "0deg",
            }}
            animate={{
                rotate: "360deg",
            }}
            transition={{
                loop: true,
                //repeat: 1,
                //repeatReverse: true,
                type: "timing",
                duration: timeDuration,
                easing: Easing.elastic
            }}


            onDidAnimate={checkLoading}

        >
            <AntDesign name="checkcircle" size={size} color={color} />
        </MotiView>
    )
}

export default CustomLoadIcon