import Style from "../../screens/Style";
import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, ScrollView} from 'react-native';
import { TextInput } from "react-native-paper";
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import styles from "../../screens/Style";

export default function AddBookableObject() {
  const [allDayEnabled, setAllDayEnabled] = useState(false);
  const [selected, setSelected] = React.useState("");

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

var selectedHoursBookable = '1';
var earliestBookableTime = '00:00';
var latestBookableTime = '23:00';
var firstStartTime = '00:00';
var slotsBookablePerDay = '1';
var slotsBookablePerWeek = '2';

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add Bookable Object</Text>
      <View style={styles.settingContainer}>
        <TextInput style={styles.objectName} placeholder="Object name"></TextInput>
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Length per booking</Text>
        <SelectList 
        setSelected={(val) => {
            setSelected(val)
            selectedHoursBookable = val
        }} 
        data={lengthPerBooking} 
    />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Bookable all day</Text>
        <Switch 
        trackColor={{ false: '#767577', true: '#53d5d5' }}
        value={allDayEnabled} onValueChange={setAllDayEnabled} />
      </View>
      <View>
        {allDayEnabled ? (
          <View style={styles.settingContainer}>
          <Text style={styles.settingLabel}>First start time</Text>
          <SelectList 
          setSelected={(val) => {
              setSelected(val)
              firstStartTime= val
          }} 
          data={bookableTimes} 
      />
      </View>
        ) : (
            <View>
            <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Earliest bookable time</Text>
        <SelectList 
        setSelected={(val) => {
            setSelected(val)
            earliestBookableTime = val
        }} 
        data={bookableTimes} 
    />
    </View>
    <View style={styles.settingContainer}>
    <Text style={styles.settingLabel}>Latest bookable time</Text>
        <SelectList 
        setSelected={(val) => {
            setSelected(val)
            latestBookableTime = val
        }} 
        data={bookableTimes} 
    />
      </View>
      </View>
        )}
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Slots bookable per day</Text>
        <SelectList 
        setSelected={(val) => {
            setSelected(val)
            slotsBookablePerDay = val
        }} 
        data={lengthPerBooking} 
    />
    </View>
    <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Slots bookable per week</Text>
        <SelectList 
        setSelected={(val) => {
            setSelected(val)
            slotsBookablePerWeek = val
        }} 
        data={lengthPerBooking} 
    />
    </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}