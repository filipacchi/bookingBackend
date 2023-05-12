import Style from "../../screens/Style";
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from "../../screens/Style";
import * as ImagePicker from 'expo-image-picker';
import axios from "../../../axios/axios";
import { AuthContext } from "../../../auth/UserContextProvider";
import base64 from 'react-native-base64'
import FormData from 'form-data'

export default function AssociationInformation({ route }) {
  const { associationId, associationName } = route.params
  const [image, setImage] = useState(null);
  const { state } = React.useContext(AuthContext)
  const [isLoaded, setIsLoaded] = React.useState(false)

  const postPhotoToServer = (img)=>{
    console.log('Img: ' + img)
    const config = {
      headers: { Authorization: `Bearer ${state.userToken}`,
      'Content-Type': `multipart/form-data`, }
    };
    
            const bodyParameters = {
              profile_image: img
               }
        
               axios.put(`association/image/${associationId}/update`,
               config,
               bodyParameters,
           )
               .then(response => {
                 console.log(response.data)
               })
               .catch(error => {
                 console.log(error);
              });
    }



   const pickImage = async () => {
     // No permissions request is necessary for launching the image library
     let result = await ImagePicker.launchImageLibraryAsync({
       mediaTypes: ImagePicker.MediaTypeOptions.All,
       allowsEditing: true,
       aspect: [4, 3],
       quality: 1,
       base64: true
     });
     console.log('RESULT: ' + result.assets[0].uri);

     if (!result.canceled) {
       setImage(result.assets[0].uri);
       console.log('NÅGOT: '+result.assets[0].uri)

       postPhotoToServer(result.base64)
    }
  };

  React.useEffect(() => {
    const getImage = async () => {
        axios.get('association/get/111111', { responseType: "arraybuffer" }
        )
            .then(response => {
                base64string = base64.encode(String.fromCharCode(...new Uint8Array(response.data)))
                contentType = response.headers['content-type']
                url = "data:" + contentType + ";base64," + base64string
                setImage(url)
                console.log("URL: "+url)

            })
            .catch(error => {
                console.log(error);
            }).finally(()=>setIsLoaded(true))
    }
    getImage()
}, [])

  return (
    <View style={{ flex: 1 }}>
      <Text style={[styles.header, {alignSelf: 'center'}]}>{ associationName }</Text>
      <View style={{ alignSelf: 'center' }}>
        <TouchableOpacity 
        style={{ width: 150, height: 150, borderRadius: 75, backgroundColor: '#ccc' }}
         onPress={pickImage}>
        {isLoaded && <Image
            style={{
              width: '100%', 
              height: '100%', 
              borderRadius: 75,
              alignSelf: 'center'
              }}
                source={{
                    uri: image,
                }}
            />}
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.settingContainer}>
          <MaterialIcons name="vpn-key" size={24} color="black" />
          <Text style={styles.objectName}>  Key</Text>
        </View>
        <View style={styles.settingContainer}>
          <MaterialCommunityIcons name="account" size={24} color="black" />
          <Text style={styles.objectName}>  Members</Text>
        </View>
      </ScrollView>
    </View>
  )
}
