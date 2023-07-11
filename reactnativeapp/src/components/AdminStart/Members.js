import React, { useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import styles from "../../screens/Style";
import axios from "../../../axios/axios";
import { AuthContext } from "../../../auth/UserContextProvider";

export default function Members({ route }) {
  const { associationId } = route.params
  const { state, colorTheme, authContext  } = React.useContext(AuthContext)
  const [users, setUsers] = useState([])

  const getUsersAssociatedWithAssociation = (associationId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${state.userToken}`,
      },
    };

    axios.get(`association/members/get/${associationId}`, config)
    .then(response => {
      const users = response.data.map(item => item.user);
      setUsers(users);
      console.log(users)
    })
    .catch(error => {
      console.error(error);
    });
};

    const data = [
        { id: '1', name: 'Member 1' },
        { id: '2', name: 'Member 2' },
        { id: '3', name: 'Member 3' },
      ];

      React.useEffect(() => {
        getUsersAssociatedWithAssociation(associationId)
    }, [])
    
      return (
        <View style={styles.container}>
          <FlatList
            style={styles.expandFlatlist}
            data={users.filter(item => !item.is_association).sort((a, b) => a.first_name.localeCompare(b.first_name))}
            renderItem={({ item }) =>{
            return (
            <View style={styles.settingContainer}>
              <Text>{item.first_name + ' ' + item.last_name}</Text>
            </View>)}}
          />
        </View>
      );
    };
  