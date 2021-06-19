//TEST
import React, { useState , useEffect} from 'react'
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

export default function CalenderScreen({navigation, route}) {
  //firebase
  const [hasAppointment, setHasAppointment] = useState(0);
  const [appointmentBooked, setAppointmentBooked] = useState(0);
  const [timetable, setTimetable] = useState([]);

  const [helptext, setHelptext] = useState(" ");
  
  // Load Firebase data on start
  //alt methods

  useEffect(() => {
    updateText();
  }, [])

  const fetchTimetable=async()=>{

    const data=await db.get();
    data.docs.forEach(item=>{
      
      var date2 = new Date(item.data.appointmentDate);
      if(date2 - date < 3600000 || date - date2 < 3600000)
      {
        alert(1)
        setAppointmentBooked(true);
      }
      else
      {

        setAppointmentBooked(false);
        //setTimetable([...timetable,item.data()])
        uploadData()
        setHasAppointment(true);
      }
     
    })

    updateText()
  }

  function uploadData()
  {
    const newNote = {
      appointmentDate : date.getTime(),
      userId: 1,
    };
    db.add(newNote);
    updateText()
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
    fetchTimetable()
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


  function updateText(){
    if(hasAppointment)
    {
      setHelptext("Appointment good to go")
    }
    else if(appointmentBooked)
    {
      setHelptext("Looks like the slot is taken, ")
    }
    else{
      setHelptext("Looks like you have No Appointment booked, ")
    }
  }


  return (
    <View style={styles.container}>
      <Text style = {styles.paragraph}>{hasAppointment? date.toString() : ""}</Text>
      <Text>{helptext}</Text>
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
