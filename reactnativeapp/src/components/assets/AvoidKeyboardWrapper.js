import React, {useContext} from "react";
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";




const AvoidKeyboardWrapper = ({children}) => {
    return (
        <KeyboardAvoidingView style={{flex: 1}}>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default AvoidKeyboardWrapper