import React, { useContext, useState} from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from "../../screens/Style";
import * as ImagePicker from 'expo-image-picker';
import axios from "../../../axios/axios";
import { AuthContext } from "../../../auth/UserContextProvider";
import base64 from 'react-native-base64'
import FormData from 'form-data'
import { ActivityIndicator } from "react-native-paper";

export default function AssociationInformation({ route }) {
  const { associationId, associationName, associationKey,associationImage } = route.params
  const [image, setImage] = useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false)
  const { state, colorTheme, authContext  } = React.useContext(AuthContext)
  const {t} = authContext



  const postPhotoToServer = (formData) => {
    console.log(state.userToken)
    const config = {
      headers: {
        Authorization: `Bearer ${state.userToken}`,
        'Content-Type': 'multipart/form-data',
      },
    };
  
    axios
      .put(`association/image/update/${associationId}`, formData, config)
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
      if(associationImage != null){
        axios.delete(`association/image/delete/${associationId}`)
      }
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
    if(associationImage != null){
      getImage()
    } else {
      setIsLoaded(true)
    }
}, [])

const getImage = async () => {
  axios.get(`association/image/get/${associationId}`, { responseType: "arraybuffer" }
  )
      .then(response => {
        let uintArray = new Uint8Array(response.data);
  
        let chunkSize = 65536; 
        let chunks = Math.ceil(uintArray.length / chunkSize);
  
        let chunkArray = [];
         for (let i = 0; i < chunks; i++) {
           let start = i * chunkSize;
           let end = start + chunkSize;
           let chunk = Array.from(uintArray.slice(start, end));
           chunkArray.push(chunk);
         }
  
         let base64Chunks = chunkArray.map((chunk) =>
         base64.encode(String.fromCharCode(...chunk))
         );
         let base64string = base64Chunks.join('');
          contentType = response.headers['content-type']
          url = "data:" + contentType + ";base64," + base64string
          setImage(url)
          console.log("URL: "+url)

      })
      .catch(error => {
          console.log(error);
      }).finally(()=>setIsLoaded(true))
}
  


  return (
    <View style={{ flex: 1 }}>
      <Text style={[styles.header, { alignSelf: 'center' }]}>{associationName}</Text>
      <View style={{ alignSelf: 'center' }}>
        <TouchableOpacity
          style={{ width: 150, height: 150, borderRadius: 75, backgroundColor: '#fff', justifyContent: 'center', alignItems:'center' }}
          onPress={pickImage}>
          {isLoaded ?
            (<Image
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 75,
              alignSelf: 'center'
            }}
            source={{
              uri: image,
            }}
          />):(
            <ActivityIndicator/>
          )
}
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.settingContainer}>
          <MaterialIcons name="vpn-key" size={24} color="black" />
          <Text style={styles.objectName}>   {t("Key")} <Text style={{fontWeight: 500}}>{associationKey}</Text></Text>
        </View>
        <View style={styles.settingContainer}>
          <MaterialCommunityIcons name="account" size={24} color="black" />
          <Text style={styles.objectName}>  {t("Members")}</Text>
        </View>
      </ScrollView>
    </View>
  )
}
