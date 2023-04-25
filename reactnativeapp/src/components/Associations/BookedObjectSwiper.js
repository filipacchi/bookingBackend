import React, { Component } from 'react'
import { StyleSheet, Text, Image, View } from 'react-native';
import Swiper from 'react-native-swiper'
import { useState } from 'react';


export default function BookedObjectSwiper() {

    const [slideArray, setSlideArray] = useState([{date:"2023-04-25"},{date:"2023-04-26"},{date:"2023-04-27"}])
    const [slideLength, setSlideLength] = useState(2)

    const addToArray = () => {
        console.log(slideLength)
        let temp = slideLength + 1
        setSlideLength(temp)
        console.log(slideLength)
    }

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