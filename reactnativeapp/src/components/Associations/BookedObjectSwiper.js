import React, {useContext} from 'react'
import { StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper'


export default function BookedObjectSwiper() {

    return(
        <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
            
      </Swiper>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    wrapper: {},
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red'
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'orange'
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'lightblue'
    },
    slide4: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'blue'
    },
    slide5: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'lightgreen'
    },
    image: {
      width: 50,
      height: 50,
      margin: 20
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    }
  });