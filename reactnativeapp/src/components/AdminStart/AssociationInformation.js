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
  const { associationId, associationName, associationKey } = route.params
  const [image, setImage] = useState(null);
  const { state } = React.useContext(AuthContext)
  const [isLoaded, setIsLoaded] = React.useState(false)


  const postPhotoToServer = (formData) => {
    console.log(state.userToken)
    const config = {
      headers: {
        Authorization: `Bearer ${state.userToken}`,
        'Content-Type': 'multipart/form-data',
      },
    };
  
    axios
      .put(`association/image/${associationId}/update`, formData, config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    console.log('RESULT: ' + result.assets[0].uri);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log('NÅGOT: ' + result.assets[0].uri)

      const uri = result.uri;
      const filename = uri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      const formData = new FormData();
      formData.append('profile_image', {
        uri,
        name: filename,
        type: type,
      });

      postPhotoToServer(formData);
    }
  };

  React.useEffect(() => {
    const getImage = async () => {
        axios.get(`association/get/${associationId}`, { responseType: "arraybuffer" }
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
      <Text style={[styles.header, { alignSelf: 'center' }]}>{associationName}</Text>
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
          <Text style={styles.objectName}>Key: <Text style={{fontWeight: 500}}>{associationKey}</Text></Text>
        </View>
        <View style={styles.settingContainer}>
          <MaterialCommunityIcons name="account" size={24} color="black" />
          <Text style={styles.objectName}>  Members</Text>
        </View>
      </ScrollView>
    </View>
  )
}
