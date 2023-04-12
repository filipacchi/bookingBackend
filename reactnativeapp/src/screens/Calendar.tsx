import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, TouchableOpacity, SafeAreaView, Image, FlatList, Modal, StatusBar } from "react-native"
import { Calendar, LocaleConfig } from 'react-native-calendars';
import axios from '../../axios/axios';
import * as SecureStore from 'expo-secure-store';
type ItemData = {
  id: string;
  title: string;
  booked: boolean;
};

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};


const App = () => {
  const [selected, setSelected,] = useState('');
  const [selectedId, setSelectedId] = useState();
  const [token, setToken] = useState("")
  const [bookableObject, setObject] = useState({})
  const [bookings, setBooking] = useState([])
  const DATA: ItemData[] = [
    // {
    //   id: 'slot1',
    //   title: '00:00-04:00',
    // },
    // {
    //   id: 'slot2',
    //   title: '04:00-08:00',
    // },
    // {
    //   id: 'slot3',
    //   title: '08:00-12:00',
    // },
    // {
    //   id: 'slot4',
    //   title: '12:00-16:00',
    // },
    // {
    //   id: 'slot5',
    //   title: '16:00-20:00',
    // },
    // {
    //   id: 'slot6',
    //   title: '20:00-00:00',
    // },
  ];

  const Item = ({ item, onPress, backgroundColor, textColor }: ItemProps) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
    </TouchableOpacity>
  );


  const loadData = () => {
    async function getBookableObject() {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const bodyParameters = {
        key: "value"
      };
      axios.get('object/get/1',
        //config
      )
        .then(response => {
          setObject(response.data)
          console.log(response.data)
          createTimeSlots(response.data)
        })
        .catch(error => {
          console.log(error);
        });
    }
    getBookableObject()
    async function getBookings() {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const bodyParameters = {
        key: "value"
      };
      axios.get('book/get/object/1',
        //config
      )
        .then(response => {
          setObject(response.data)
          setBooking(response.data)
        })
        .catch(error => {
          console.log(error);
        });
    }
    getBookings()
  }

  React.useEffect(() => {
    const getToken = async () => {
      try {
        setToken(await SecureStore.getItemAsync('userToken'))
      } catch (e) {
        console.log("Error when retrieving SecureStore.")
      }
    }
    getToken()
    loadData()
  }, [])



  function createTimeSlots(bookableObject) {
    let start_time = parseInt(bookableObject['timeSlotStartTime'].replace(/:/g,"").slice(0,2))
    let end_time = parseInt(bookableObject['timeSlotEndTime'].replace(/:/g,"").slice(0,2))
    let slot_length = parseInt(bookableObject['timeSlotLength'])
    console.log("TRIM: "+start_time+" : "+end_time+ " : "+slot_length)
    for (let index = start_time; index <= end_time; index = index + slot_length) {
        DATA.push({
                id: String(index),
                title: String(index) + " - "+String(index+slot_length),
                booked: false
              })
      
    }
    console.log(DATA)
      
  }


  const renderItem = ({ item }: { item: ItemData }) => {
    const backgroundColor = item.id === selectedId ? '#217f9e' : '#7fdbfa';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => {}}//setSelectedId(item.id)
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.calendarStyle}>
        <Calendar
          onDayPress={day => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: { selected: true, disableTouchEvent: true }
          }}
        />
        <View style={{ flex: 1 }}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  calendarStyle: {
    marginTop: 20,
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
})

export default App;