import Style from "../../screens/Style";
import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, ScrollView} from 'react-native';
import { TextInput } from "react-native-paper";
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import styles from "../../screens/Style";

export default function AddBookableObject({route}) {
  const {associationId} = route.params
  const [allDayEnabled, setAllDayEnabled] = useState(false);
  const [selected, setSelected] = React.useState("");
  const [objectName,setObjectName] = useState('');
  const [objectNameBackgroundColor, setObjectNameBackgroundColor] = useState('white');
  const [lengthPerBookingBackgroundColor, setLengthPerBookingBackgroundColor] = useState('white');
  const [earliestBookableTimeBackgroundColor, setEarliestBookableTimeBackgroundColor] = useState('white');
  const [latestBookableTimeBackgroundColor, setLatestBookableTimeBackgroundColor] = useState('white');
  const [firstStartTimeBackgroundColor, setFirstStartTimeBackgroundColor] = useState('white');
  const [slotsBookablePerDayBackgroundColor, setSlotsBookablePerDayBackgroundColor] = useState('white');
  const [slotsBookablePerWeekBackgroundColor, setSlotsBookablePerWeekBackgroundColor] = useState('white');

  const lengthPerBooking = [
    {key:'1', value:'1'},
    {key:'2', value:'2'},
    {key:'3', value:'3'},
    {key:'4', value:'4'},
    {key:'5', value:'5'},
    {key:'6', value:'6'},
    {key:'7', value:'7'},
    {key:'8', value:'8'},
    {key:'9', value:'9'},
    {key:'10', value:'10'},
    {key:'11', value:'11'},
    {key:'12', value:'12'},
    {key:'13', value:'13'},
    {key:'14', value:'14'},
    {key:'15', value:'15'},
    {key:'16', value:'16'},
    {key:'17', value:'17'},
    {key:'18', value:'18'},
    {key:'19', value:'19'},
    {key:'20', value:'20'},
    {key:'21', value:'21'},
    {key:'22', value:'22'},
    {key:'23', value:'23'},
    {key:'24', value:'24'},
]

const bookableTimes = [
    {key:'1', value:"00:00"},
    {key:'2', value:"01:00"},
    {key:'3', value:"02:00"},
    {key:'4', value:"03:00"},
    {key:'5', value:"04:00"},
    {key:'6', value:"05:00"},
    {key:'7', value:"06:00"},
    {key:'8', value:"07:00"},
    {key:'9', value:"08:00"},
    {key:'10', value:"09:00"},
    {key:'11', value:"10:00"},
    {key:'12', value:"11:00"},
    {key:'13', value:"12:00"},
    {key:'14', value:"13:00"},
    {key:'15', value:"14:00"},
    {key:'16', value:"15:00"},
    {key:'17', value:"16:00"},
    {key:'18', value:"17:00"},
    {key:'19', value:"18:00"},
    {key:'20', value:"19:00"},
    {key:'21', value:"20:00"},
    {key:'22', value:"21:00"},
    {key:'23', value:"22:00"},
    {key:'24', value:"23:00"},
]

var selectedHoursBookable = '';
var earliestBookableTime = '';
var latestBookableTime = '';
var firstStartTime = '';
var slotsBookablePerDay = '';
var slotsBookablePerWeek = '';

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add Bookable Object</Text>
      <View style={[styles.settingContainer,{backgroundColor: objectNameBackgroundColor}]}>
        <TextInput 
        style={styles.objectName} 
        placeholder="Object name"
        onChangeText={(objectName) => setObjectName(objectName)}
        value={objectName}
        ></TextInput>
      </View>
      <View style={[styles.settingContainer,{backgroundColor: lengthPerBookingBackgroundColor}]}>
      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Length per booking</Text>
        <SelectList 
        setSelected={(val) => {
            setSelected(val)
            this.selectedHoursBookable = lengthPerBooking[val-1].value
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
          <View style={[styles.settingContainer,{backgroundColor: firstStartTimeBackgroundColor}]}>
          <View style={styles.settingContainer}>
          <Text style={styles.settingLabel}>First start time</Text>
          <SelectList 
          setSelected={(val) => {
              setSelected(val)
              this.firstStartTime = bookableTimes[val-1].value
              console.log('Första starttid: ' + this.firstStartTime)
          }} 
          data={bookableTimes} 
      />
      </View>
      </View>
        ) : (
            <View>
              <View style={[styles.settingContainer,{backgroundColor: earliestBookableTimeBackgroundColor}]}>
            <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Earliest bookable time</Text>
        <SelectList 
        setSelected={(val) => {
            setSelected(val)
            this.earliestBookableTime = bookableTimes[val-1].value
            console.log('Tidigaste bokningsbara: ' + this.earliestBookableTime)
        }} 
        data={bookableTimes} 
    />
    </View>
    </View>
    <View style={[styles.settingContainer,{backgroundColor: latestBookableTimeBackgroundColor}]}>
    <View style={styles.settingContainer}>
    <Text style={styles.settingLabel}>Latest bookable time</Text>
        <SelectList 
        setSelected={(val) => {
            setSelected(val)
            this.latestBookableTime = bookableTimes[val-1].value
            console.log('Senaste bokningsbara: ' + this.latestBookableTime)
        }} 
        data={bookableTimes} 
    />
    </View>
      </View>
      </View>
        )}
      </View>
      <View style={[styles.settingContainer,{backgroundColor: slotsBookablePerDayBackgroundColor}]}>
      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Slots bookable per day</Text>
        <SelectList 
        setSelected={(val) => {
            setSelected(val)
            this.slotsBookablePerDay = lengthPerBooking[val-1].value
        }} 
        data={lengthPerBooking} 
    />
    </View>
    </View>
    <View style={[styles.settingContainer,{backgroundColor: slotsBookablePerWeekBackgroundColor}]}>
    <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Slots bookable per week</Text>
        <SelectList 
        setSelected={(val) => {
            setSelected(val)
            this.slotsBookablePerWeek = lengthPerBooking[val-1].value
        }} 
        data={lengthPerBooking} 
    />
    </View>
    </View>
      <TouchableOpacity style={styles.button} onPress= {() => {
        if (objectName==''){
          setObjectNameBackgroundColor('#F88379');
          setLengthPerBookingBackgroundColor('white');
          setEarliestBookableTimeBackgroundColor('white');
          setFirstStartTimeBackgroundColor('white');
          setLatestBookableTimeBackgroundColor('white');
          setSlotsBookablePerDayBackgroundColor('white');
          setSlotsBookablePerWeekBackgroundColor('white');
        } else if(selectedHoursBookable=='') { 
          setObjectNameBackgroundColor('white');
          setLengthPerBookingBackgroundColor('#F88379');
          setEarliestBookableTimeBackgroundColor('white');
          setFirstStartTimeBackgroundColor('white');
          setLatestBookableTimeBackgroundColor('white');
          setSlotsBookablePerDayBackgroundColor('white');
          setSlotsBookablePerWeekBackgroundColor('white');
        } else if(earliestBookableTime==''){
          setObjectNameBackgroundColor('white');
          setLengthPerBookingBackgroundColor('white');
          setEarliestBookableTimeBackgroundColor('#F88379');
          setFirstStartTimeBackgroundColor('white');
          setLatestBookableTimeBackgroundColor('white');
          setSlotsBookablePerDayBackgroundColor('white');
          setSlotsBookablePerWeekBackgroundColor('white');
        } else if(firstStartTime==''){
          setObjectNameBackgroundColor('white');
          setLengthPerBookingBackgroundColor('white');
          setEarliestBookableTimeBackgroundColor('white');
          setFirstStartTimeBackgroundColor('#F88379');
          setLatestBookableTimeBackgroundColor('white');
          setSlotsBookablePerDayBackgroundColor('white');
          setSlotsBookablePerWeekBackgroundColor('white');
        } else if(latestBookableTime==''){
          setObjectNameBackgroundColor('white');
          setLengthPerBookingBackgroundColor('white');
          setEarliestBookableTimeBackgroundColor('white');
          setFirstStartTimeBackgroundColor('white');
          setLatestBookableTimeBackgroundColor('#F88379');
          setSlotsBookablePerDayBackgroundColor('white');
          setSlotsBookablePerWeekBackgroundColor('white');
        } else if(slotsBookablePerDay==''){
          setObjectNameBackgroundColor('white');
          setLengthPerBookingBackgroundColor('white');
          setEarliestBookableTimeBackgroundColor('white');
          setFirstStartTimeBackgroundColor('white');
          setLatestBookableTimeBackgroundColor('white');
          setSlotsBookablePerDayBackgroundColor('#F88379');
          setSlotsBookablePerWeekBackgroundColor('white');
        } else if(slotsBookablePerWeek==''){
          setObjectNameBackgroundColor('white');
          setLengthPerBookingBackgroundColor('white');
          setEarliestBookableTimeBackgroundColor('white');
          setFirstStartTimeBackgroundColor('white');
          setLatestBookableTimeBackgroundColor('white');
          setSlotsBookablePerDayBackgroundColor('white');
          setSlotsBookablePerWeekBackgroundColor('#F88379');
        } else {
        if (allDayEnabled){
           console.log('HÄR HAR VI ALL INFO OM OBJEKTET: Associations id: ' + associationId + ' Namn: ' + objectName + ' slot längd: ' + this.selectedHoursBookable + ' första start tid: ' + this.firstStartTime + ' gånger per dag: ' + this.slotsBookablePerDay + ' gånger per vecka: ' + this.slotsBookablePerWeek)
         startTime = this.firstStartTime.substring(0,2)
         startTimeInt = parseInt(startTime) //THIS WILL BE THE timeSlotStartTime
         console.log('Start Time:' + startTimeInt)

         amountOfHoursADay = 24 - 24 % this.selectedHoursBookable
         console.log('Amount of hours:' + amountOfHoursADay)

         endTimeInt = startTimeInt + amountOfHoursADay //THIS WILL BE THE timeSlotEndTime; IF > 24 => GÅR ÖVER NATTEN
          if(startTimeInt<10){
         timeSlotStartTime = "0" + startTimeInt.toString() + ":00"
        } else{
          timeSlotStartTime = startTimeInt.toString() + ":00"
        }

        if(endTimeInt<10){
          timeSlotStartTime = "0" + endTimeInt.toString() + ":00"
         } else{
          timeSlotEndTime = endTimeInt.toString() + ":00"
         }
         console.log('Actual start time: ' + timeSlotStartTime)
         console.log('End time: ' + timeSlotEndTime)

         }
         else{
           console.log('HÄR HAR VI ALL INFO OM OBJEKTET: Associations id: ' + associationId + ' Namn: ' + objectName + ' slot längd: ' + this.selectedHoursBookable + ' tidigaste bokningsbar: ' + this.earliestBookableTime + ' senast bokningsbar: ' + this.latestBookableTime + ' gånger per dag: ' + this.slotsBookablePerDay + ' gånger per vecka: ' + this.slotsBookablePerWeek)
         }}
}}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}