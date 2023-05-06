import Style from "../../screens/Style";
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from "../../screens/Style";
import * as ImagePicker from 'expo-image-picker';
import axios from "../../../axios/axios";
import { AuthContext } from "../../../auth/UserContextProvider";

export default function AssociationInformation({ route }) {
  const { associationId, associationName } = route.params
  const [image, setImage] = useState(null);
  const { state } = React.useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)


  //' const pickImage = async () => {
  //   const config = {
  //     headers: { Authorization: `Bearer ${state.userToken}` }
  //   };
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });
  //   console.log('RESULT: ' + result);

  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //     console.log('NÅGOT: '+result.assets[0].uri)

  //     const bodyParameters = {
  //       image_url: result.assets[0].uri
  //     }

  //     axios.put(`association/image/${associationId}/update`,
  //     bodyParameters,
  //     config
  //   )
  //     .then(response => {
  //       console.log(response.data)
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  //   }
  // };

  return (
    <View style={{ flex: 1 }}>
      <Text style={[styles.header, {alignSelf: 'center'}]}>{ associationName }</Text>
      <View style={{ alignSelf: 'center' }}>
        <TouchableOpacity 
        style={{ width: 150, height: 150, borderRadius: 75, backgroundColor: '#ccc' }}>
        {/* onPress={pickImage}> */}
        {image && <Image source={{ uri:'http://172.20.10.2:8000' + image }} style={{ width: 150, height: 150, borderRadius: 75, backgroundColor: '#ccc' }}  />}
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
