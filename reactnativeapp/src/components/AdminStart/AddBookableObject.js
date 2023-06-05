import React, { useContext, useEffect, useState, useRef } from 'react';
import { Text, View, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput } from "react-native-paper";
import { SelectList } from 'react-native-dropdown-select-list';
import styles from "../../screens/Style";
import axios from "../../../axios/axios";
import { AuthContext } from "../../../auth/UserContextProvider";
import { useNavigation } from "@react-navigation/native";

export default function AddBookableObject({ route }) {
  const { associationId } = route.params
  const navigation = useNavigation()
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
  const [selectedWeeksBookable, setSelectedWeeksBookable] = useState();
  const [earliestBookableTime, setEarliestBookableTime] = useState();
  const [latestBookableTime, setLatestBookableTime] = useState();
  const [firstStartTime, setFirstStartTime] = useState();
  const [slotsBookablePerDay, setSlotsBookablePerDay] = useState();
  const [slotsBookablePerWeek, setSlotsBookablePerWeek] = useState();
  const [selectListPosition, setSelectListPosition] = useState(0);

  const { authContext, colorTheme } = useContext(AuthContext);
  const { signOut, t, setLang, getLang } = authContext

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
      slotsPerWeek: slotsBookablePerWeek,
      bookAheadWeeks: selectedWeeksBookable
    }
    axios.post('association/bookableobject/add',
      bodyParameters
    )
      .then(response => {
        
      })
      .catch(error => {
        
      });
  }

  const lengthPerBooking = [
    { key: '1', value: <Text>1 {t("hour")}</Text>},
    { key: '2', value: <Text>2 {t("hours")}</Text> },
    { key: '3', value: <Text>3 {t("hours")}</Text> },
    { key: '4', value: <Text>4 {t("hours")}</Text> },
    { key: '5', value: <Text>5 {t("hours")}</Text> },
    { key: '6', value: <Text>6 {t("hours")}</Text> },
    { key: '7', value: <Text>7 {t("hours")}</Text> },
    { key: '8', value: <Text>8 {t("hours")}</Text> },
    { key: '9', value: <Text>9 {t("hours")}</Text> },
    { key: '10', value: <Text>10 {t("hours")}</Text> },
    { key: '11', value: <Text>11 {t("hours")}</Text> },
    { key: '12', value: <Text>12 {t("hours")}</Text> },
    { key: '13', value: <Text>13 {t("hours")}</Text> },
    { key: '14', value: <Text>14 {t("hours")}</Text> },
    { key: '15', value: <Text>15 {t("hours")}</Text> },
    { key: '16', value: <Text>16 {t("hours")}</Text> },
    { key: '17', value: <Text>17 {t("hours")}</Text> },
    { key: '18', value: <Text>18 {t("hours")}</Text> },
    { key: '19', value: <Text>19 {t("hours")}</Text> },
    { key: '20', value: <Text>20 {t("hours")}</Text> },
    { key: '21', value: <Text>21 {t("hours")}</Text> },
    { key: '22', value: <Text>22 {t("hours")}</Text> },
    { key: '23', value: <Text>23 {t("hours")}</Text> },
    { key: '24', value: <Text>24 {t("hours")}</Text> },
  ]

  const maxprebookValues = [
    { key: '1', value: <Text>1 {t("week")}</Text> },
    { key: '2', value: <Text>2 {t("weeks")}</Text> },
    { key: '3', value: <Text>3 {t("weeks")}</Text> },
    { key: '4', value: <Text>4 {t("weeks")}</Text> },
    { key: '5', value: <Text>5 {t("weeks")}</Text> },
    { key: '6', value: <Text>6 {t("weeks")}</Text> },
    { key: '7', value: <Text>7 {t("weeks")}</Text> },
    { key: '8', value: <Text>8 {t("weeks")}</Text> },
    { key: '9', value: <Text>9 {t("weeks")}</Text> },
    { key: '10', value: <Text>10 {t("weeks")}</Text> },
    { key: '11', value: <Text>11 {t("weeks")}</Text> },
    { key: '12', value: <Text>12 {t("weeks")}</Text> },
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
    <ScrollView style={styles.container} scrollEventThrottle={1} contentInset={{ bottom: '30%' }}>
      <Text style={styles.header}>{t("AddBookableObject")}</Text>
      <View style={[styles.settingContainer, { backgroundColor: objectNameBackgroundColor }]}>
        <TextInput
          style={styles.objectName}
          placeholder={t("ObjectName")}
          onChangeText={(objectName) => setObjectName(objectName)}
          value={objectName}
        ></TextInput>
      </View>
      <View style={[styles.settingContainer, { backgroundColor: lengthPerBookingBackgroundColor }]}>
        <View style={styles.settingContainer}>
        <View style={styles.settingLabelOverhead}>
          <Text style={styles.settingLabel}>{t("LengthPerBooking")}</Text>
          </View>
          <View style={styles.settingLabelOverhead}>
          <SelectList
          boxStyles={styles.adminSelectListBoxStyle}
          dropdownStyles={styles.adminSelectListDropdownStyle}
          search={true}
          dropdownShown={false}
            setSelected={(val) => {
              setSelected(val)

              lengthInHours = lengthPerBooking[val - 1].key
              lengthInHoursInt = parseInt(lengthInHours)
              
              setSelectedHoursBookable(lengthInHoursInt)
            }}
            data={lengthPerBooking}
          />
          </View>
        </View>
      </View>
      <View style={[styles.settingContainer, { backgroundColor: lengthPerBookingBackgroundColor }]}>
        <View style={styles.settingContainer}>
        <View style={styles.settingLabelOverhead}>
          <Text style={styles.settingLabel}>{t("BookAhead")}</Text>
          </View>
          <View style={styles.settingLabelOverhead}>
          <SelectList
          boxStyles={styles.adminSelectListBoxStyle}
          dropdownStyles={styles.adminSelectListDropdownStyle}
          search={true}
          dropdownShown={false}
            setSelected={(val) => {
              setSelected(val)

              lengthInWeeks = maxprebookValues[val - 1].key
              lengthInWeeksInt = parseInt(lengthInWeeks)
              
              setSelectedWeeksBookable(lengthInWeeksInt)
            }}
            data={maxprebookValues}
          /></View>
        </View>
      </View>
      <View style={styles.settingContainer}>
      <View style={styles.settingLabelOverhead}>
        <Text style={styles.settingLabel}>{t("BookableAllDay")}</Text>
        </View>
        <Switch
          trackColor={{ false: '#767577', true: colorTheme.firstColor }}
          value={allDayEnabled} onValueChange={setAllDayEnabled} />
      </View>
      <View>
        {allDayEnabled ? (
          <View style={[styles.settingContainer, { backgroundColor: firstStartTimeBackgroundColor }]}>
            <View style={styles.settingContainer}>
               <View style={styles.settingLabelOverhead}>
              <Text style={styles.settingLabel}>{t("FirstStartTime")}</Text>
              </View>
              <View style={styles.settingLabelOverhead}>
              <SelectList
              boxStyles={styles.adminSelectListBoxStyle}
              dropdownStyles={styles.adminSelectListDropdownStyle}
              search={true}
              dropdownShown={false}
                setSelected={(val) => {
                  setSelected(val)
                  setFirstStartTime(bookableTimes[val - 1].value)

                  
                  startTime = bookableTimes[val - 1].value.substring(0, 2)
                  startTimeInt = parseInt(startTime) //THIS WILL BE THE timeSlotStartTime
                  

                  amountOfHoursADay = 24 - 24 % selectedHoursBookable
                  

                  endTimeInt = startTimeInt + amountOfHoursADay //THIS WILL BE THE timeSlotEndTime; IF > 24 => GÅR ÖVER NATTEN
                  setEarliestBookableTime(bookableTimes[startTimeInt].value)
                  

                  if (endTimeInt <= 24) {
                    setLatestBookableTime(bookableTimes[endTimeInt].value)
                    
                  } else {
                    endTimeInt = endTimeInt - 24
                    setLatestBookableTime(bookableTimes[endTimeInt].value)
                    
                  }
                }}
                data={bookableTimes}
              /></View>
            </View>
          </View>
        ) : (
          <View>
            <View style={[styles.settingContainer, { backgroundColor: earliestBookableTimeBackgroundColor }]}>
              <View style={styles.settingContainer}>
                 <View style={styles.settingLabelOverhead}>
                <Text style={styles.settingLabel}>{t("EarliestBookableTime")}</Text>
                </View>
                <View style={styles.settingLabelOverhead}>
                <SelectList
                boxStyles={styles.adminSelectListBoxStyle}
                dropdownStyles={styles.adminSelectListDropdownStyle}
                search={true}
                dropdownShown={false}
                  setSelected={(val) => {
                    setSelected(val)
                    setEarliestBookableTime(bookableTimes[val - 1].value)
                  }}
                  data={bookableTimes}
                /></View>
              </View>
            </View>
            <View style={[styles.settingContainer, { backgroundColor: latestBookableTimeBackgroundColor }]}>
              <View style={styles.settingContainer}>
                 <View style={styles.settingLabelOverhead}>
                <Text style={styles.settingLabel}>{t("LatestBookableTime")}</Text>
                </View>
                <View style={styles.settingLabelOverhead}>
                <SelectList
                boxStyles={styles.adminSelectListBoxStyle}
                dropdownStyles={styles.adminSelectListDropdownStyle}
                search={true}
                dropdownShown={false}
                  setSelected={(val) => {
                    setSelected(val)
                    setLatestBookableTime(bookableTimes[val - 1].value)
                  }}
                  data={bookableTimes}
                /></View>
              </View>
            </View>
          </View>
        )}
      </View>
      <View style={[styles.settingContainer, { backgroundColor: slotsBookablePerDayBackgroundColor }]}>
        <View style={styles.settingContainer}>
           <View style={styles.settingLabelOverhead}>
          <Text style={styles.settingLabel}>{t("SlotsBookablePerDay")}</Text>
          </View>
          <View style={styles.settingLabelOverhead}>
          <SelectList
          boxStyles={styles.adminSelectListBoxStyle}
          dropdownStyles={styles.adminSelectListDropdownStyle}
          search={true}
          dropdownShown={false}
            setSelected={(val) => {
              setSelected(val)
              setSlotsBookablePerDay(amountOfTimes[val - 1].key)
            }}
            data={amountOfTimes}
          /></View>
        </View>
      </View>
      <View style={[styles.settingContainer, { backgroundColor: slotsBookablePerWeekBackgroundColor }]}>
        <View style={styles.settingContainer}>
             <View style={styles.settingLabelOverhead}>
          <Text style={styles.settingLabel}>{t("SlotsBookablePerWeek")}</Text>
          </View>
          <View style={styles.settingLabelOverhead}>
          <SelectList
          boxStyles={styles.adminSelectListBoxStyle}
          dropdownStyles={styles.adminSelectListDropdownStyle}
          search={true}
          dropdownShown={false}
            setSelected={(val) => {
              setSelected(val)
              setSlotsBookablePerWeek(amountOfTimes[val - 1].key)
            }}
            data={amountOfTimes}
          /></View>
        </View>
      </View>
      <TouchableOpacity style={[styles.button, {backgroundColor: colorTheme.firstColor}]} onPress={() => {
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

            
            addBookableObject()
            navigation.goBack()
          }
        }
        else {
          if (objectName == '') {
            setBackgroundColor('#F88379', 'white', 'white', 'white', 'white', 'white', 'white')
            
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

            
            addBookableObject()
            navigation.goBack()
          }
        }
      }}>
        <Text style={styles.buttonText}>{t("Save")}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}