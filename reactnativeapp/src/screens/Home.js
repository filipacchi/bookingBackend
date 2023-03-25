import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, Button, Pressable, TextInput} from 'react-native';
import { useState, useEffect } from "react";
import axios from 'axios';

export default function Home() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const  [text, onChangeText] = useState("Förnamn Efternamn");
  const [date, onChangeDate] = React.useState('2023-03-24');

  const loadData = () => {
    async function getAllStudent() {
      try {
        const students = await axios.get('http://192.168.0.119:8000/get/')
        console.log(students.data)
        setStudents(students.data)
        setLoading(false)
      } catch (error) {
        if (error.response) {
          console.log(error.response.status)
          console.log("FEL")
        }
        console.log("FEEEEEL")
      }
    }
    getAllStudent()
  }
  useEffect(() => {
    loadData();
  }, [])
  return (
    
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <TextInput 
        style={styles.input}
        onChangeText={onChangeDate}
        value={date}
      />
      <View style={{borderRadius: 10}}>
      <Pressable style={styles.button} onPress={() => {
        console.log("KNAPP KLICKAD")
        axios.post('http://192.168.0.119:8000/post/', {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
          },
          name: text,
          date: date
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
      }
    }>
        <Text style={styles.text}>Lägg till artikel</Text>
      </Pressable>
        </View>
      <FlatList
        data={students}
        style={{}}
        renderItem={({ item }) => <View style={{borderRadius: 10, overflow:'hidden', margin: 10}}><Text style={{fontSize: 28, padding: 20, backgroundColor: "#27a5a5", color: "white"}}>{item.name}, {item.date}, {item.id}</Text></View>}
        onRefresh={() => loadData()}
        refreshing={loading}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderStyle: 'solid',
    borderRadius: 10,
    backgroundColor: 'black',
    marginBottom: 50
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    borderStyle: 'solid',
    borderRadius: 10,

  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
