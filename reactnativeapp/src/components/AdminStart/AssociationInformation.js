import Style from "../../screens/Style";
import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, ScrollView} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from "../../screens/Style";

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