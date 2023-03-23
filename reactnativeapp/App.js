import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, Button, Pressable } from 'react-native';
import { useState, useEffect } from "react";
import axios from 'axios';
export default function App() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const loadData = () => {
    async function getAllStudent() {
      try {
        const students = await axios.get('http://10.2.128.86:8000/get/')
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
      <FlatList
        data={students}
        style={{}}
        renderItem={({ item }) => <Text style={{fontSize: 28, padding: 20, backgroundColor: "black", color: "white", margin: 10}}>{item.name}, {item.date}</Text>}
        onRefresh={() => loadData()}
        refreshing={loading}
      />
      <Pressable style={styles.button} onPress={() => {
        console.log("KNAPP KLICKAD")
        axios.post('http://10.2.128.86:8000/post/', {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
          },
          name: 'KINGEN',
          date: '2023-04-12'
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
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'black',
    marginBottom: 50
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
