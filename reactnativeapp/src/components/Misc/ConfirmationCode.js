import { Animated, Image, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Octicons } from '@expo/vector-icons';
import axios from '../../../axios/axios';
import { AuthContext } from '../../../auth/UserContextProvider';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from './styles';


const { Value, Text: AnimatedText } = Animated;

const CELL_COUNT = 4;
const source = {
  uri:
    'https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png',
};

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

const ConfirmationCode = ({ route }) => {
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const [btnColor, setBtnColor] = useState('#3557b7')
  const { colorTheme, authContext } = React.useContext(AuthContext);
  const {t} = authContext
  const [btnText, setBtnText] = useState(t('Verify'))
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const renderCell = ({ index, symbol, isFocused }) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
          inputRange: [0, 1],
          outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
        })
        : animationsColor[index].interpolate({
          inputRange: [0, 1],
          outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
        }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
    }, 0);


    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  useEffect(() => {
    if (btnColor == "red") {
      setTimeout(() => {
        setBtnColor('#3557b7')
        setBtnText(t('Verify'))
      }, 2000)
    }
  }, [btnColor])

  const handleVerifyButton = () => {
    if (value.length == 4) {
      setIsLoading(true)
      axios.post('user/account/activate/', {
        email: route.params.email,
        confirmation_code: value
      }).then(response => {
        if (response.data['result'] == true) {
          console.log("Verified")
          navigation.navigate("VerificationSuccess")
        } else if (response.data['result'] == false) {
          console.log("Not Verified")
          setBtnColor("red")
          setBtnText(t('TryAgainShort'))
        }
        setIsLoading(false)
      }).catch(error => {
        setBtnColor("red")
        setBtnText("Try Again") 
        setIsLoading(false)
      })
    }

  }

  return (
    <LinearGradient colors={[colorTheme.firstColor, colorTheme.secondColor]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.root}>
        <Text style={styles.title}>{t('EmailVerification')}</Text>
        <Octicons style={{ alignSelf: "center" }} name="verified" size={75} color="white" />
        <Text style={styles.subTitle}>
           {t('VerifyMsg') +'\n'}
        </Text>
        <Text style={{ alignSelf: "center", color: "white" }}>{route.params.email}</Text>

        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFiledRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={renderCell}
        />
        <TouchableOpacity style={[styles.nextButton, { backgroundColor: btnColor, }]}
          onPress={handleVerifyButton}
        >
          {isLoading ? <ActivityIndicator color='white'></ActivityIndicator> : <Text style={styles.nextButtonText}>{btnText}</Text>}
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ConfirmationCode;
