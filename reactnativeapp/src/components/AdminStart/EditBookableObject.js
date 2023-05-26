import Style from "../../screens/Style";
import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, ScrollView, Pressable, Modal } from 'react-native';
import { TextInput } from "react-native-paper";
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import styles from "../../screens/Style";
import axios from "../../../axios/axios";
import { ActivityIndicator } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../auth/UserContextProvider";
import { AntDesign } from '@expo/vector-icons';
import IOSPopup from "../Misc/PopUp";

export default function EditBookableObject({ route }) {
  const { objectId, associationName, associationId } = route.params
  const [isLoading, setIsLoading] = useState(true)
  const [objectData, setObjectData] = useState();
  const [objectName, setObjectName] = useState();
  const [allDayEnabled, setAllDayEnabled] = useState(false);
  const [selected, setSelected] = React.useState("");
  const [selectedHoursBookable, setSelectedHoursBookable] = useState();
  const [selectedWeeksBookable, setSelectedWeeksBookable] = useState();
  const [earliestBookableTime, setEarliestBookableTime] = useState();
  const [latestBookableTime, setLatestBookableTime] = useState();
  const [firstStartTime, setFirstStartTime] = useState();
  const [slotsBookablePerDay, setSlotsBookablePerDay] = useState();
  const [slotsBookablePerWeek, setSlotsBookablePerWeek] = useState();
  const [EnterModalVisible, setEnterModalVisible] = useState(false)
  const navigation = useNavigation()
  const [popupVisible, setPopupVisible] = useState(false);
    const { state, colorTheme, authContext  } = useContext(AuthContext)
    const {t} = authContext

  const handleButtonPress = (index) => {
    if (index === 0) { // Yes button pressed
      setPopupVisible(false);
      removeBookableObject()
      navigation.goBack()
    }
    console.log('Button Pressed:', index);
    setPopupVisible(false);
  };

  const handleCancelPress = () => {
    console.log('Popup Cancelled');
    setPopupVisible(false);
  };

  const editBookableObject = async () => {
    console.log('Assosiation name?: ' + associationName + 'Association id: ' + associationId + 'object id: ' + objectId)
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
      slotsPerWeek: slotsBookablePerWeek,
      bookAheadWeeks: selectedWeeksBookable
    }
    axios.put(`association/bookableobject/${objectId}/update`,
      bodyParameters,
      config
    )
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  }


  const removeBookableObject = async () => {
    const config = {
      headers: { Authorization: `Bearer ${state.userToken}` }
    };

    axios.delete(`association/bookableobject/${objectId}/delete`, config)
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  }

  async function GetObjectData(objectId) {
    axios.get('object/get/' + objectId)
      .then(response => {
        console.log("OBJECT DATAN HÄR: " + response.data)
        setObjectData(response.data)
        setObjectName(response.data.objectName)
        setSelectedHoursBookable(response.data.timeSlotLength)
        setSelectedWeeksBookable(response.data.bookAheadWeeks)
        setEarliestBookableTime(response.data.timeSlotStartTime)
        setLatestBookableTime(response.data.timeSlotEndTime)
        setFirstStartTime(response.data.timeSlotStartTime)
        setSlotsBookablePerDay(response.data.slotsPerDay)
        setSlotsBookablePerWeek(response.data.slotsPerWeek)

      })
      .catch(error => {
        console.log(error);
        setErrorModalVisible(true)
      })
      .finally(() => {
        setIsLoading(false)

      })
  }

  useEffect(() => {
    console.log('OBJECT ID: ' + objectId)
    GetObjectData(objectId)
  }, [])

  const lengthPerBooking = [
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

  const maxprebookValues = [
    { key: '1', value: '1 week' },
    { key: '2', value: '2 weeks' },
    { key: '3', value: '3 weeks' },
    { key: '4', value: '4 weeks' },
    { key: '5', value: '5 weeks' },
    { key: '6', value: '6 weeks' },
    { key: '7', value: '7 weeks' },
    { key: '8', value: '8 weeks' },
    { key: '9', value: '9 weeks' },
    { key: '10', value: '10 weeks' },
    { key: '11', value: '11 weeks' },
    { key: '12', value: '12 weeks' },
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

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><ActivityIndicator /></View>

    )
  }
  return (
    <ScrollView style={styles.container} contentInset={{ bottom: '20%' }}>
      <Text style={styles.header}>{t("EditBookableObject")}</Text>
      <View style={styles.settingContainer}>
        <TextInput style={styles.objectName}
          placeholder={objectName}
          onChangeText={(objectName) => setObjectName(objectName)}
          value={objectName}
        ></TextInput>
      </View>
      <View style={styles.settingContainer}>
      <View style={styles.settingLabelOverhead}>
        <Text style={styles.settingLabel}>{t("LengthPerBooking")}</Text>
        </View>
        <SelectList
          placeholder={selectedHoursBookable}
          setSelected={(val) => {
            setSelected(val)
            lengthInHours = lengthPerBooking[val - 1].value.substring(0, 2)
            lengthInHoursInt = parseInt(lengthInHours)
            console.log('length In Hours: ' + lengthInHoursInt)
            setSelectedHoursBookable(lengthInHoursInt)
          }}
          data={lengthPerBooking}
        />
      </View>
      <View style={styles.settingContainer}>
      <View style={styles.settingLabelOverhead}>
        <Text style={styles.settingLabel}>{t("BookAhead")}</Text>
        </View>
        <SelectList
        placeholder={selectedWeeksBookable}
            setSelected={(val) => {
              setSelected(val)
              // this.selectedHoursBookable = lengthPerBooking[val - 1].value

              lengthInWeeks = maxprebookValues[val - 1].value.substring(0, 2)
              lengthInWeeksInt = parseInt(lengthInWeeks)
              console.log('length In Hours: ' + lengthInWeeksInt)
              setSelectedWeeksBookable(lengthInWeeksInt)
            }}
            data={maxprebookValues}
          />
      </View>
      <View style={styles.settingContainer}>
      <View style={styles.settingLabelOverhead}>
        <Text style={styles.settingLabel}>{t("BookableAllDay")}</Text>
        </View>
        <Switch
          trackColor={{ false: '#767577', true: '#53d5d5' }}
          value={allDayEnabled} onValueChange={setAllDayEnabled} />
      </View>
      <View>
        {allDayEnabled ? (
          <View style={styles.settingContainer}>
            <View style={styles.settingLabelOverhead}>
            <Text style={styles.settingLabel}>{t("FirstStartTime")}</Text>
            </View>
            <SelectList
              placeholder={firstStartTime}
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
        ) : (
          <View>
            <View style={styles.settingContainer}>
            <View style={styles.settingLabelOverhead}>
              <Text style={styles.settingLabel}>{t("EarliestBookableTime")}</Text>
              </View>
              <SelectList
                placeholder={earliestBookableTime}
                setSelected={(val) => {
                  setSelected(val)
                  // this.earliestBookableTime = bookableTimes[val - 1].value
                  setEarliestBookableTime(bookableTimes[val - 1].value)
                }}
                data={bookableTimes}
              />
            </View>
            <View style={styles.settingContainer}>
            <View style={styles.settingLabelOverhead}>
              <Text style={styles.settingLabel}>{t("LatestBookableTime")}</Text>
              </View>
              <SelectList
                placeholder={latestBookableTime}
                setSelected={(val) => {
                  setSelected(val)
                  // this.latestBookableTime = bookableTimes[val - 1].value
                  setLatestBookableTime(bookableTimes[val - 1].value)
                }}
                data={bookableTimes}
              />
            </View>
          </View>
        )}
      </View>
      <View style={styles.settingContainer}>
      <View style={styles.settingLabelOverhead}>
        <Text style={styles.settingLabel}>{t("SlotsBookablePerDay")}</Text>
        </View>
        <SelectList
          placeholder={slotsBookablePerDay}
          setSelected={(val) => {
            setSelected(val)
            // this.slotsBookablePerDay = lengthPerBooking[val - 1].value
            setSlotsBookablePerDay(amountOfTimes[val - 1].value)
          }}
          data={amountOfTimes}
        />
      </View>
      <View style={styles.settingContainer}>
      <View style={styles.settingLabelOverhead}>
        <Text style={styles.settingLabel}>{t("SlotsBookablePerWeek")}</Text>
        </View>
        <SelectList
          placeholder={slotsBookablePerWeek}
          setSelected={(val) => {
            setSelected(val)
            //this.slotsBookablePerWeek = lengthPerBooking[val - 1].value
            setSlotsBookablePerWeek(amountOfTimes[val - 1].value)
          }}
          data={amountOfTimes}
        />
      </View>
      <TouchableOpacity style={styles.button}
        onPress={() => {
          editBookableObject()
          navigation.goBack()
        }}>
        <Text style={styles.buttonText}>{t("Save")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setPopupVisible(true)}
      >
        <Text style={{ color: '#bb0a1e', alignSelf: 'center', margin: '4%' }}>{t("RemoveThisObject")}</Text>
      </TouchableOpacity>
      <IOSPopup
  visible={popupVisible}
  title={<Text style={{fontWeight:200}}>{t("WantToDelete")}</Text>}
  hasInput={false}
  buttonTexts={['Yes', 'No']}
  buttonColor={colorTheme.firstColor}
  onButtonPress={handleButtonPress}
  onCancelPress={handleCancelPress}
/>
    </ScrollView>
  );
}