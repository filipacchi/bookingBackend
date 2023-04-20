import Style from "../../screens/Style";
import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, ScrollView} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AssociationInformation() {

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Association name</Text>
      <View style={styles.settingContainer}>
      <MaterialIcons name="vpn-key" size={24} color="black" />
        <Text style={styles.objectName}>  Key</Text>
      </View>
      <View style={styles.settingContainer}>
      <MaterialCommunityIcons name="account" size={24} color="black" />
        <Text style={styles.objectName}>  Members</Text>
      </View>
      </ScrollView>
      )}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  settingLabel: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#53d5d5',
    borderRadius: 50,
    padding: 10,
    width: '60%',
    alignSelf: 'center',
    marginTop: '2%'
  },
  buttonText:{
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'white'
  },
  objectName:{
    width: '100%',
    backgroundColor: 'white',
    flex: 1,
    fontSize: 16,
  }
})