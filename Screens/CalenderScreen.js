
import React, { useState , useEffect} from 'react'
import DatePicker from 'react-native-date-picker'
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Platform
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Constants from 'expo-constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from "@expo/vector-icons";
import firebase from "../database/firebaseDB";

const db = firebase.firestore().collection("timetable");

async function loadAppointmentData() {
  setLoad(true)


  setLoad(false)
  setDisplayTime(busData.next.time)
  console.log(busData.next.time)
  }

export default function CalenderScreen() {
  //firebase
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [hasAppointment, setHasAppointment] = useState(0);
  const [timetable, setTimetable] = useState([]);

  
  // Load Firebase data on start
  //alt methods
  useEffect(() => {
    fetchTimetable();
  }, [])

  const fetchTimetable=async()=>{
    const data=await db.get();
    data.docs.forEach(item=>{
     setTimetable([...timetable,item.data()])
    })
  }

  function uploadData()
  {
    alert(timetable[0].appointmenHH)
    const newNote = {
      appointmenHH: date.getHours(),
      appointmentDD: date.getDay(),
      appointmentMM: date.getMonth(), 
      appointmentMin: date.getMinutes(), 
      userId: 1,
    };
    db.add(newNote);
  }
  //firebase end


  //calendar settings
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setAppointmentDate(date)
    uploadData()
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  //calendar settings end


  return (
    <View style={styles.container}>
      <Text>{hasAppointment? appointmentDate.toString() : ""}</Text>
      <Text>{hasAppointment? "Appointment good to go": "Looks like you have No Appointment booked, "}</Text>
      <Text>{hasAppointment? " " : "We have automatically booked a slot for you, is it okay? "}</Text>
      <Button onPress={showDatepicker} title="Customise Date" />
      <Button onPress={showTimepicker} title="Customise Time" />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});