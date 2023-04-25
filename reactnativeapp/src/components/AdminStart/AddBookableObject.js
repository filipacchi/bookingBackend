import Style from "../../screens/Style";
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, ScrollView, InteractionManager } from 'react-native';
import { TextInput } from "react-native-paper";
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import styles from "../../screens/Style";
import axios from "../../../axios/axios";
import { AuthContext } from "../../../auth/UserContextProvider";

export default function AddBookableObject({ route }) {
  const { associationId } = route.params
  const [allDayEnabled, setAllDayEnabled] = useState(false);
  const [selected, setSelected] = React.useState("");
  const [objectName, setObjectName] = useState('');
  const [objectNameBackgroundColor, setObjectNameBackgroundColor] = useState('white');
  const [lengthPerBookingBackgroundColor, setLengthPerBookingBackgroundColor] = useState('white');
  const [earliestBookableTimeBackgroundColor, setEarliestBookableTimeBackgroundColor] = useState('white');
  const [latestBookableTimeBackgroundColor, setLatestBookableTimeBackgroundColor] = useState('white');
  const [firstStartTimeBackgroundColor, setFirstStartTimeBackgroundColor] = useState('white');
  const [slotsBookablePerDayBackgroundColor, setSlotsBookablePerDayBackgroundColor] = useState('white');
  const [slotsBookablePerWeekBackgroundColor, setSlotsBookablePerWeekBackgroundColor] = useState('white');
  const [selectedHoursBookable, setSelectedHoursBookable] = useState();
  const [earliestBookableTime, setEarliestBookableTime] = useState();
  const [latestBookableTime, setLatestBookableTime] = useState();
  const [firstStartTime, setFirstStartTime] = useState();
  const [slotsBookablePerDay, setSlotsBookablePerDay] = useState();
  const [slotsBookablePerWeek, setSlotsBookablePerWeek] = useState();
  const scrollViewRef = useRef(null);
  const [selectListPosition, setSelectListPosition] = useState(0);

  // var selectedHoursBookable
  // var earliestBookableTime
  // var latestBookableTime = '';
  // var firstStartTime = '';
  // var slotsBookablePerDay = '';
  // var slotsBookablePerWeek = '';
  const { state } = React.useContext(AuthContext)

  const setBackgroundColor = (oNBackgroundColor, lPBookingBackgroundColor, eBTimeBackgroundColor, lBTimeBackgroundColor, fSTimeBackgroundColor, sBPerDayBackgroundColor, sBPerWeekBackgroundColor) => {
    setObjectNameBackgroundColor(oNBackgroundColor);
    setLengthPerBookingBackgroundColor(lPBookingBackgroundColor);
    setEarliestBookableTimeBackgroundColor(eBTimeBackgroundColor);
    setLatestBookableTimeBackgroundColor(lBTimeBackgroundColor);
    setFirstStartTimeBackgroundColor(fSTimeBackgroundColor);
    setSlotsBookablePerDayBackgroundColor(sBPerDayBackgroundColor);
    setSlotsBookablePerWeekBackgroundColor(sBPerWeekBackgroundColor);
  }

  const addBookableObject = async () => {
    const config = {
      headers: { Authorization: `Bearer ${state.userToken}` }
    };

    const bodyParameters = {
      inAssociation: associationId,
      objectName: objectName,
      timeSlotLength: selectedHoursBookable,
      timeSlotStartTime: earliestBookableTime,
      timeSlotEndTime: latestBookableTime,
      slotsPerDay: slotsBookablePerDay,
      slotsPerWeek: slotsBookablePerWeek
    }
    axios.post('association/bookableobject/add',
      bodyParameters
    )
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (scrollViewRef.current && selectListPosition) {
      scrollViewRef.current.scrollTo({ y: selectListPosition, animated: true });
    }
  }, [selectListPosition]);

  const handleLayout = event => {
    const { y, height } = event.nativeEvent.layout;
    const screenHeight = scrollViewRef.current?.getLayout?.().height || 0;
    const scrollPosition = y + height - screenHeight;
    if (scrollPosition > 0) {
      setSelectListPosition(scrollPosition);
    }
  };

  const lengthPerBooking = [
    { key: '1', value: '1 hour' },
    { key: '2', value: '2 hours' },
    { key: '3', value: '3 hours' },
    { key: '4', value: '4 hours' },
    { key: '5', value: '5 hours' },
    { key: '6', value: '6 hours' },
    { key: '7', value: '7 hours' },
    { key: '8', value: '8 hours' },
    { key: '9', value: '9 hours' },
    { key: '10', value: '10 hours' },
    { key: '11', value: '11 hours' },
    { key: '12', value: '12 hours' },
    { key: '13', value: '13 hours' },
    { key: '14', value: '14 hours' },
    { key: '15', value: '15 hours' },
    { key: '16', value: '16 hours' },
    { key: '17', value: '17 hours' },
    { key: '18', value: '18 hours' },
    { key: '19', value: '19 hours' },
    { key: '20', value: '20 hours' },
    { key: '21', value: '21 hours' },
    { key: '22', value: '22 hours' },
    { key: '23', value: '23 hours' },
    { key: '24', value: '24 hours' },
  ]

  const amountOfTimes = [
    { key: '1', value: '1' },
    { key: '2', value: '2' },
    { key: '3', value: '3' },
    { key: '4', value: '4' },
    { key: '5', value: '5' },
    { key: '6', value: '6' },
    { key: '7', value: '7' },
    { key: '8', value: '8' },
    { key: '9', value: '9' },
    { key: '10', value: '10' },
    { key: '11', value: '11' },
    { key: '12', value: '12' },
    { key: '13', value: '13' },
    { key: '14', value: '14' },
    { key: '15', value: '15' },
    { key: '16', value: '16' },
    { key: '17', value: '17' },
    { key: '18', value: '18' },
    { key: '19', value: '19' },
    { key: '20', value: '20' },
    { key: '21', value: '21' },
    { key: '22', value: '22' },
    { key: '23', value: '23' },
    { key: '24', value: '24' },
  ]

  const bookableTimes = [
    { key: '1', value: "00:00" },
    { key: '2', value: "01:00" },
    { key: '3', value: "02:00" },
    { key: '4', value: "03:00" },
    { key: '5', value: "04:00" },
    { key: '6', value: "05:00" },
    { key: '7', value: "06:00" },
    { key: '8', value: "07:00" },
    { key: '9', value: "08:00" },
    { key: '10', value: "09:00" },
    { key: '11', value: "10:00" },
    { key: '12', value: "11:00" },
    { key: '13', value: "12:00" },
    { key: '14', value: "13:00" },
    { key: '15', value: "14:00" },
    { key: '16', value: "15:00" },
    { key: '17', value: "16:00" },
    { key: '18', value: "17:00" },
    { key: '19', value: "18:00" },
    { key: '20', value: "19:00" },
    { key: '21', value: "20:00" },
    { key: '22', value: "21:00" },
    { key: '23', value: "22:00" },
    { key: '24', value: "23:00" },
  ]

  return (
    <ScrollView style={styles.container} ref={scrollViewRef} scrollEventThrottle={1} contentInset={{ bottom: '30%' }}>
      <Text style={styles.header}>Add Bookable Object</Text>
      <View style={[styles.settingContainer, { backgroundColor: objectNameBackgroundColor }]}>
        <TextInput
          style={styles.objectName}
          placeholder="Object name"
          onChangeText={(objectName) => setObjectName(objectName)}
          value={objectName}
        ></TextInput>
      </View>
      <View style={[styles.settingContainer, { backgroundColor: lengthPerBookingBackgroundColor }]}>
        <View style={styles.settingContainer}>
          <Text style={styles.settingLabel}>Length per booking</Text>
          <SelectList
            setSelected={(val) => {
              setSelected(val)
              // this.selectedHoursBookable = lengthPerBooking[val - 1].value

              lengthInHours = lengthPerBooking[val - 1].value.substring(0, 2)
              lengthInHoursInt = parseInt(lengthInHours)
              console.log('length In Hours: ' + lengthInHoursInt)
              setSelectedHoursBookable(lengthInHoursInt)
            }}
            data={lengthPerBooking}
          />
        </View>
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Bookable all day</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#53d5d5' }}
          value={allDayEnabled} onValueChange={setAllDayEnabled} />
      </View>
      <View>
        {allDayEnabled ? (
          <View style={[styles.settingContainer, { backgroundColor: firstStartTimeBackgroundColor }]}>
            <View style={styles.settingContainer}
            onLayout={handleLayout}>
              <Text style={styles.settingLabel}>First start time</Text>
              <SelectList
                setSelected={(val) => {
                  setSelected(val)
                  //this.firstStartTime = bookableTimes[val - 1].value
                  setFirstStartTime(bookableTimes[val - 1].value)

                  console.log('HÄR HAR VI ALL INFO OM OBJEKTET: Associations id: ' + associationId + ' Namn: ' + objectName + ' slot längd: ' + selectedHoursBookable + ' första start tid: ' + firstStartTime + ' gånger per dag: ' + slotsBookablePerDay + ' gånger per vecka: ' + slotsBookablePerWeek)
                  startTime = bookableTimes[val - 1].value.substring(0, 2)
                  startTimeInt = parseInt(startTime) //THIS WILL BE THE timeSlotStartTime
                  console.log('Start Time:' + startTimeInt)

                  amountOfHoursADay = 24 - 24 % selectedHoursBookable
                  console.log('Amount of hours:' + amountOfHoursADay)

                  endTimeInt = startTimeInt + amountOfHoursADay //THIS WILL BE THE timeSlotEndTime; IF > 24 => GÅR ÖVER NATTEN
                  setEarliestBookableTime(bookableTimes[startTimeInt].value)
                  console.log('Start Time 1: ' + earliestBookableTime)

                  if (endTimeInt <= 24) {
                    setLatestBookableTime(bookableTimes[endTimeInt].value)
                    console.log('End Time 1: ' + latestBookableTime)
                  } else {
                    endTimeInt = endTimeInt - 24
                    setLatestBookableTime(bookableTimes[endTimeInt].value)
                    console.log('End Time 2: ' + latestBookableTime)
                  }
                }}
                data={bookableTimes}
              />
            </View>
          </View>
        ) : (
          <View>
            <View style={[styles.settingContainer, { backgroundColor: earliestBookableTimeBackgroundColor }]}>
              <View style={styles.settingContainer}
              onLayout={handleLayout}>
                <Text style={styles.settingLabel}>Earliest bookable time</Text>
                <SelectList
                  setSelected={(val) => {
                    setSelected(val)
                    // this.earliestBookableTime = bookableTimes[val - 1].value
                    setEarliestBookableTime(bookableTimes[val - 1].value)
                  }}
                  data={bookableTimes}
                />
              </View>
            </View>
            <View style={[styles.settingContainer, { backgroundColor: latestBookableTimeBackgroundColor }]}>
              <View style={styles.settingContainer}
              onLayout={handleLayout}>
                <Text style={styles.settingLabel}>Latest bookable time</Text>
                <SelectList
                  setSelected={(val) => {
                    setSelected(val)
                    // this.latestBookableTime = bookableTimes[val - 1].value
                    setLatestBookableTime(bookableTimes[val - 1].value)
                  }}
                  data={bookableTimes}
                />
              </View>
            </View>
          </View>
        )}
      </View>
      <View style={[styles.settingContainer, { backgroundColor: slotsBookablePerDayBackgroundColor }]}>
        <View style={styles.settingContainer}
        onLayout={handleLayout}>
          <Text style={styles.settingLabel}>Slots bookable per day</Text>
          <SelectList
            setSelected={(val) => {
              setSelected(val)
              // this.slotsBookablePerDay = lengthPerBooking[val - 1].value
              setSlotsBookablePerDay(amountOfTimes[val - 1].value)
            }}
            data={amountOfTimes}
          />
        </View>
      </View>
      <View style={[styles.settingContainer, { backgroundColor: slotsBookablePerWeekBackgroundColor }]}>
        <View style={styles.settingContainer}
          onLayout={handleLayout}>
          <Text style={styles.settingLabel}>Slots bookable per week</Text>
          <SelectList
            setSelected={(val) => {
              setSelected(val)
              //this.slotsBookablePerWeek = lengthPerBooking[val - 1].value
              setSlotsBookablePerWeek(amountOfTimes[val - 1].value)
            }}
            data={amountOfTimes}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => {
        if (allDayEnabled) {
          if (objectName == '') {
            setBackgroundColor('#F88379', 'white', 'white', 'white', 'white', 'white', 'white')
          } else if (selectedHoursBookable == undefined) {
            setBackgroundColor('white', '#F88379', 'white', 'white', 'white', 'white', 'white')
          } else if (firstStartTime == undefined) {
            setBackgroundColor('white', 'white', 'white', 'white', '#F88379', 'white', 'white')
          } else if (slotsBookablePerDay == undefined) {
            setBackgroundColor('white', 'white', 'white', 'white', 'white', '#F88379', 'white')
          } else if (slotsBookablePerWeek == undefined) {
            setBackgroundColor('white', 'white', 'white', 'white', 'white', 'white', '#F88379')
          } else {
            setBackgroundColor('white', 'white', 'white', 'white', 'white', 'white', 'white')

            console.log('HÄR HAR VI ALL INFO OM OBJEKTET 2: Associations id: ' + associationId + ' Namn: ' + objectName + ' slot längd: ' + selectedHoursBookable + ' tidigaste bokningsbar: ' + earliestBookableTime + ' senast bokningsbar: ' + latestBookableTime + ' gånger per dag: ' + slotsBookablePerDay + ' gånger per vecka: ' + slotsBookablePerWeek)
            addBookableObject()
          }
        }
        else {
          if (objectName == '') {
            setBackgroundColor('#F88379', 'white', 'white', 'white', 'white', 'white', 'white')
            console.log('Object name:Associations id: ' + associationId + ' Namn: ' + objectName + ' slot längd: ' + selectedHoursBookable + ' tidigaste bokningsbar: ' + earliestBookableTime + ' senast bokningsbar: ' + latestBookableTime + ' gånger per dag: ' + slotsBookablePerDay + ' gånger per vecka: ' + slotsBookablePerWeek)
          } else if (selectedHoursBookable == undefined) {
            setBackgroundColor('white', '#F88379', 'white', 'white', 'white', 'white', 'white')
          } else if (earliestBookableTime == undefined) {
            setBackgroundColor('white', 'white', '#F88379', 'white', 'white', 'white', 'white')
          } else if (latestBookableTime == undefined) {
            setBackgroundColor('white', 'white', 'white', '#F88379', 'white', 'white', 'white')
          } else if (slotsBookablePerDay == undefined) {
            setBackgroundColor('white', 'white', 'white', 'white', 'white', '#F88379', 'white')
          } else if (slotsBookablePerWeek == undefined) {
            setBackgroundColor('white', 'white', 'white', 'white', 'white', 'white', '#F88379')
          } else {
            setBackgroundColor('white', 'white', 'white', 'white', 'white', 'white', 'white')

            console.log('HÄR HAR VI ALL INFO OM OBJEKTET: Associations id: ' + associationId + ' Namn: ' + objectName + ' slot längd: ' + selectedHoursBookable + ' tidigaste bokningsbar: ' + earliestBookableTime + ' senast bokningsbar: ' + latestBookableTime + ' gånger per dag: ' + slotsBookablePerDay + ' gånger per vecka: ' + slotsBookablePerWeek)
            addBookableObject()
          }
        }
      }}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}